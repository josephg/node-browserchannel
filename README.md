A [BrowserChannel](http://closure-library.googlecode.com/svn/trunk/closure/goog/net/browserchannel.js) server.

**tldr;** Its like socket.io, but it scales better and it has fewer bugs. It
just does long polling. It also doesn't support websockets and doesn't support
cross-domain requests out of the box.

BrowserChannel is google's version of [socket.io](http://socket.io) from when they first put
chat in gmail. Unlike socket.io, browserchannel guarantees:

- Messages will arrive in order
- Messages will never arrive on the server after a connection has closed
- The mail will always get through on any browser that google talk works on, which is all of them.

[![Build Status](https://secure.travis-ci.org/josephg/node-browserchannel.png)](http://travis-ci.org/josephg/node-browserchannel)

node-browserchannel:

- Is compatible with the closure library's browserchannel implementation
- Is super thoroughly tested
- Works in IE5.5+, iOS, Safari, Chrome, Firefox, etc.
- Works in any network environment (incl. behind buffering proxies)

---

# Use it

    # npm install browserchannel

Browserchannel is implemented as connect middleware. Here's an echo server:

```javascript
var browserChannel = require('browserchannel').server;
var connect = require('connect');

var server = connect(
  connect.static("#{__dirname}/public"),
  browserChannel(function(session) {
    console.log('New session: ' + session.id +
      ' from ' + session.address +
      ' with cookies ' + session.headers.cookie);

    session.on('message', function(data) {
      console.log(session.id + ' sent ' + JSON.stringify(data));
      session.send(data);
    });

    session.on('close', function(reason) {
      console.log(session.id + ' disconnected (' + reason + ')');
    });
      
    // This tells the session to disconnect and don't reconnect
    //session.stop();
    
    // This kills the session.
    //session.close();
  })
);

server.listen(4444);

console.log('Echo server listening on localhost:4444');
```

The client emulates the [websocket API](http://dev.w3.org/html5/websockets/). Here is a simple client:

```javascript
var BCSocket = require('browserchannel').BCSocket;

var socket = new BCSocket('http://localhost:4321/channel');
socket.onopen = function() {
  socket.send({hi:'there'});
};
socket.onmessage = function(message) {
  console.log('got message', message);
};

// later...
socket.close()
```

... Or from a website:

```html
<html><head>
<script src='/channel/bcsocket.js'></script>
<script>
socket = new BCSocket('/channel');
socket.onopen = function() {
  socket.send({hi:'there'});
  socket.close();
};
socket.onmessage = function(message) {
  // ...
};
</script>
```

You can also ask the client to automatically reconnect whenever its been disconnected. - Which is
super useful.

```javascript
var BCSocket = require('browserchannel').BCSocket;
socket = new BCSocket('http://localhost:4321/channel', reconnect:true);
socket.onopen = function() {
  socket.send("I just connected!");
};
```

---

# Differences from Websocket

- You can send messages before the client has connected. This is recommended,
  as any messages sent synchronously with the connection's creation will be
  sent during the initial request. This removes an extra round-trip.
- The send method can pass a callback which will be called when the message has
  been received. **NOTE**: If the client closes, it is not guaranteed that this
  method will ever be called.
- Send uses google's JSON encoder. Its almost the same as the browser one, but
  `{x:undefined}` turns in to `{x:null}` not `{}`.

# API

## Server API

The server is created as connect / express middleware. You create the middleware by calling

```javascript
var browserChannel = require('browserchannel').server;

var middleware = browserChannel(options, function(session) {
  ...
});
 
// Express
app.use(middleware);
```

The options object is optional. The following server options are supported:

- **hostPrefixes**: Array of extra subdomain prefixes on which clients can
connect. Even modern browsers impose per-domain connection limits, which means
that when you have a few tabs open with browserchannel requests your
connections might stop woroking. Use subdomains to get around this limit.
For example, if you're listening for connections on *example.com*, you can
specify `hostPrefixes: ['a', 'b', 'c']` to make clients send requests to
*a.example.com*, *b.example.com* and *c.example.com*.
- **base**: The base URL on which to listen for connections. (Defaults to
`"/channel"`). Think of the base URL as a URL passed into `app.use(url,
middleware)`.
- **headers**: Map of additional response headers to send with requests.
- **cors**: Set `Access-Control-Allow-Origin` header. This allows you to
specify a domain which is allowed to access the browserchannel server. See
[mozilla documentation](https://developer.mozilla.org/en/http_access_control)
for more information. You can set this to `'*'` to allow your server to be
accessed from clients on any domain, but this may open up security
vulnerabilities in your application as malicious sites could get users to
connect to your server and send arbitrary messages.
- **corsAllowCredentials**: (Default *false*) Sets the
`Access-Control-Allow-Credentials` header in responses. This allows
cross-domain requests to send their cookies. You cannot do this if you set
`cors:'*'`. To make this work you must also add the `{crossDomainXhr:true}`
option in the client. See [mozilla
documentation](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS#Requests_with_credentials)
for more information. Setting this is equivalent to setting
`headers:{'Access-Control-Allow-Credentials':true}`.
- **keepAliveInterval**: (Default *20000 = 20 seconds*). Keepalives
are sent periodically to make sure http connections aren't closed by eager
clients. The standard timeout is 30 seconds, so sending keepalives every 20
seconds keeps the connection healthy. Time is specified in milliseconds
- **sessionTimeoutInterval**: (Default *30 seconds*). Amount of time we wait
before evicting a client connection. Setting this lower will make the server
notice disconnected clients more quickly. Setting it higher will make
connections more resiliant to temporary network disconnection. Time specified
in milliseconds.

Note that by default, CORS support is disabled. This follows the lead of
browsers. Be very careful when enabling CORS & CORS credentials. You should
explicitly whitelist sites from which your users will connect.

Setting hostPrefixes in production is important - if you don't enable host
prefixes, browserchannel will stop working for a user once they have more than
a couple of tabs open. Set DNS rules to make the extra prefixes all point to
the same server / cluster.

### Client sessions

Whenever a client connects, your middleware's method is called with the new
session. The session is a nodejs event emitter with the following properties:

- **id**: An ID that is unique to the session.
- **address**: A string containing the IP address of the connecting client.
- **query**: An object containing the parsed HTTP query of the initial
connection. Any custom query parameters will be exposed on this object.
- **state**: The current state of the connection. One of `'init'`, `'ok'` and
`'closed'`. When the state is changed, the client will emit a *state changed*
event with the old state and new state as event parameters.
- **appVersion**: The client's reported application version, or null. You can
use this to reject clients which are connecting from old versions of your
client.

#### Sending messages

You can **send messages** to the client using `client.send(data, callback)`. The
data parameter will be automatically JSON.stringified. If specified, the
callback will be called once the message has been acknowledged by the client.

> Note: If you wrap a browserchannel connection in a nodejs stream, don't use
> the callback. Node streams will only allow one message to be in flight at a
> time. As a result, you'll get much lower message throughput than you
> otherwise should.


#### Receiving messages

Receive messages through the `message` event.

```javascript
session.on('message', function(data) {
  // ...
});
```

The message will be a javascript object if you sent a javascript object using
the client API.

#### Stopping and closing connections

Browserchannel has two different methods for closing client connections, *session.stop*
and *session.close*. Both methods disconnect the client. The difference is that
stop also tells the client not to reconnect. You should use close when a
recoverable server error occurs, and stop when the client is in an
unrecoverable invalid state.

For example, if an exception occurs handling a message from a client, you may
want to call close() to force the client to reconnect. On the other hand, if a
browser is trying to connect using an old version of your app, you should call
stop(). In the browser, you can handle the stop message with a notice to
refresh the browser tab.

#### Events

The client is an event emitter. It fires the following events:

- **close (reason)**: The client connection was closed. This will happen for a variety
of reasons (timeouts, explicit disconnection from the client, disconnection
from the server, etc). Once a client has closed, it is gone forever. If the
client reconnects, it will do so by establishing a new session.
- **message (data)**: The server received a message from the client. The data
object will be a javascript object.
- **state changed (oldstate, newstate)**: The client's state changed. Clients
start in the 'init' state. They move to the 'ok' state when the session is
established then go to the 'closed' state. If a client reconnects, they will
create an entirely new session. init -> ok -> closed are the only three valid
state transitions.


## Client API

For the most part, the client API is identical to websockets.

```javascript
var socket = new BCSocket(hostname, opts);
```

opts is optional, and if it exists it should be an object which can contain the
following properties:

- **appVersion**: Your application's protocol version. This is passed to the server-side
  browserchannel code, in through your session handler as `session.appVersion`
- **prev**: The previous BCSocket object, if one exists. When the socket is established,
  the previous bcsocket session will be disconnected as we reconnect.
- **reconnect**: Tell the socket to automatically reconnect when its been disconnected.
- **failFast**: Make the socket report errors immediately, rather than trying a
  few times first.
- **crossDomainXhr**: Set to true to enable the cross-origin credential
  flags in XHR requests. The server must send the
  Access-Control-Allow-Credentials header and can't use wildcard access
  control hostnames. See:
    http://www.html5rocks.com/en/tutorials/cors/#toc-withcredentials
- **affinity**: Set to null to disable session affinity token passing.
- **affinityParam**: Session affinity tokens are sent in the query string as
  the GET parameter `a` by default. Your application may override the
  variable name if there is a query string conflict.

There are a couple of differences from the websocket API:

- You can (and are encouraged to) call `send()` using JSON objects instead of
mere strings. JSON serialization is handled by the library, and works in all
browsers.
- You can send messages immediately before the session is established. This
removes a roundtrip before client messages can arrive on the server.
- Browserchannel sessions have reconnect support. You should register
`socket.onconnecting = function() {...}` to send any messages which need to be
sent as the session is established. This will be called both when the socket is
first established *and* when the session reconnects.


---

# Caveats

- It doesn't do RPC.
- Currently there's no websocket support. So, its higher bandwidth on modern
browsers. On iOS you'll sometimes see a perpetual loading spinner in the top
black bar.

---

# How to rebuild the client

The client uses google's [closure library](https://developers.google.com/closure/library/)
& [compiler](https://developers.google.com/closure/compiler/). There's a couple small bugs that google
still hasn't fixed in their library (and probably never will), so I have a patch file kicking around.

Rebuilding the client library is annoying, so I keep an up to date compiled copy in `dist/`.

1. Download the closure library as a sibling of this repository

    ```
    cd ..
    git clone https://code.google.com/p/closure-library/
    git checkout -q df47692b1bacd494548a3b00b150d9f6a428d58a
    cd closure-library
    ```

2. Download the closure compiler

    ```
    curl http://dl.google.com/closure-compiler/compiler-latest.tar.gz > compiler-latest.tar.gz
    tar -xvf compiler-latest.tar.gz
    mv compiler-latest/compiler.jar .
    ```

3. Patch the library

    ```
    cd closure/
    patch -p0 < ../../node-browserchannel/closure-*.patch
    ```

4. Build

    ```
    cd ../../node-browserchannel
    make
    ```

## Caveats

### Java ~1.7 is a hard requirement.
Building this project with Java ~1.6 will fail, and may even fail silently.

### Known issue with latest closure-library.
Until [the bug][34] introduced in `closure-library#83c6a0b9`
is resolved upstream, use `closure-library#df47692`

[34]: https://github.com/josephg/node-browserchannel/issues/34


---

### License

Licensed under the standard MIT license:

Copyright 2011 Joseph Gentle.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
