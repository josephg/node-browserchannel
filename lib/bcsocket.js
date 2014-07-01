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

var errorMessages = {};
errorMessages[goog.net.BrowserChannel.Error.OK] = 'Ok';
errorMessages[goog.net.BrowserChannel.Error.LOGGED_OUT] = 'User is logging out';
errorMessages[goog.net.BrowserChannel.Error.UNKNOWN_SESSION_ID] = 'Unknown session ID';
errorMessages[goog.net.BrowserChannel.Error.STOP] = 'Stopped by server';
errorMessages[goog.net.BrowserChannel.Error.NETWORK] = 'General network error';
errorMessages[goog.net.BrowserChannel.Error.REQUEST_FAILED] = 'Request failed';
errorMessages[goog.net.BrowserChannel.Error.BLOCKED] = 'Blocked by a network administrator';
errorMessages[goog.net.BrowserChannel.Error.NO_DATA] = 'No data from server';
errorMessages[goog.net.BrowserChannel.Error.BAD_DATA] = 'Got bad data from the server';
errorMessages[goog.net.BrowserChannel.Error.BAD_RESPONSE] = 'Got a bad response from the server';

/** @constructor */
bc.BCSocket = function(url, options) {
  var extraHeaders, extraParams, fireCallback, handler, lastErrorCode, lastSession, reconnect, reconnectTime, reconnectTimer, self, sendMap, session, setState;
  self = this;
  url || (url = 'channel');
  if (url.match(/:\/\//)) {
    url.replace(/^ws/, 'http');
  }
  options || (options = {});
  if (goog.isArray(options || typeof options === 'string')) {
    options = {};
  }
  reconnectTime = options['reconnectTime'] || 3000;
  extraHeaders = options['extraHeaders'] || null;
  extraParams = options['extraParams'] || null;
  if (options['affinity'] !== null) {
    extraParams || (extraParams = {});
    options['affinityParam'] || (options['affinityParam'] = 'a');
    this['affinity'] = options['affinity'] || goog.string.getRandomString();
    extraParams[options['affinityParam']] = this['affinity'];
  }
  setState = function(state) {
    return self.readyState = self['readyState'] = state;
  };
  setState(this.CLOSED);
  session = null;
  lastSession = options.prev;
  fireCallback = function() {
    var args, e, name;
    name = arguments[0], args = 2 <= arguments.length ? Array.prototype.slice.call(arguments, 1) : [];
    try {
      return typeof self[name] === "function" ? self[name].apply(self, args) : void 0;
    } catch (_error) {
      e = _error;
      if (typeof console !== "undefined" && console !== null) {
        console.error(e.stack);
      }
      throw e;
    }
  };
  handler = new goog.net.BrowserChannel.Handler();
  handler.channelOpened = function(channel) {
    lastSession = session;
    setState(bc.BCSocket.OPEN);
    return fireCallback('onopen');
  };
  lastErrorCode = null;
  handler.channelError = function(channel, errCode) {
    var message;
    message = errorMessages[errCode];
    lastErrorCode = errCode;
    if (self.readyState !== bc.BCSocket.CLOSED) {
      setState(bc.BCSocket.CLOSING);
    }
    try {
      return fireCallback('onerror', message, errCode);
    } catch (_error) {}
  };
  reconnectTimer = null;
  handler.channelClosed = function(channel, pendingMaps, undeliveredMaps) {
    var message, time;
    if (self.readyState === bc.BCSocket.CLOSED) {
      return;
    }
    session = null;
    message = lastErrorCode ? errorMessages[lastErrorCode] : 'Closed';
    setState(bc.BCSocket.CLOSED);
    if (options['reconnect'] && (lastErrorCode !== goog.net.BrowserChannel.Error.STOP && lastErrorCode !== goog.net.BrowserChannel.Error.OK)) {
      time = lastErrorCode === goog.net.BrowserChannel.Error.UNKNOWN_SESSION_ID ? 0 : reconnectTime;
      clearTimeout(reconnectTimer);
      reconnectTimer = setTimeout(reconnect, time);
    }
    try {
      fireCallback('onclose', message, pendingMaps, undeliveredMaps);
    } catch (_error) {}
    return lastErrorCode = null;
  };
  handler.channelHandleArray = function(channel, data) {
    var message;
    message = {
      type: 'message',
      data: data
    };
    return fireCallback('onmessage', message);
  };
  reconnect = function() {
    if (session) {
      throw new Error('Reconnect() called from invalid state');
    }
    setState(bc.BCSocket.CONNECTING);
    fireCallback('onconnecting');
    clearTimeout(reconnectTimer);
    session = new goog.net.BrowserChannel(options['appVersion'], lastSession != null ? lastSession.getFirstTestResults() : void 0);
    if (options['crossDomainXhr']) {
      session.setSupportsCrossDomainXhrs(true);
    }
    session.setHandler(handler);
    if (extraHeaders) {
      session.setExtraHeaders(extraHeaders);
    }
    lastErrorCode = null;
    if (options['failFast']) {
      session.setFailFast(true);
    }
    return session.connect("" + url + "/test", "" + url + "/bind", extraParams, lastSession != null ? lastSession.getSessionId() : void 0, lastSession != null ? lastSession.getLastArrayId() : void 0);
  };
  this['open'] = function() {
    if (self.readyState !== self.CLOSED) {
      throw new Error('Already open');
    }
    return reconnect();
  };
  this['close'] = function() {
    clearTimeout(reconnectTimer);
    lastErrorCode = goog.net.BrowserChannel.Error.OK;
    if (self.readyState === bc.BCSocket.CLOSED) {
      return;
    }
    setState(bc.BCSocket.CLOSING);
    return session.disconnect();
  };
  this['sendMap'] = sendMap = function(map) {
    var _ref;
    if ((_ref = self.readyState) === bc.BCSocket.CLOSING || _ref === bc.BCSocket.CLOSED) {
      throw new Error('Cannot send to a closed connection');
    }
    return session.sendMap(map);
  };
  this['send'] = function(message) {
    if (typeof message === 'string') {
      return sendMap({
        '_S': message
      });
    } else {
      return sendMap({
        'JSON': goog.json.serialize(message)
      });
    }
  };
  reconnect();
  return this;
};

bc.BCSocket.prototype['CONNECTING'] = bc.BCSocket['CONNECTING'] = bc.BCSocket.CONNECTING = 0;
bc.BCSocket.prototype['OPEN'] = bc.BCSocket['OPEN'] = bc.BCSocket.OPEN = 1;
bc.BCSocket.prototype['CLOSING'] = bc.BCSocket['CLOSING'] = bc.BCSocket.CLOSING = 2;
bc.BCSocket.prototype['CLOSED'] = bc.BCSocket['CLOSED'] = bc.BCSocket.CLOSED = 3;

(typeof exports !== "undefined" && exports !== null ? exports : window)['BCSocket'] = bc.BCSocket;
