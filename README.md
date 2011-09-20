> This is a work in progress. It does not work yet.

This is an implementation of google's (BrowserChannel)[http://closure-library.googlecode.com/svn/trunk/closure/goog/net/browserchannel.js] protocol for communicating with a browser.

It will:

- Be compatible with the closure library's browserchannel implementation
- Be super thoroughly tested
- Work in any network environment (incl. behind buffering proxies)
- Not depend on websockets
- Have a simple client module which wraps browserchannel's ugly API.

It will not:

- Do RPC
- Land in an inconsistant state
- Work in cross-origin environments in all browsers. If you want to host static content
  in one process and do dynamic stuff somewhere else, you should use (nginx)[http://nginx.net/]
  or something to proxy stablesocket connections to your nodejs server process.

BrowserChannel uses long polling HTTP GETs to move content from the server to the client,
and a series of POST requests to move data from the client to the server. This is higher
bandwidth than websockets.

Eventually I'd like to write my own client implementation as well, for modern browsers.

Once this happens it'll be possible to use websockets when available. However, the websocket spec is far too unstable for that right now.

