# # Tests for the bare BrowserChannel client.
#
# Run them by first launching
#
#     % coffee test/support/runserver.coffee
#
# ... Then browsing to localhost:4321 in your browser or running:
#
#     % mocha test/bcsocket.coffee
#
# from the command line. You should do both kinds of testing before pushing.
#
#
# These tests are pretty simple and primitive. The reality is, google's browserchannel
# client library is pretty bloody well tested. (I'm not interested in rewriting that test suite)
#
# However, its important to do some sanity checks on the exported browserchannel bits to
# make sure closure isn't doing anything wacky. Also this acts as a nice little integration
# test for the server, _and_ its useful to make sure that all the browsers node-browserchannel
# supports are behaving themselves.
#
# Oh yeah, and these tests will be run on the nodejs version of browserchannel, which has
# a lot of silly little parts.
#
# These tests will also be useful if the browserchannel protocol ever changes.
#
# Interestingly, most of the benefits of this test suite come from a single test (really, any
# test). If any test passes, they'll all probably pass.
#
#
# ## Known Issues
#
# There's three weird issues with this test suite:
#
# - Sometimes (maybe, 1 in 10) times the test is run from nodejs, it dies in a weird inconsistant
#   state.
# - Sometimes (about 1/4 times) the tests are run, the process doesn't exit for about 5 seconds after
#   the tests have finished. Presumably, there's a setTimeout() in the client somewhere which has
#   a race condition causing it to misbehave.
# - After a test run, 4 sessions are allowed to time out by the server. (Its odd because I'm calling
#   disconnect() in tearDown).

assert = require 'assert'

if typeof window is 'undefined'
  try
    require('./runserver').listen 4321

  bc = require '..'
  # If coffeescript declares a variable called 'BCSocket' here, it will shadow the BCSocket variable
  # that is already defined in the browser. Doing it this way is pretty ugly, but it works and the ugliness
  # is constrained to a test.
  global.BCSocket = bc.BCSocket
  bc.setDefaultLocation 'http://localhost:4321'



suite 'bcsocket', ->
  # IE6 takes about 12 seconds to do the large stress test
  @timeout 20000

  teardown (callback) ->
    if @socket? and @socket.readyState isnt BCSocket.CLOSED
      @socket.onclose = -> callback()
      @socket.close()
      @socket = null
    else
      callback()

  # These match websocket codes
  test 'states and errors are mapped', ->
    assert.strictEqual BCSocket.CONNECTING, 0
    assert.strictEqual BCSocket.OPEN, 1
    assert.strictEqual BCSocket.CLOSING, 2
    assert.strictEqual BCSocket.CLOSED, 3

    assert.strictEqual BCSocket.prototype.CONNECTING, 0
    assert.strictEqual BCSocket.prototype.OPEN, 1
    assert.strictEqual BCSocket.prototype.CLOSING, 2
    assert.strictEqual BCSocket.prototype.CLOSED, 3

  # Can we connect to the server?
  test 'connect', (done) ->
    @socket = new BCSocket '/notify'
    assert.strictEqual @socket.readyState, BCSocket.CONNECTING

    openCalled = false

    @socket.onopen = =>
      assert.strictEqual @socket.readyState, BCSocket.OPEN
      openCalled = true

    @socket.onerror = (reason) ->
      throw new Error reason

    @socket.onmessage = (message) ->
      assert.deepEqual message, {appVersion: null}
      assert.ok openCalled
      done()

  # The socket interface exposes browserchannel's app version thingy through
  # option arguments
  test 'connect sends app version', (done) ->
    @socket = new BCSocket '/notify', appVersion: 321

    @socket.onmessage = (message) ->
      assert.deepEqual message, {appVersion:321}
      done()

  # BrowserChannel's native send method sends a string->string map.
  #
  # I want to test that I can send and recieve messages both before we've connected
  # (they should be sent as soon as the connection is established) and after the
  # connection has opened normally.
  suite 'send maps', ->
    # I'll throw some random unicode characters in here just to make sure...
    data = {'foo': 'bar', 'zot': '(◔ ◡ ◔)'}

    m = (callback) -> (done) ->
      @socket = new BCSocket '/echomap', appVersion: 321
      @socket.onmessage = (message) ->
        assert.deepEqual message, data
        done()

      callback.apply this
    
    test 'immediately', m ->
      @socket.sendMap data

    test 'after we have connected', m ->
      @socket.onopen = =>
        @socket.sendMap data

  # I'll also test the normal send method. This is pretty much the same as above, whereby
  # I'll do the test two ways.
  suite 'can send and receive JSON messages', ->
    # Vim gets formatting errors with the cat face glyph here. Sad.
    data = [null, 1.5, "hi", {}, [1,2,3], '⚗☗⚑☯']

    m = (callback) -> (done) ->
      # Using the /echo server not /echomap
      @socket = new BCSocket '/echo', appVersion: 321
      @socket.onmessage = (message) ->
        assert.deepEqual message, data
        done()

      callback.apply this
    
    test 'immediately', m ->
      # Calling send() instead of sendMap()
      @socket.send data

    test 'after we have connected', m ->
      @socket.onopen = =>
        @socket.send data

  # I have 2 disconnect servers which have slightly different timing regarding when they call close()
  # on the session. If close is called immediately, the initial bind request is rejected
  # with a 403 response, before the client connects.
  test 'disconnecting immediately results in REQUEST_FAILED and a 403', (done) ->
    @socket = new BCSocket '/dc1'

    @socket.onopen = -> throw new Error 'Socket should not have opened'

    onErrorCalled = no
    @socket.onerror = (message, errCode) =>
      assert.strictEqual message, 'Request failed'
      assert.strictEqual errCode, 2
      onErrorCalled = yes

    @socket.onclose = ->
      # This will be called because technically, the websocket does go into the close state!
      #
      # This is exactly what websockets do.
      assert.ok onErrorCalled
      done()

  test 'disconnecting momentarily allows the client to connect, then onclose() is called', (done) ->
    @socket = new BCSocket '/dc2', failFast: yes

    onErrorCalled = no
    @socket.onerror = (message, errCode) =>
      # The error code varies here, depending on some timing parameters & browser.
      # I've seen NO_DATA, REQUEST_FAILED and UNKNOWN_SESSION_ID.
      assert.strictEqual @socket.readyState, @socket.CLOSING
      assert.ok message
      assert.ok errCode
      onErrorCalled = yes

    @socket.onclose = (reason, pendingMaps, undeliveredMaps) =>
      # The error code varies here, depending on some timing parameters & browser.
      # These will probably be undefined, but == will catch that.
      assert.strictEqual @socket.readyState, @socket.CLOSED
      assert.equal pendingMaps, null
      assert.equal undeliveredMaps, null
      assert.ok onErrorCalled
      done()

  suite 'The client keeps reconnecting', ->
    m = (base) -> (done) ->
      @socket = new BCSocket base, failFast: yes, reconnect: yes, reconnectTime: 300
      
      openCount = 0

      @socket.onopen = =>
        throw new Error 'Should not keep trying to open once the test is done' if openCount == 2

        assert.strictEqual @socket.readyState, @socket.OPEN

      @socket.onclose = (reason, pendingMaps, undeliveredMaps) =>
        assert.strictEqual @socket.readyState, @socket.CLOSED

        openCount++
        if openCount is 2
          # Tell the socket to stop trying to connect
          @socket.close()
          done()

    test 'When the connection fails', m('dc1')
#    'When the connection dies': m('dc3')

  suite 'stop', ->
    makeTest = (base) -> (done) ->
      # We don't need failFast for stop.
      @socket = new BCSocket base

      onErrorCalled = no
      @socket.onerror = (message, errCode) =>
        assert.strictEqual @socket.readyState, @socket.CLOSING
        assert.strictEqual message, 'Stopped by server'
        assert.strictEqual errCode, 7
        onErrorCalled = yes

      @socket.onclose = (reason, pendingMaps, undeliveredMaps) =>
        # These will probably be undefined, but == will catch that.
        assert.strictEqual @socket.readyState, @socket.CLOSED
        assert.equal pendingMaps, null
        assert.equal undeliveredMaps, null
        assert.strictEqual reason, 'Stopped by server'
        assert.ok onErrorCalled
        done()

    test 'on connect', makeTest 'stop1'
    test 'after connect', makeTest 'stop2'

  # This is a little stress test to make sure I haven't missed anything.
  # Sending and recieving this much data pushes the client to use multiple
  # forward channel connections. It doesn't use multiple backchannel
  # connections - I should probably put some logic there whereby I close the
  # backchannel after awhile.
  test 'Send & receive lots of data', (done) ->
    num = 5000

    @socket = new BCSocket '/echomap'

    received = 0
    @socket.onmessage = (message) ->
      assert.equal message.data, received
      received++

      done() if received == num

    setTimeout =>
      # Maps aren't actual JSON. They're just key-value pairs. I don't need to encode i as a string here,
      # but thats now its sent anyway.
      @socket.sendMap {data:"#{i}", juuuuuuuuuuuuuuuuunnnnnnnnnk:'waaaazzzzzzuuuuuppppppp'} for i in [0...num]
    , 0

  # We need to be able to send \u2028 and \u2029
  # http://timelessrepo.com/json-isnt-a-javascript-subset
  test 'Line separator and paragraph separators work', (done) ->
    @socket = new BCSocket '/utfsep', appVersion: 321

    @socket.onmessage = (message) ->
      assert.strictEqual message, "\u2028 \u2029"
      done()

  # Write me!
  test 'extraParams are passed to the server'
