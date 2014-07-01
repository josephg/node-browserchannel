// This is a little wrapper around browserchannels which exposes something thats compatible
// with the websocket API. It also supports automatic reconnecting, and some other goodies.
//
// You can use it just like websockets:
//
//     var socket = new BCSocket('/foo');
//     socket.onopen = function() {
//       socket.send('hi mum!');
//     };
//     socket.onmessage = function(message) {
//       console.log('got message', message.data);
//     };
// 
// ... etc. See here for specs:
// http://dev.w3.org/html5/websockets/
//
// I've also added:
//
// - You can reconnect a disconnected socket using .open().
// - .send() transparently works with JSON objects.
// - .sendMap() works as a lower level sending mechanism.
// - The second argument can be an options argument. Valid options:
//   - **appVersion**: Your application's protocol version. This is passed to the server-side
//     browserchannel code, in through your session handler as `session.appVersion`
//   - **prev**: The previous BCSocket object, if one exists. When the socket is established,
//     the previous bcsocket session will be disconnected as we reconnect.
//   - **reconnect**: Tell the socket to automatically reconnect when its been disconnected.
//   - **failFast**: Make the socket report errors immediately, rather than trying a few times
//     first.
//   - **crossDomainXhr**: Set to true to enable the cross-origin credential
//     flags in XHR requests. The server must send the
//     Access-Control-Allow-Credentials header and can't use wildcard access
//     control hostnames. This is needed if you're using host prefixes. See:
//       http://www.html5rocks.com/en/tutorials/cors/#toc-withcredentials
//   - **extraParams**: Extra query parameters to be sent with requests. If
//     present, this should be a map of query parameter / value pairs. Note that
//     these parameters are resent with every request, so you might want to think
//     twice before putting a lot of stuff in here.
//   - **extraHeaders**: Extra headers to add to requests. Be advised that not
//     all headers are allowed by the XHR spec. Headers from NodeJS clients are
//     unrestricted.

goog.provide('bc.BCSocket');

goog.require('goog.net.BrowserChannel');
goog.require('goog.net.BrowserChannel.Handler');
goog.require('goog.net.BrowserChannel.Error');
goog.require('goog.net.BrowserChannel.State');
goog.require('goog.string');

// Uncomment and recompile for extra debugging information in the console. This
// currently breaks nodejs support unfortunately.
//goog.require('goog.debug.Console');
//goog.debug.Console.instance = new goog.debug.Console();
//goog.debug.Console.instance.setCapturing(true);

// Closure uses numerical error codes. We'll translate them into strings for the user.
var errorMessages = {};
errorMessages[goog.net.BrowserChannel.Error.OK] = 'Ok';
errorMessages[goog.net.BrowserChannel.Error.LOGGED_OUT] = 'User is logging out';
errorMessages[goog.net.BrowserChannel.Error.UNKNOWN_SESSION_ID] = 'Unknown session ID';
errorMessages[goog.net.BrowserChannel.Error.STOP] = 'Stopped by server';

// All of these error messages basically boil down to "Something went wrong - try again". I can't
// imagine using different logic on the client based on the error here - just keep reconnecting.

// The client's internet is down (ping to google failed)
errorMessages[goog.net.BrowserChannel.Error.NETWORK] = 'General network error';
// The server could not be contacted
errorMessages[goog.net.BrowserChannel.Error.REQUEST_FAILED] = 'Request failed';


// This error happens when the client can't connect to the special test domain. In my experience,
// this error happens normally sometimes as well - if one particular connection doesn't
// make it through during the channel test. This will never happen with node-browserchannel anyway
// because we don't support the network admin blocking channel.
errorMessages[goog.net.BrowserChannel.Error.BLOCKED] = 'Blocked by a network administrator';

// We got an invalid response from the server
errorMessages[goog.net.BrowserChannel.Error.NO_DATA] = 'No data from server';
errorMessages[goog.net.BrowserChannel.Error.BAD_DATA] = 'Got bad data from the server';
errorMessages[goog.net.BrowserChannel.Error.BAD_RESPONSE] = 'Got a bad response from the server';

/**
 * Interacts with the underlying browserchannel connection on the BCSocket's
 * behalf. All state is in the socket object - this is just a helper object.
 *
 * @constructor
 * @type {!bc.BCHandler} socket
 * @extends {goog.net.BrowserChannel.Handler}
 * @private
 */
function BCHandler(socket) {
  this.socket = socket;
};
goog.inherits(BCHandler, goog.net.BrowserChannel.Handler);

/**
 * Called when the channel is opened.
 *
 * @override
 */
BCHandler.prototype.channelOpened = function(channel) {
  var socket = this.socket;
  socket.lastSession = socket.session;
  socket.setState(bc.BCSocket.OPEN);
  socket.fireCallback('onopen');
};

/**
 * This is called when the session has the final error explaining why its
 * closing. It is called only once, just before channelClosed(). It is not
 * called if the session is manually disconnected.
 *
 * If your network connection is down, you'll get General Network Errors
 * passing through here even when you're not connected.
 *
 * I'm not 100% sure what websockets do if there's an error like this. I'm
 * going to assume it has the same behaviour as browserchannel - that is,
 * onclose() is always called if a connection closes, and onerror is called
 * whenever an error occurs.
 *
 * @override
 */
BCHandler.prototype.channelError = function(channel, errCode) {
  var message = errorMessages[errCode];
  var socket = this.socket;
  socket.lastErrorCode = errCode;

  //console.error("channelError "+errCode+" : "+message+" in state "+socket.readyState);

  if (socket.readyState !== bc.BCSocket.CLOSED) {
    socket.setState(bc.BCSocket.CLOSING);
  }

  // If fireCallback throws, channelClosed (below) never gets called, which in
  // turn causes the connection to never reconnect. Eat the exceptions so that
  // doesn't happen.
  try {
    socket.fireCallback('onerror', message, errCode);
  } catch (_error) {}
};

/**
 * This will be called whenever the client disconnects or fails to connect for
 * any reason. When we fail to connect, I'll also fire 'onclose' (even though
 * onopen is never called!) for two reasons:
 *
 * - The state machine goes from CLOSED -> CONNECTING -> CLOSING -> CLOSED, so
 *   technically we did enter the 'close' state.
 * - Thats what websockets do (onclose() is called on a websocket if it fails
 *   to connect).
 *
 * @override
 */
BCHandler.prototype.channelClosed = function(channel, pendingMaps, undeliveredMaps) {
  // Hm.
  //
  // I'm not sure what to do with this potentially-undelivered data. I think I'll toss it
  // to the emitter and let that deal with it.
  //
  // I'd rather call a callback on send(), like the server does. But I can't, because
  // browserchannel's API isn't rich enough.

  var socket = this.socket;
  // Should handle server stop
  if (socket.readyState === bc.BCSocket.CLOSED) {
    return;
  }
  
  // And once channelClosed is called, we won't get any more events from the
  // session. So things like send() should throw exceptions.
  socket.session = null;

  var errCode = socket.lastErrorCode;
  var message = errCode ? errorMessages[errCode] : 'Closed';

  socket.setState(bc.BCSocket.CLOSED);

  // If the error message is STOP, we won't reconnect. That means the server
  // has explicitly requested the client give up trying to reconnect due to
  // some error.
  //
  // The error code will be 'OK' if close() was called on the client.
  if (socket.reconnect && (
        errCode !== goog.net.BrowserChannel.Error.STOP &&
        errCode !== goog.net.BrowserChannel.Error.OK)) {

    // If the session ID is unknown, that means the session has probably timed
    // out on the server. We can reconnect immediately.
    var time = lastErrorCode === goog.net.BrowserChannel.Error.UNKNOWN_SESSION_ID ?
      0 : reconnectTime;

    clearTimeout(reconnectTimer);
    socket.reconnectTimer = setTimeout(goog.bind(socket.reconnect_, socket), time);
  }

  // This whole method is surrounded in a try-catch block to silently discard
  // exceptions. This happens after the reconnect timer is set so the callback
  // can call close() to cancel reconnection.
  try {
    socket.fireCallback('onclose', message, pendingMaps, undeliveredMaps);
  } catch (_error) {}

  // make sure we don't reuse an old error message later
  socket.lastErrorCode = null;
};

/**
 * Messages from the server are passed directly.
 * 
 * @override
 */
BCHandler.prototype.channelHandleArray = function(channel, data) {
  var message = /** @dict */ {type:'message', data: data};
  this.socket.fireCallback('onmessage', message);
};


/**
 * Create a new BCSocket object.
 *
 * @param {?string} url The base url to connect to. Defaults to 'channel'
 * @param {?} options Options configure the socket. See the comment at
 *        the top of this file for details.
 * @constructor
 */
bc.BCSocket = function(url, options) {
  // Url can be relative or absolute. (Though an absolute URL in the browser
  // will have to match same origin policy)
  if (!url) url = 'channel';

  // Websocket urls are specified as ws:// or wss://. Replace the leading ws with http.
  if (url.match(/:\/\//)) {
    url.replace(/^ws/, 'http');
  }
  this.url = url;

  if (!options) options = {};

  // Using websockets you can specify an array of protocol versions or a protocol version string.
  // All that stuff is ignored.
  if (goog.isArray(options || typeof options === 'string')) {
    options = {};
  }

  this.options = options;

  // Reconnect delay
  this.reconnectTime = options['reconnectTime'] || 3000;

  // Extra headers. Not all headers can be set, and the headers that can be set
  // changes depending on whether we're connecting from nodejs or from the
  // browser.
  this.extraHeaders = options['extraHeaders'] || null;

  // Extra GET parameters
  this.extraParams = options['extraParams'] || null;

  /** @type {boolean} */
  this.reconnect = options['reconnect'] || false;

  // Generate a session affinity token to send with all requests.
  // For use with a load balancer that parses GET variables.
  if (options['affinity'] !== null) {
    this.extraParams || (this.extraParams = {});
    options['affinityParam'] || (options['affinityParam'] = 'a');

    this['affinity'] = options['affinity'] || goog.string.getRandomString();
    this.extraParams[options['affinityParam']] = this['affinity'];
  }

  // The channel starts CLOSED. When connect() is called, the channel moves
  // into the CONNECTING state. If it connects, it moves to OPEN. If an error
  // occurs (or an error occurs while the connection is connected), the socket
  // moves to 'CLOSED' again.
  //
  // At any time, you can call close(), which disconnects the socket.
  this.setState(this.CLOSED);

  /**
   * The current closure browserchannel session we're connected through.
   * @type {goog.net.BrowserChannel}
   * @private
   */
  this.session = null

  // When we reconnect, we'll pass the SID and AID from the previous time we successfully connected.
  /**
   * @type {?goog.net.BrowserChannel}
   * @private
   */
  this.lastSession = options['prev'];

  /**
   * A handler is used to receive events back out of the session.
   * 
   * @type {!goog.net.BrowserChannel.Handler}
   * @private
   */
  this.handler = new BCHandler(this);

  // If there's an error, the handler's channelError() method is called right before channelClosed().
  // We'll cache the error so a 'disconnect' handler knows the disconnect reason.
  this.lastErrorCode = null;

  // This is a javascript timer for reconnecting after we get disconnected.
  this.reconnectTimer = null;

  this['open'] = function() {
    if (this.readyState !== this.CLOSED) {
      throw new Error('Already open');
    }
    this.reconnect_();
  };
  this['close'] = function() {
    clearTimeout(this.reconnectTimer);
    this.lastErrorCode = goog.net.BrowserChannel.Error.OK;
    if (this.readyState === bc.BCSocket.CLOSED) {
      return;
    }
    this.setState(bc.BCSocket.CLOSING);
    return this.session.disconnect();
  };
  this['sendMap'] = function(map) {
    var _ref;
    if ((_ref = this.readyState) === bc.BCSocket.CLOSING || _ref === bc.BCSocket.CLOSED) {
      throw new Error('Cannot send to a closed connection');
    }
    return this.session.sendMap(map);
  };
  this['send'] = function(message) {
    if (typeof message === 'string') {
      return this['sendMap']({
        '_S': message
      });
    } else {
      return this['sendMap']({
        'JSON': goog.json.serialize(message)
      });
    }
  };

  this.reconnect_();
};


/**
 * @param {number} state
 * @private
 */
bc.BCSocket.prototype.setState = function(state) {
  // This function is convenient for logging state changes, and increases compression.
  //console.log("state from #{self.readyState} to #{state}");
  this.readyState = this['readyState'] = state;
};


/**
 * Closure has an annoyingly complicated logging system which by default will
 * silently capture & discard any errors thrown in callbacks. I could enable
 * the logging infrastructure (above), but I prefer to just log errors as
 * needed. As such, I'm calling back into user code through a try-catch loop
 * which sends any errors to the console as well.
 *
 * The BCSocket itself will be annotated with callbacks directly
 * (socket.onmessage = ...).
 *
 * The largest number of arguments any callback has is 3. If this ever changes,
 * add more arguments here.
 *
 * @param {!string} name Event name
 * @param {?=} a
 * @param {?=} b
 * @param {?=} c
 * @private
 */
bc.BCSocket.prototype.fireCallback = function(name, a, b, c) {
  try {
    var fn = this[name];
    if (fn) {
      fn.call(this, a, b, c);
    }
  } catch (e) {
    if (typeof console !== "undefined") {
      console.error(e.stack);
    }
    throw e;
  }
};

/**
 * This reconnects. It is called by the timeout. If you want to manually
 * reconnect, call .close() then .open().
 *
 * @private
 */
bc.BCSocket.prototype.reconnect_ = function() {
  if (this.session) {
    throw new Error('Reconnect() called from invalid state');
  }

  this.setState(bc.BCSocket.CONNECTING);
  this.fireCallback('onconnecting');

  clearTimeout(this.reconnectTimer);

  var firstTestResults = this.lastSession ? this.lastSession.getFirstTestResults() : null;

  var session = this.session = new goog.net.BrowserChannel(this.options['appVersion'], firstTestResults);

  if (this.options['crossDomainXhr']) {
    session.setSupportsCrossDomainXhrs(true);
  }

  session.setHandler(this.handler);
  if (this.extraHeaders) {
    session.setExtraHeaders(this.extraHeaders);
  }

  this.lastErrorCode = null;

  if (this.options['failFast']) {
    session.setFailFast(true);
  }

  var lastSessionId = null;
  var lastArrayId = null;
  if (this.lastSession) {
    lastSessionId = this.lastSession.getSessionId();
    lastArrayId = this.lastSession.getLastArrayId();
  }

  session.connect(this.url + "/test", this.url + "/bind", this.extraParams, lastSessionId, lastArrayId);
};


bc.BCSocket.prototype['CONNECTING'] = bc.BCSocket['CONNECTING'] = bc.BCSocket.CONNECTING = 0;
bc.BCSocket.prototype['OPEN'] = bc.BCSocket['OPEN'] = bc.BCSocket.OPEN = 1;
bc.BCSocket.prototype['CLOSING'] = bc.BCSocket['CLOSING'] = bc.BCSocket.CLOSING = 2;
bc.BCSocket.prototype['CLOSED'] = bc.BCSocket['CLOSED'] = bc.BCSocket.CLOSED = 3;

(typeof exports !== "undefined" && exports !== null ? exports : window)['BCSocket'] = bc.BCSocket;
