> This is a work in progress. It does not work yet.

This is an implementation of google's [BrowserChannel](http://closure-library.googlecode.com/svn/trunk/closure/goog/net/browserchannel.js) protocol for communicating with a browser.

BrowserChannel is google's version of [socket.io](http://socket.io) from when they first put chat in gmail. Unlike socket.io, browserchannel provides much better guarantees about message delivery and state. It has much better reconnection logic and error handling. Ie, you know whats going on. In exchange, its also slightly slower, it doesn't work cross-domain and it doesn't use websockets.

It will:

- Be compatible with the closure library's browserchannel implementation
- Work in IE6
- Be super thoroughly tested
- Work in any network environment (incl. behind buffering proxies)
- Not depend on websockets
- Have a simple client module which wraps browserchannel's ugly API.

It will not:

- Do RPC
- Ever land in an inconsistant state
- Work in cross-origin environments in all browsers. If you want to host static content
  in one process and do dynamic stuff somewhere else you should put browserchannel behind
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
