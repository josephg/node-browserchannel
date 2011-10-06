This is an implementation of google's [BrowserChannel](http://closure-library.googlecode.com/svn/trunk/closure/goog/net/browserchannel.js) protocol for communicating with a browser.

BrowserChannel is google's version of [socket.io](http://socket.io) from when they first put
chat in gmail. Unlike socket.io, browserchannel provides much better guarantees about message
delivery and state. It has better reconnection logic and error handling. With browserchannel,
**you know whats going on**. In exchange, BrowserChannel doesn't work cross-domain and it doesn't
use websockets. (So, its a little slower.)

[![Build Status](https://secure.travis-ci.org/josephg/node-browserchannel.png)](http://travis-ci.org/josephg/node-browserchannel)

node-browserchannel:

- Is compatible with the closure library's browserchannel implementation
- Super thoroughly tested (test:code ratio is currently 3:2 *and growing*)
- Working in any network environment (incl. behind buffering proxies)
- Not dependant on websockets

It will:

- Work in IE6 (it might now, but I haven't tested it)
- Have a simple client module which wraps closure's ugly client API.
- Use websockets when they're available and they work

---

# Use it

    # npm install browserchannel

Browserchannel is implemented as connect middleware. Here's a chat server:

```coffeescript
browserChannel = require('..').server
connect = require 'connect'

clients = []

server = connect(
	connect.static "#{__dirname}/public"
	browserChannel (client) ->
		console.log "Client #{client.id} connected"

		clients.push client

		client.on 'map', (data) ->
			console.log "#{client.id} sent #{JSON.stringify data}"
			# broadcast to all other clients
			c.send data for c in clients when c != client

		client.on 'close', (reason) ->
			console.log "Client #{client.id} disconnected (#{reason})"
			# Remove the client from the client list
			clients = (c for c in clients when c != client)

).listen(4321)
console.log 'Echo server listening on localhost:4321'
```

---

# Caveats

- Currently, you have to use closure to connect to it
- There's no nodejs client module yet
- It doesn't do RPC. I might make a fork of dnode which uses browserchannel instead of socket.io
- Work in cross-origin environments in all browsers. If you want to host static content
  in one process and do dynamic stuff somewhere else you can put browserchannel behind
  [nginx](http://nginx.net/) or [varnish](https://www.varnish-cache.org/)
  or something and proxy browserchannel connections to nodejs.

BrowserChannel uses long polling HTTP GETs to move content from the server to the client,
and a series of POST requests to move data from the client to the server. This is higher
bandwidth than websockets. Eventually I'd like to write my own client implementation as
well which would use websockets if available, and if not then download closure's browserchannel
implementation and use that.

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
