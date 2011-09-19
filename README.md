> This is a work in progress. It does not work yet.

This is a project aimed at getting a stable socket.io-like library to communicate
between a node.js server and a browser.

It will:

- Work on modern browsers (IE8+, FF3.5+, Chrome, Safari, Opera)
- Be super thoroughly tested
- Work in any network environment (incl. behind buffering proxies)
- Not depend on websockets

It will not:

- Do RPC
- Land in an inconsistant state
- Work in cross-origin environments in all browsers. If you want to host static content
  in one process and do dynamic stuff somewhere else, you should use (nginx)[http://nginx.net/]
  or something to proxy stablesocket connections to your nodejs server process.

This project is losely modelled around Google's (BrowserChannel)[http://closure-library.googlecode.com/svn/trunk/closure/goog/net/browserchannel.js],
which is what google uses for gchat, gmail and google plus. BrowserChannel is partially
documented (here)[http://code.google.com/p/libevent-browserchannel-server/wiki/BrowserChannelProtocol].

Stablesocket uses long polling HTTP GETs to move content from the server to the client,
and a series of POST requests to move data from the client to the server. This is higher
bandwidth than websockets, but I don't care. Eventually I'd like stablesocket to use
websockets when available, but the websocket spec is far too unstable for that right now.

