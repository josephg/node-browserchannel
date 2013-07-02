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
- Works in IE5.5+, iOS, Safari, Chrome, Firefox, and probably others.
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
      
    // This tells the session to stop trying to connect
    //session.stop();
    
    // This just kills the session.
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

For the most part, the API is identical to websockets.

```javascript
new BCSocket(hostname, opts)
```

opts is optional, and if it exists it should be an object which can contain the
following properties:

- **appVersion**: Your application's protocol version. This is passed to the server-side
  browserchannel code, in through your session handler as `session.appVersion`
- **prev**: The previous BCSocket object, if one exists. When the socket is established,
  the previous bcsocket session will be disconnected as we reconnect.
- **reconnect**: Tell the socket to automatically reconnect when its been disconnected.
- **failFast**: Make the socket report errors immediately, rather than trying a few times
  first.
- **crossDomainXhr**: Set to true to enable the cross-origin credential
  flags in XHR requests. The server must send the
  Access-Control-Allow-Credentials header and can't use wildcard access
  control hostnames. See:
    http://www.html5rocks.com/en/tutorials/cors/#toc-withcredentials


---

# Caveats

- It doesn't do RPC.
- Currently there's no websocket support. So, its higher bandwidth on modern browsers.

---

# How to rebuild the client

The client uses google's [closure library](https://developers.google.com/closure/library/)
& [compiler](https://developers.google.com/closure/compiler/). There's a couple small bugs that google
still hasn't fixed in their library (and probably never will), so I have a patch file kicking around.

Rebuilding the client library is annoying, so I keep an up to date compiled copy in `dist/`.

1. Download the closure library

```
svn checkout http://closure-library.googlecode.com/svn/trunk/ closure-library
cd closure-library
```

2. Download the closure compiler

```
curl http://closure-compiler.googlecode.com/files/compiler-latest.zip > compiler-latest.zip
unzip compiler-latest.zip compiler.jar
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
