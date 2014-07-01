> This document was only added recently. Its missing a lot of the history.

# 1.2.0 -> 2.0.0

The client API has better websocket API support.

- **IMPORTANT API CHANGE** `client.onmessage` now receives an object with a data
property, instead of the message raw. This better matches the websocket API.
- I've added a couple of capability flags to the session object, namely
`canSendWhileConnecting` and `canSendJSON`.
- Fixed a bug where options.prev had no effect.
- The client no longer throws if you send messages after the socket is closed.
It silently drops them instead (for better or worse...)

If your code previously looked like this:

```javascript
session.onmessage = function(data) {
  window.alert(data.x, data.y);
};
```

it will now look like this:

```javascript
session.onmessage = function(message) {
  window.alert(message.data.x, message.data.y);
};
```

Despite the major version bump, this release actually has very few changes. I
was considering rewriting all of browserchannel in javascript (I'd still like to
at some point), but I worry that doing so will introduce new bugs in the code
that weren't there before. The version bump is necessary because of the change
to the client API.

I almost committed a [closure-javascript version of
BCSocket](https://github.com/josephg/node-browserchannel/blob/javascript-
bcsocket/lib/bcsocket.js) but it has new bugs, its bigger, its harder to read
and even with better closure compiler type annotations it compiles to more code.
I decided the transition isn't worth it at the moment. If/when I make that
change, it won't result in any API changes so I can do it without bumping the
major version.

I also almost changed the server API around connections. I may still add a
.stream() method to server sessions, but I haven't for now because node's
Writable streams are unusable by browserchannel. I could expose the old node
streams 1 duplex API, but I decided instead to just keep the API we have now.
(its *fine*).
