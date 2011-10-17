# This is an implementation of a browserchannel client which uses the closure library.
#
# It exposes a Channel, which is an automatically reconnecting connection to the server.


# Aaah closure... This tells the closure compiler which libraries the code here needs to be
# compiled wtih.
#goog.require 'goog.net.BrowserChannel'
#goog.require 'goog.net.BrowserChannel.Handler'
#goog.require 'goog.net.BrowserChannel.Error'
#goog.require 'goog.net.BrowserChannel.State'

#goog.require 'goog.net.ChannelDebug'

# We'll use closure's JSON serializer because IE doesn't come with a JSON serializer / parser.
goog.require 'goog.json'

# Closure uses numerical error codes. We'll translate them into strings for the user.
errorMessages = {}
errorMessages[goog.net.BrowserChannel.Error.OK] = 'Ok'
errorMessages[goog.net.BrowserChannel.Error.LOGGED_OUT] = 'User is being logged out'
errorMessages[goog.net.BrowserChannel.Error.UNKNOWN_SESSION_ID] = 'Unknown session ID'
errorMessages[goog.net.BrowserChannel.Error.STOP] = 'Stopped by server'

# All of these error messages basically boil down to "Something went wrong - try again". I can't
# imagine using different logic on the client based on the error here - just keep reconnecting.

# The client's internet is down (ping to google failed)
errorMessages[goog.net.BrowserChannel.Error.NETWORK] = 'General network error'
# The server could not be contacted
errorMessages[goog.net.BrowserChannel.Error.REQUEST_FAILED] = 'Request failed'

# This error happens when the client can't connect to the special test domain. In my experience,
# this error happens normally sometimes as well - if one particular connection doesn't
# make it through during the channel test. This will never happen with node-browserchannel anyway
# because we don't support the network admin blocking channel.
errorMessages[goog.net.BrowserChannel.Error.BLOCKED] = 'The channel has been blocked by a network administrator'

# We got an invalid response from the server
errorMessages[goog.net.BrowserChannel.Error.NO_DATA] = 'No data from server'
errorMessages[goog.net.BrowserChannel.Error.BAD_DATA] = 'Got bad data from the server'
errorMessages[goog.net.BrowserChannel.Error.BAD_RESPONSE] = 'Got a bad response from the server'

states = {}
states[goog.net.BrowserChannel.State.CLOSED] = 'closed'
states[goog.net.BrowserChannel.State.INIT] = 'init'
states[goog.net.BrowserChannel.State.OPENING] = 'opening'
states[goog.net.BrowserChannel.State.OPENED] = 'open'

`/** @constructor */`
Channel = (url, appVersion, prepare) ->
  url ||= 'channel'

  prepare ||= (callback) -> callback()

  # The channel starts 'stopped'. When connect() is called, the channel moves into the 'connecting'
  # state. If it connects, it moves to 'connected'. If an error occurs (or an error occurs while the
  # connection is connected), the channel moves to 'waiting', where it waits for a few seconds before
  # trying to connect again.
  #
  # At any time, you can call disconnect() or stop(), which disconnects the channel if there is one
  # and moves the channel back into the 'stopped' state.
  @state = 'stopped'

  # The current browserchannel session we're connected through.
  session = null

  # When we reconnect, we'll pass the SID and AID from the previous time we successfully connected.
  lastSession = null

  # A handler is used to receive events back out of the session.
  handler = new goog.net.BrowserChannel.Handler()

  # If there's an error, the handler's channelError() method is called right before channelClosed().
  # We'll cache the error so a 'disconnect' handler knows the disconnect reason.
  closeReason = null

  handler.channelOpened = (channel) =>
    console?.warn "channelOpened in state #{@state}" unless @state is 'connecting'
    console?.log "state #{@state} -> connected"
    @state = 'connected'
    lastSession = session
    @emit 'connected'

  # This is called when the session has the final error explaining why its closing. It is
  # called only once, just before channelClosed(). It is not called if the session is manually
  # disconnected.
  handler.channelError = (channel, errCode) =>
    console.error 'channelError', closeReason
    closeReason = errorMessages[errCode]
    @emit 'error', closeReason, errCode

  handler.channelClosed = (channel, pendingMaps, undeliveredMaps) =>
    console.error 'channelClosed'
    # Hm.
    #
    # I'm not sure what to do with this potentially-undelivered data. I think I'll toss it
    # to the emitter and let that deal with it.
    #
    # I'd rather call a callback on send(), like the server does.
    #
    # For the connection repeater, we'll probably deal with it in the connection handler.
    undelivered = if pendingMaps then pendingMaps.concat undeliveredMaps else []

    console?.log "state #{@state} -> waiting"
    # Should handle server stop
    @state = 'waiting'
    @emit 'disconnect', closeReason, undelivered
    reconnectTimer = setTimeout (-> reconnect(); reconnectTimer = null), 3000
    @['reconnectTime'] = Date.now()

  # Handle a message from the server
  handler.channelHandleArray = (channel, message) =>
    @emit 'message', message

  reconnect = =>
    console?.warn "reconnect from state #{@state}" unless @state is 'waiting'
    console?.log "state #{@state} -> preparing"
    @state = 'preparing'
    clearTimeout reconnectTimer
    @emit 'preparing'
    # I'm not actually sure if I need to make a new BC session here...
    session = new goog.net.BrowserChannel appVersion
    session.setHandler handler
    closeReason = null

    # Only needed for debugging..
    #session.setChannelDebug(new goog.net.ChannelDebug())

    prepare =>
      console?.log 'calling connect()'
      console?.log "state #{@state} -> connecting"
      @state = 'connecting'
      @emit 'connecting'
      session.connect "#{url}/test", "#{url}/bind", null,
        lastSession?.getSessionId(), lastSession?.getLastArrayId()
  
  reconnectTimer = null

  @['connect'] = @connect = =>
    console?.log "state #{@state} -> stopped"
    @state = 'waiting' if @state is 'stopped'
    reconnect()

  @['disconnect'] = @disconnect = =>
    clearTimeout reconnectTimer
    console?.log "disconnect() in state #{@state}"
    console?.log "state #{@state} -> stopped"
    @state = 'stopped'
    session.disconnect()

  # I really want @send to take a callback which is called when the message is either confirmed
  # received or failed. However, closure provides no callback when messages are sent.
  @['send'] = @send = (message) ->
    session.sendMap 'JSON': goog.json.serialize message
  
  @['sendMap'] = @sendMap = (message) ->
    session.sendMap message
  
  this

MicroEvent.mixin Channel

(exports ? window)['Channel'] = Channel

