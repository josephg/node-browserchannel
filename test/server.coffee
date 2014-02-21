# # Unit tests for BrowserChannel server
#
# This contains all the unit tests to make sure the server works like it
# should. The tests are written using mocha - you can run them using 
# % npm test
#
# For now I'm not going to add in any SSL testing code. I should probably generate
# a self-signed key pair, start the server using https and make sure that I can
# still use it.
#
# I'm also missing integration tests.

http = require 'http'
assert = require 'assert'
querystring = require 'querystring'
connect = require 'connect'

timer = require 'timerstub'

browserChannel = require('..').server
browserChannel._setTimerMethods timer

# This function provides an easy way for tests to create a new browserchannel server using
# connect().
#
# I'll create a new server in the setup function of all the tests, but some
# tests will need to customise the options, so they can just create another server directly.
createServer = (opts, method, callback) ->
  # Its possible to use the browserChannel middleware without specifying an options
  # object. This little createServer function will mirror that behaviour.
  if typeof opts == 'function'
    [method, callback] = [opts, method]
    # I want to match up with how its actually going to be used.
    bc = browserChannel method
  else
    bc = browserChannel opts, method
  
  # The server is created using connect middleware. I'll simulate other middleware in
  # the stack by adding a second handler which responds with 200, 'Other middleware' to
  # any request.
  app = connect bc, (req, res, next) ->
    # I might not actually need to specify the headers here... (If you don't, nodejs provides
    # some defaults).
    res.writeHead 200, 'OK', 'Content-Type': 'text/plain'
    res.end 'Other middleware'

  # Calling server.listen() without a port lets the OS pick a port for us. I don't
  # know why more testing frameworks don't do this by default.
  server = http.createServer(app).listen ->
    # Obviously, we need to know the port to be able to make requests from the server.
    # The callee could check this itself using the server object, but it'll always need
    # to know it, so its easier pulling the port out here.
    port = server.address().port
    callback server, port, bc

# Wait for the function to be called a given number of times, then call the callback.
#
# This useful little method has been stolen from ShareJS
expectCalls = (n, callback) ->
  return callback() if n == 0

  remaining = n
  ->
    remaining--
    if remaining == 0
      callback()
    else if remaining < 0
      throw new Error "expectCalls called more than #{n} times"

# This returns a function that calls done() after it has been called n times. Its
# useful when you want a bunch of mini tests inside one test case.
makePassPart = (test, n) ->
  expectCalls n, -> done()

# Most of these tests will make HTTP requests. A lot of the time, we don't care about the
# timing of the response, we just want to know what it was. This method will buffer the
# response data from an http response object and when the whole response has been received,
# send it on.
buffer = (res, callback) ->
  data = []
  res.on 'data', (chunk) ->
    #console.warn chunk.toString()
    data.push chunk.toString 'utf8'
  res.on 'end', -> callback? data.join ''

# For some tests we expect certain data, delivered in chunks. Wait until we've
# received at least that much data and strcmp. The response will probably be used more,
# afterwards, so we'll make sure the listener is removed after we're done.
expect = (res, str, callback) ->
  data = ''
  res.on 'end', endlistener = ->
    # This should fail - if the data was as long as str, we would have compared them
    # already. Its important that we get an error message if the http connection ends
    # before the string has been received.
    console.warn 'Connection ended prematurely'
    assert.strictEqual data, str

  res.on 'data', listener = (chunk) ->
    # I'm using string += here because the code is easier that way.
    data += chunk.toString 'utf8'
    #console.warn JSON.stringify data
    #console.warn JSON.stringify str
    if data.length >= str.length
      assert.strictEqual data, str
      res.removeListener 'data', listener
      res.removeListener 'end', endlistener
      callback()

# A bunch of tests require that we wait for a network connection to get established
# before continuing.
#
# We'll do that using a setTimeout with plenty of time. I hate adding delays, but I
# can't see another way to do this.
#
# This should be plenty of time. I might even be able to reduce this. Note that this
# is a real delay, not a stubbed out timer like we give to the server.
soon = (f) -> setTimeout f, 10

readLengthPrefixedString = (res, callback) ->
  data = ''
  length = null
  res.on 'data', listener = (chunk) ->
    data += chunk.toString 'utf8'

    if length == null
      # The number of bytes is written in an int on the first line.
      lines = data.split '\n'
      # If lines length > 1, then we've read the first newline, which was after the length
      # field.
      if lines.length > 1
        length = parseInt lines.shift()

        # Now we'll rewrite the data variable to not include the length.
        data = lines.join '\n'

    if data.length == length
      res.removeListener 'data', listener
      callback data
    else if data.length > length
      console.warn data
      throw new Error "Read more bytes from stream than expected"

# The backchannel is implemented using a bunch of messages which look like this:
#
# ```
# 36
# [[0,["c","92208FBF76484C10",,8]
# ]
# ]
# ```
#
# (At least, thats what they look like using google's server. On mine, they're properly
# formatted JSON).
#
# Each message has a length string (in bytes) followed by a newline and some JSON data.
# They can optionally have extra chunks afterwards.
#
# This format is used for:
#
# - All XHR backchannel messages
# - The response to the initial connect (XHR or HTTP)
# - The server acknowledgement to forward channel messages
#
# This is not used when you're on IE, for normal backchannel requests. On IE, data is sent
# through javascript calls from an iframe.
readLengthPrefixedJSON = (res, callback) ->
  readLengthPrefixedString res, (data) ->
    callback JSON.parse(data)

# Copied from google's implementation. The contents of this aren't actually relevant,
# but I think its important that its pseudo-random so if the connection is compressed,
# it still recieves a bunch of bytes after the first message.
ieJunk = "7cca69475363026330a0d99468e88d23ce95e222591126443015f5f462d9a177186c8701fb45a6ffe\
e0daf1a178fc0f58cd309308fba7e6f011ac38c9cdd4580760f1d4560a84d5ca0355ecbbed2ab715a3350fe0c47\
9050640bd0e77acec90c58c4d3dd0f5cf8d4510e68c8b12e087bd88cad349aafd2ab16b07b0b1b8276091217a44\
a9fe92fedacffff48092ee693af\n"

suite 'server', ->
  # #### setup
  #
  # Before each test has run, we'll start a new server. The server will only live
  # for that test and then it'll be torn down again.
  #
  # This makes the tests run more slowly, but not slowly enough that I care.
  setup (callback) ->
    # This will make sure there's no pesky setTimeouts from previous tests kicking around.
    # I could instead do a timer.waitAll() in tearDown to let all the timers run & time out
    # the running sessions. It shouldn't be a big deal.
    timer.clearAll()

    # When you instantiate browserchannel, you specify a function which gets called
    # with each session that connects. I'll proxy that function call to a local function
    # which tests can override.
    @onSession = (session) ->
    # The proxy is inline here. Also, I <3 coffeescript's (@server, @port) -> syntax here.
    # That will automatically set this.server and this.port to the callback arguments.
    # 
    # Actually calling the callback starts the test.
    createServer ((session) => @onSession session), (@server, @port, @bc) =>
      # TODO - This should be exported from lib/server
      @standardHeaders=
        'Content-Type': 'text/plain'
        'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate'
        'Pragma': 'no-cache'
        'Expires': 'Fri, 01 Jan 1990 00:00:00 GMT'
        'X-Content-Type-Options': 'nosniff'

      # I'll add a couple helper methods for tests to easily message the server.
      @get = (path, callback) =>
        http.get {host:'localhost', path, @port}, callback

      @post = (path, data, callback) =>
        req = http.request {method:'POST', host:'localhost', path, @port}, callback
        req.end data

      # One of the most common tasks in tests is to create a new session for
      # some reason. @connect is a little helper method for that. It simply sends the
      # http POST to create a new session and calls the callback when the session has been
      # created by the server.
      #
      # It also makes @onSession throw an error - very few tests need multiple sessions,
      # so I special case them when they do.
      #
      # Its kind of annoying - for a lot of tests I need to do custom logic in the @post
      # handler *and* custom logic in @onSession. So, callback can be an object specifying
      # callbacks for each if you want that. Its a shame though, it makes this function
      # kinda ugly :/
      @connect = (callback) =>
        # This connect helper method is only useful if you don't care about the initial
        # post response.
        @post '/channel/bind?VER=8&RID=1000&t=1', 'count=0'

        @onSession = (@session) =>
          @onSession = -> throw new Error 'onSession() called - I didn\'t expect another session to be created'
          # Keep this bound. I think there's a fancy way to do this in coffeescript, but
          # I'm not sure what it is.
          callback.call this

      # Finally, start the test.
      callback()

  teardown (callback) ->
    # #### tearDown
    #
    # This is called after each tests is done. We'll tear down the server we just created.
    #
    # The next test is run once the callback is called. I could probably chain the next
    # test without waiting for close(), but then its possible that an exception thrown
    # in one test will appear after the next test has started running. Its easier to debug
    # like this.
    @server.close callback
  
  # The server hosts the client-side javascript at /channel.js. It should have headers set to tell
  # browsers its javascript.
  #
  # Its self contained, with no dependancies on anything. It would be nice to test it as well,
  # but we'll do that elsewhere.
  test 'The javascript is hosted at channel/bcsocket.js', (done) ->
    @get '/channel/bcsocket.js', (response) ->
      assert.strictEqual response.statusCode, 200
      assert.strictEqual response.headers['content-type'], 'application/javascript'
      assert.ok response.headers['etag']
      buffer response, (data) ->
        # Its about 47k. If the size changes too drastically, I want to know about it.
        assert.ok data.length > 45000, "Client is unusually small (#{data.length} bytes)"
        assert.ok data.length < 50000, "Client is bloaty (#{data.length} bytes)"
        done()

  # # Testing channel tests
  #
  # The first thing a client does when it connects is issue a GET on /test/?mode=INIT.
  # The server responds with an array of [basePrefix or null,blockedPrefix or null]. Blocked
  # prefix isn't supported by node-browerchannel and by default no basePrefix is set. So with no
  # options specified, this GET should return [null,null].
  test 'GET /test/?mode=INIT with no baseprefix set returns [null, null]', (done) ->
    @get '/channel/test?VER=8&MODE=init', (response) ->
      assert.strictEqual response.statusCode, 200
      buffer response, (data) ->
        assert.strictEqual data, '[null,null]'
        done()

  # If a basePrefix is set in the options, make sure the server returns it.
  test 'GET /test/?mode=INIT with a basePrefix set returns [basePrefix, null]', (done) ->
    # You can specify a bunch of host prefixes. If you do, the server will randomly pick between them.
    # I don't know if thats actually useful behaviour, but *shrug*
    # I should probably write a test to make sure all host prefixes will be chosen from time to time.
    createServer hostPrefixes:['chan'], (->), (server, port) ->
      http.get {path:'/channel/test?VER=8&MODE=init', host: 'localhost', port: port}, (response) ->
        assert.strictEqual response.statusCode, 200
        buffer response, (data) ->
          assert.strictEqual data, '["chan",null]'
          # I'm being slack here - the server might not close immediately. I could make done()
          # dependant on it, but I can't be bothered.
          server.close()
          done()

  # Setting a custom url endpoint to bind node-browserchannel to should make it respond at that url endpoint
  # only.
  test 'The test channel responds at a bound custom endpoint', (done) ->
    createServer base:'/foozit', (->), (server, port) ->
      http.get {path:'/foozit/test?VER=8&MODE=init', host: 'localhost', port: port}, (response) ->
        assert.strictEqual response.statusCode, 200
        buffer response, (data) ->
          assert.strictEqual data, '[null,null]'
          server.close()
          done()
  
  # Some people will miss out on the leading slash in the URL when they bind browserchannel to a custom
  # url. That should work too.
  test 'binding the server to a custom url without a leading slash works', (done) ->
    createServer base:'foozit', (->), (server, port) ->
      http.get {path:'/foozit/test?VER=8&MODE=init', host: 'localhost', port: port}, (response) ->
        assert.strictEqual response.statusCode, 200
        buffer response, (data) ->
          assert.strictEqual data, '[null,null]'
          server.close()
          done()
  
  # Its tempting to think that you need a trailing slash on your URL prefix as well. You don't, but that should
  # work too.
  test 'binding the server to a custom url with a trailing slash works', (done) ->
    # Some day, the copy+paste police are gonna get me. I don't feel *so* bad doing it for tests though, because
    # it helps readability.
    createServer base:'foozit/', (->), (server, port) ->
      http.get {path:'/foozit/test?VER=8&MODE=init', host: 'localhost', port: port}, (response) ->
        assert.strictEqual response.statusCode, 200
        buffer response, (data) ->
          assert.strictEqual data, '[null,null]'
          server.close()
          done()

  # You can control the CORS header ('Access-Control-Allow-Origin') using options.cors.
  test 'CORS header is not sent if its not set in the options', (done) ->
    @get '/channel/test?VER=8&MODE=init', (response) ->
      assert.strictEqual response.headers['access-control-allow-origin'], undefined
      assert.strictEqual response.headers['access-control-allow-credentials'], undefined
      response.socket.end()
      done()

  test 'CORS headers are sent during the initial phase if set in the options', (done) ->
    createServer cors:'foo.com', corsAllowCredentials:true, (->), (server, port) ->
      http.get {path:'/channel/test?VER=8&MODE=init', host: 'localhost', port: port}, (response) ->
        assert.strictEqual response.headers['access-control-allow-origin'], 'foo.com'
        assert.strictEqual response.headers['access-control-allow-credentials'], 'true'
        buffer response
        server.close()
        done()

  test 'CORS header is set on the backchannel response', (done) ->
    server = port = null

    sessionCreated = (session) ->
      # Make the backchannel flush as soon as its opened
      session.send "flush"

      req = http.get {path:"/channel/bind?VER=8&RID=rpc&SID=#{session.id}&AID=0&TYPE=xmlhttp&CI=0", host:'localhost', port:port}, (res) =>
        assert.strictEqual res.headers['access-control-allow-origin'], 'foo.com'
        assert.strictEqual res.headers['access-control-allow-credentials'], 'true'
        req.abort()
        server.close()
        done()
    
    createServer cors:'foo.com', corsAllowCredentials:true, sessionCreated, (_server, _port) ->
      [server, port] = [_server, _port]

      req = http.request {method:'POST', path:'/channel/bind?VER=8&RID=1000&t=1', host:'localhost', port:port}, (res) =>
      req.end 'count=0'

  # This test is just testing one of the error responses for the presence of
  # the CORS header. It doesn't test all of the ports, and doesn't test IE.
  # (I'm not actually sure if CORS headers are needed for IE stuff)
  suite 'CORS header is set in error responses', ->
    setup (callback) ->
      createServer cors:'foo.com', corsAllowCredentials:true, (->), (@corsServer, @corsPort) =>
        callback()

    teardown ->
      @corsServer.close()

    testResponse = (done, req, res) ->
      assert.strictEqual res.statusCode, 400
      assert.strictEqual res.headers['access-control-allow-origin'], 'foo.com'
      assert.strictEqual res.headers['access-control-allow-credentials'], 'true'
      buffer res, (data) ->
        assert.ok data.indexOf('Unknown SID') > 0
        req.abort()
        done()

    test 'backChannel', (done) ->
      req = http.get {path:'/channel/bind?VER=8&RID=rpc&SID=madeup&AID=0&TYPE=xmlhttp&CI=0', host:'localhost', port:@corsPort}, (res) =>
        testResponse done, req, res

    test 'forwardChannel', (done) ->
      req = http.request {method:'POST', path:'/channel/bind?VER=8&RID=1001&SID=junkyjunk&AID=0', host:'localhost', port:@corsPort}, (res) =>
        testResponse done, req, res
      req.end 'count=0'

      #@post "/channel/bind?VER=8&RID=1001&SID=junkyjunk&AID=0", 'count=0', testResponse(done)


  test 'Additional headers can be specified in the options', (done) ->
    createServer headers:{'X-Foo':'bar'}, (->), (server, port) ->
      http.get {path:'/channel/test?VER=8&MODE=init', host: 'localhost', port: port}, (response) ->
        assert.strictEqual response.headers['x-foo'], 'bar'
        server.close()
        done()

  # Interestingly, the CORS header isn't required for old IE (type=html) requests because they're loaded using
  # iframes anyway. (Though this should really be tested).

 
  # node-browserchannel is only responsible for URLs with the specified (or default) prefix. If a request
  # comes in for a URL outside of that path, it should be passed along to subsequent connect middleware.
  #
  # I've set up the createServer() method above to send 'Other middleware' if browserchannel passes
  # the response on to the next handler.
  test 'getting a url outside of the bound range gets passed to other middleware', (done) ->
    @get '/otherapp', (response) ->
      assert.strictEqual response.statusCode, 200
      buffer response, (data) ->
        assert.strictEqual data, 'Other middleware'
        done()
  
  # I decided to make URLs inside the bound range return 404s directly. I can't guarantee that no future
  # version of node-browserchannel won't add more URLs in the zone, so its important that users don't decide
  # to start using arbitrary other URLs under channel/.
  #
  # That design decision makes it impossible to add a custom 404 page to /channel/FOO, but I don't think thats a
  # big deal.
  test 'getting a wacky url inside the bound range returns 404', (done) ->
    @get '/channel/doesnotexist', (response) ->
      assert.strictEqual response.statusCode, 404
      response.socket.end()
      done()

  # For node-browserchannel, we also accept JSON in forward channel POST data. To tell the client that
  # this is supported, we add an `X-Accept: application/json; application/x-www-form-urlencoded` header
  # in phase 1 of the test API.
  test 'The server sends accept:JSON header during test phase 1', (done) ->
    @get '/channel/test?VER=8&MODE=init', (res) ->
      assert.strictEqual res.headers['x-accept'], 'application/json; application/x-www-form-urlencoded'
      res.socket.end()
      done()

  # All the standard headers should be sent along with X-Accept
  test 'The server sends standard headers during test phase 1', (done) ->
    @get '/channel/test?VER=8&MODE=init', (res) =>
      assert.strictEqual res.headers[k.toLowerCase()].toLowerCase(), v.toLowerCase() for k,v of @standardHeaders
      res.socket.end()
      done()

  # ## Testing phase 2
  #
  # I should really sort the above tests better.
  # 
  # Testing phase 2 the client GETs /channel/test?VER=8&TYPE= [html / xmlhttp] &zx=558cz3evkwuu&t=1 [&DOMAIN=xxxx]
  #
  # The server sends '11111' <2 second break> '2'. If you use html encoding instead, the server sends the client
  # a webpage which calls:
  #
  #     document.domain='mail.google.com';
  #     parent.m('11111');
  #     parent.m('2');
  #     parent.d();
  suite 'Getting test phase 2 returns 11111 then 2', ->
    makeTest = (type, message1, message2) -> (done) ->
      @get "/channel/test?VER=8&TYPE=#{type}", (response) ->
        assert.strictEqual response.statusCode, 200

        expect response, message1, ->
          # Its important to make sure that message 2 isn't sent too soon (<2 seconds).
          # We'll advance the server's clock forward by just under 2 seconds and then wait a little bit
          # for messages from the client. If we get a message during this time, throw an error.
          response.on 'data', f = -> throw new Error 'should not get more data so early'
          timer.wait 1999, ->
            soon ->
              response.removeListener 'data', f
              expect response, message2, ->
                response.once 'end', -> done()

              timer.wait 1

    test 'xmlhttp', makeTest 'xmlhttp', '11111', '2'

    # I could write this test using JSDom or something like that, and parse out the HTML correctly.
    # ... but it would be way more complicated (and no more correct) than simply comparing the resulting
    # strings.
    test 'html', makeTest('html',
      # These HTML responses are identical to what I'm getting from google's servers. I think the seemingly
      # random sequence is just so network framing doesn't try and chunk up the first packet sent to the server
      # or something like that.
      """<html><body><script>try {parent.m("11111")} catch(e) {}</script>\n#{ieJunk}""",
      '''<script>try {parent.m("2")} catch(e) {}</script>
<script>try  {parent.d(); }catch (e){}</script>\n''')

    # If a client is connecting with a host prefix, the server sets the iframe's document.domain to match
    # before sending actual data.
    'html with a host prefix': makeTest('html&DOMAIN=foo.bar.com',
      # I've made a small change from google's implementation here. I'm using double quotes `"` instead of
      # single quotes `'` because its easier to encode. (I can't just wrap the string in quotes because there
      # are potential XSS vulnerabilities if I do that).
      """<html><body><script>try{document.domain="foo.bar.com";}catch(e){}</script>
<script>try {parent.m("11111")} catch(e) {}</script>\n#{ieJunk}""",
      '''<script>try {parent.m("2")} catch(e) {}</script>
<script>try  {parent.d(); }catch (e){}</script>\n''')
  
  # IE doesn't parse the HTML in the response unless the Content-Type is text/html
  test 'Using type=html sets Content-Type: text/html', (done) ->
    r = @get "/channel/test?VER=8&TYPE=html", (response) ->
      assert.strictEqual response.headers['content-type'], 'text/html'
      r.abort()
      done()

  # IE should also get the standard headers
  test 'Using type=html gets the standard headers', (done) ->
    r = @get "/channel/test?VER=8&TYPE=html", (response) =>
      for k, v of @standardHeaders when k isnt 'Content-Type'
        assert.strictEqual response.headers[k.toLowerCase()].toLowerCase(), v.toLowerCase()
      r.abort()
      done()

  # node-browserchannel is only compatible with browserchannel client version 8. I don't know whats changed
  # since old versions (maybe v6 would be easy to support) but I don't care. If the client specifies
  # an old version, we'll die with an error.
  # The alternate phase 2 URL style should have the same behaviour if the version is old or unspecified.
  #
  # Google's browserchannel server still works if you miss out on specifying the version - it defaults
  # to version 1 (which maybe didn't have version numbers in the URLs). I'm kind of impressed that
  # all that code still works.
  suite 'Getting /test/* without VER=8 returns an error', ->
    # All these tests look 95% the same. Instead of writing the same test all those times, I'll use this
    # little helper method to generate them.
    check400 = (path) -> (done) ->
      @get path, (response) ->
        assert.strictEqual response.statusCode, 400
        response.socket.end()
        done()

    test 'phase 1, ver 7', check400 '/channel/test?VER=7&MODE=init'
    test 'phase 1, no version', check400 '/channel/test?MODE=init'
    test 'phase 2, ver 7, xmlhttp', check400 '/channel/test?VER=7&TYPE=xmlhttp'
    test 'phase 2, no version, xmlhttp', check400 '/channel/test?TYPE=xmlhttp'
    # For HTTP connections (IE), the error is sent a different way. Its kinda complicated how the error
    # is sent back, so for now I'm just going to ignore checking it.
    test 'phase 2, ver 7, http', check400 '/channel/test?VER=7&TYPE=html'
    test 'phase 2, no version, http', check400 '/channel/test?TYPE=html'
  

  # > At the moment the server expects the client will add a zx=###### query parameter to all requests.
  # The server isn't strict about this, so I'll ignore it in the tests for now.

  # # Server connection tests
  
  # These tests make server sessions by crafting raw HTTP queries. I'll make another set of
  # tests later which spam the server with a million fake clients.
  #
  # To start with, simply connect to a server using the BIND API. A client sends a server a few parameters:
  #
  # - **CVER**: Client application version
  # - **RID**: Client-side generated random number, which is the initial sequence number for the
  #   client's requests.
  # - **VER**: Browserchannel protocol version. Must be 8.
  # - **t**: The connection attempt number. This is currently ignored by the BC server. (I'm not sure
  #   what google's implementation does with this).
  test 'The server makes a new session if the client POSTs the right connection stuff', (done) ->
    id = null
    onSessionCalled = no
    # When a request comes in, we should get the new session through the server API.
    #
    # We need this session in order to find out the session ID, which should match up with part of the
    # server's response.
    @onSession = (session) ->
      assert.ok session
      assert.strictEqual typeof session.id, 'string'
      assert.strictEqual session.state, 'init'
      assert.strictEqual session.appVersion, '99'
      assert.deepEqual session.address, '127.0.0.1'
      assert.strictEqual typeof session.headers, 'object'

      id = session.id
      session.on 'map', -> throw new Error 'Should not have received data'
      onSessionCalled = yes

    # The client starts a BC connection by POSTing to /bind? with no session ID specified.
    # The client can optionally send data here, but in this case it won't (hence the `count=0`).
    @post '/channel/bind?VER=8&RID=1000&CVER=99&t=1&junk=asdfasdf', 'count=0', (res) =>
      expected = (JSON.stringify [[0, ['c', id, null, 8]]]) + '\n'
      buffer res, (data) ->
        # Even for old IE clients, the server responds in length-prefixed JSON style.
        assert.strictEqual data, "#{expected.length}\n#{expected}"
        assert.ok onSessionCalled
        done()
  
  # Once a client's session id is sent, the session moves to the `ok` state. This happens after onSession is
  # called (so onSession can send messages to the client immediately).
  #
  # I'm starting to use the @connect method here, which just POSTs locally to create a session, sets @session and
  # calls its callback.
  test 'A session has state=ok after onSession returns', (done) -> @connect ->
    @session.on 'state changed', (newState, oldState) =>
      assert.strictEqual oldState, 'init'
      assert.strictEqual newState, 'ok'
      assert.strictEqual @session.state, 'ok'
      done()

  # The CVER= property is optional during client connections. If its left out, session.appVersion is
  # null.
  test 'A session connects ok even if it doesnt specify an app version', (done) ->
    id = null
    onSessionCalled = no
    @onSession = (session) ->
      assert.strictEqual session.appVersion, null
      id = session.id
      session.on 'map', -> throw new Error 'Should not have received data'
      onSessionCalled = yes

    @post '/channel/bind?VER=8&RID=1000&t=1&junk=asdfasdf', 'count=0', (res) =>
      expected = (JSON.stringify [[0, ['c', id, null, 8]]]) + '\n'
      buffer res, (data) ->
        assert.strictEqual data, "#{expected.length}\n#{expected}"
        assert.ok onSessionCalled
        done()

  # Once again, only VER=8 works.
  suite 'Connecting with a version thats not 8 breaks', ->
    # This will POST to the requested path and make sure the response sets status 400
    check400 = (path) -> (done) ->
      @post path, 'count=0', (response) ->
        assert.strictEqual response.statusCode, 400
        response.socket.end()
        done()
    
    test 'no version', check400 '/channel/bind?RID=1000&t=1'
    test 'previous version', check400 '/channel/bind?VER=7&RID=1000&t=1'

  # This time, we'll send a map to the server during the initial handshake. This should be received
  # by the server as normal.
  test 'The client can post messages to the server during initialization', (done) ->
    @onSession = (session) ->
      session.on 'map', (data) ->
        assert.deepEqual data, {k:'v'}
        done()

    @post '/channel/bind?VER=8&RID=1000&t=1', 'count=1&ofs=0&req0_k=v', (res) =>
      res.socket.end()
  
  # The data received by the server should be properly URL decoded and whatnot.
  test 'Server messages are properly URL decoded', (done) ->
    @onSession = (session) ->
      session.on 'map', (data) ->
        assert.deepEqual data, {"_int_^&^%#net":'hi"there&&\nsam'}
        done()

    @post('/channel/bind?VER=8&RID=1000&t=1',
      'count=1&ofs=0&req0__int_%5E%26%5E%25%23net=hi%22there%26%26%0Asam', (res) -> res.socket.end())

  # After a client connects, it can POST data to the server using URL-encoded POST data. This data
  # is sent by POSTing to /bind?SID=....
  #
  # The data looks like this:
  #
  # count=5&ofs=1000&req0_KEY1=VAL1&req0_KEY2=VAL2&req1_KEY3=req1_VAL3&...
  test 'The client can post messages to the server after initialization', (done) -> @connect ->
    @session.on 'map', (data) ->
      assert.deepEqual data, {k:'v'}
      done()

    @post "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&AID=0", 'count=1&ofs=0&req0_k=v', (res) =>
      res.socket.end()
  
  # When the server gets a forwardchannel request, it should reply with a little array saying whats
  # going on.
  test 'The server acknowledges forward channel messages correctly', (done) -> @connect ->
    @post "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&AID=0", 'count=1&ofs=0&req0_k=v', (res) =>
      readLengthPrefixedJSON res, (data) =>
        # The server responds with [backchannelMissing ? 0 : 1, lastSentAID, outstandingBytes]
        assert.deepEqual data, [0, 0, 0]
        done()

  # If the server has an active backchannel, it responds to forward channel requests notifying the client
  # that the backchannel connection is alive and well.
  test 'The server tells the client if the backchannel is alive', (done) -> @connect ->
    # This will fire up a backchannel connection to the server.
    req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp", (res) =>
      # The client shouldn't get any data through the backchannel.
      res.on 'data', -> throw new Error 'Should not get data through backchannel'

    # Unfortunately, the GET request is sent *after* the POST, so we have to wrap the
    # post in a timeout to make sure it hits the server after the backchannel connection is
    # established.
    soon =>
      @post "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&AID=0", 'count=1&ofs=0&req0_k=v', (res) =>
        readLengthPrefixedJSON res, (data) =>
          # This time, we get a 1 as the first argument because the backchannel connection is
          # established.
          assert.deepEqual data, [1, 0, 0]
          # The backchannel hasn't gotten any data yet. It'll spend 15 seconds or so timing out
          # if we don't abort it manually.

          # As of nodejs 0.6, if you abort() a connection, it can emit an error.
          req.on 'error', ->
          req.abort()
          done()

  # The forward channel response tells the client how many unacknowledged bytes there are, so it can decide
  # whether or not it thinks the backchannel is dead.
  test 'The server tells the client how much unacknowledged data there is in the post response', (done) -> @connect ->
    process.nextTick =>
      # I'm going to send a few messages to the client and acknowledge the first one in a post response.
      @session.send 'message 1'
      @session.send 'message 2'
      @session.send 'message 3'

    # We'll make a backchannel and get the data
    req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=0", (res) =>
      readLengthPrefixedJSON res, (data) =>
        # After the data is received, I'll acknowledge the first message using an empty POST
        @post "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&AID=1", 'count=0', (res) =>
          readLengthPrefixedJSON res, (data) =>
            # We should get a response saying "The backchannel is connected", "The last message I sent was 3"
            # "messages 2 and 3 haven't been acknowledged, here's their size"
            assert.deepEqual data, [1, 3, 25]
            req.abort()
            done()
  
  # When the user calls send(), data is queued by the server and sent into the next backchannel connection.
  #
  # The server will use the initial establishing connection if thats available, or it'll send it the next
  # time the client opens a backchannel connection.
  test 'The server returns data on the initial connection when send is called immediately', (done) ->
    testData = ['hello', 'there', null, 1000, {}, [], [555]]
    @onSession = (@session) =>
      @session.send testData

    # I'm not using @connect because we need to know about the response to the first POST.
    @post '/channel/bind?VER=8&RID=1000&t=1', 'count=0', (res) =>
      readLengthPrefixedJSON res, (data) =>
        assert.deepEqual data, [[0, ['c', @session.id, null, 8]], [1, testData]]
        done()

  test 'The server escapes tricky characters before sending JSON over the wire', (done) ->
    testData = {'a': 'hello\u2028\u2029there\u2028\u2029'}
    @onSession = (@session) =>
      @session.send testData

    # I'm not using @connect because we need to know about the response to the first POST.
    @post '/channel/bind?VER=8&RID=1000&t=1', 'count=0', (res) =>
      readLengthPrefixedString res, (data) =>
        assert.deepEqual data, """[[0,["c","#{@session.id}",null,8]],[1,{"a":"hello\\u2028\\u2029there\\u2028\\u2029"}]]\n"""
        done()

  test 'The server buffers data if no backchannel is available', (done) -> @connect ->
    testData = ['hello', 'there', null, 1000, {}, [], [555]]

    # The first response to the server is sent after this method returns, so if we send the data
    # in process.nextTick, it'll get buffered.
    process.nextTick =>
      @session.send testData

      req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=0", (res) =>
        readLengthPrefixedJSON res, (data) =>
          assert.deepEqual data, [[1, testData]]
          req.abort()
          done()
  
  # This time, we'll fire up the back channel first (and give it time to get established) _then_
  # send data through the session.
  test 'The server returns data through the available backchannel when send is called later', (done) -> @connect ->
    testData = ['hello', 'there', null, 1000, {}, [], [555]]

    # Fire off the backchannel request as soon as the client has connected
    req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=0", (res) ->

      #res.on 'data', (chunk) -> console.warn chunk.toString()
      readLengthPrefixedJSON res, (data) ->
        assert.deepEqual data, [[1, testData]]
        req.abort()
        done()

    # Send the data outside of the get block to make sure it makes it through.
    soon => @session.send testData
  
  # The server should call the send callback once the data has been confirmed by the client.
  #
  # We'll try sending three messages to the client. The first message will be sent during init and the
  # third message will not be acknowledged. Only the first two message callbacks should get called.
  test 'The server calls send callback once data is acknowledged', (done) -> @connect ->
    lastAck = null

    @session.send [1], ->
      assert.strictEqual lastAck, null
      lastAck = 1

    process.nextTick =>
      @session.send [2], ->
        assert.strictEqual lastAck, 1
        # I want to give the test time to die
        soon -> done()

      # This callback should actually get called with an error after the client times out. ... but I'm not
      # giving timeouts a chance to run.
      @session.send [3], -> throw new Error 'Should not call unacknowledged send callback'

      req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=1&TYPE=xmlhttp&CI=0", (res) =>
        readLengthPrefixedJSON res, (data) =>
          assert.deepEqual data, [[2, [2]], [3, [3]]]

          # Ok, now we'll only acknowledge the second message by sending AID=2
          @post "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&AID=2", 'count=0', (res) =>
            res.socket.end()
            req.abort()

  # This tests for a regression - if the stop callback closed the connection, the server was crashing.
  test 'The send callback can stop the session', (done) -> @connect ->
    req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=1&TYPE=xmlhttp&CI=0", (res) =>
      # Acknowledge the stop message
      @post "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&AID=2", 'count=0', (res) =>
        res.socket.end()

    @session.stop =>
      @session.close()
      soon ->
        req.abort()
        done()

  # If there's a proxy in the way which chunks up responses before sending them on, the client adds a
  # &CI=1 argument on the backchannel. This causes the server to end the HTTP query after each message
  # is sent, so the data is sent to the session.
  test 'The backchannel is closed after each packet if chunking is turned off', (done) -> @connect ->
    testData = ['hello', 'there', null, 1000, {}, [], [555]]

    process.nextTick =>
      @session.send testData

      # Instead of the usual CI=0 we're passing CI=1 here.
      @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=1", (res) =>
        readLengthPrefixedJSON res, (data) =>
          assert.deepEqual data, [[1, testData]]

        res.on 'end', -> done()

  # Normally, the server doesn't close the connection after each backchannel message.
  test 'The backchannel is left open if CI=0', (done) -> @connect ->
    testData = ['hello', 'there', null, 1000, {}, [], [555]]

    process.nextTick =>
      @session.send testData

      req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=0", (res) =>
        readLengthPrefixedJSON res, (data) =>
          assert.deepEqual data, [[1, testData]]

        # After receiving the data, the client shouldn't close the connection. (At least, not unless
        # it times out naturally).
        res.on 'end', -> throw new Error 'connection should have stayed open'

        soon ->
          res.removeAllListeners 'end'
          req.abort()
          done()

  # On IE, the data is all loaded using iframes. The backchannel spits out data using inline scripts
  # in an HTML page.
  #
  # I've written this test separately from the tests above, but it would really make more sense
  # to rerun the same set of tests in both HTML and XHR modes to make sure the behaviour is correct
  # in both instances.
  test 'The server gives the client correctly formatted backchannel data if TYPE=html', (done) -> @connect ->
    testData = ['hello', 'there', null, 1000, {}, [], [555]]

    process.nextTick =>
      @session.send testData

      # The type is specified as an argument here in the query string. For this test, I'm making
      # CI=1, because the test is easier to write that way.
      #
      # In truth, I don't care about IE support as much as support for modern browsers. This might
      # be a mistake.. I'm not sure. IE9's XHR support should work just fine for browserchannel,
      # though google's BC client doesn't use it.
      @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=html&CI=1", (res) =>
        expect res,
          # Interestingly, google doesn't double-encode the string like this. Instead of turning
          # quotes `"` into escaped quotes `\"`, it uses unicode encoding to turn them into \42 and
          # stuff like that. I'm not sure why they do this - it produces the same effect in IE8.
          # I should test it in IE6 and see if there's any problems.
          """<html><body><script>try {parent.m(#{JSON.stringify JSON.stringify([[1, testData]]) + '\n'})} catch(e) {}</script>
#{ieJunk}<script>try  {parent.d(); }catch (e){}</script>\n""", =>
            # Because I'm lazy, I'm going to chain on a test to make sure CI=0 works as well.
            data2 = {other:'data'}
            @session.send data2
            # I'm setting AID=1 here to indicate that the client has seen array 1.
            req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=1&TYPE=html&CI=0", (res) =>
              expect res,
                """<html><body><script>try {parent.m(#{JSON.stringify JSON.stringify([[2, data2]]) + '\n'})} catch(e) {}</script>
#{ieJunk}""", =>
                  req.abort()
                  done()
  
  # If there's a basePrefix set, the returned HTML sets `document.domain = ` before sending messages.
  # I'm super lazy, and just copy+pasting from the test above. There's probably a way to factor these tests
  # nicely, but I'm not in the mood to figure it out at the moment.
  test 'The server sets the domain if we have a domain set', (done) -> @connect ->
    testData = ['hello', 'there', null, 1000, {}, [], [555]]

    process.nextTick =>
      @session.send testData
      # This time we're setting DOMAIN=X, and the response contains a document.domain= block. Woo.
      @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=html&CI=1&DOMAIN=foo.com", (res) =>
        expect res,
          """<html><body><script>try{document.domain=\"foo.com\";}catch(e){}</script>
<script>try {parent.m(#{JSON.stringify JSON.stringify([[1, testData]]) + '\n'})} catch(e) {}</script>
#{ieJunk}<script>try  {parent.d(); }catch (e){}</script>\n""", =>
            data2 = {other:'data'}
            @session.send data2
            req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=1&TYPE=html&CI=0&DOMAIN=foo.com", (res) =>
              expect res,
                # Its interesting - in the test channel, the ie junk comes right after the document.domain= line,
                # but in a backchannel like this it comes after. The behaviour here is the same in google's version.
                #
                # I'm not sure if its actually significant though.
                """<html><body><script>try{document.domain=\"foo.com\";}catch(e){}</script>
<script>try {parent.m(#{JSON.stringify JSON.stringify([[2, data2]]) + '\n'})} catch(e) {}</script>
#{ieJunk}""", =>
                  req.abort()
                  done()

  # If a client thinks their backchannel connection is closed, they might open a second backchannel connection.
  # In this case, the server should close the old one and resume sending stuff using the new connection.
  test 'The server closes old backchannel connections', (done) -> @connect ->
    testData = ['hello', 'there', null, 1000, {}, [], [555]]

    process.nextTick =>
      @session.send testData

      # As usual, we'll get the sent data through the backchannel connection. The connection is kept open...
      @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=0", (res) =>
        readLengthPrefixedJSON res, (data) =>
          # ... and the data has been read. Now we'll open another connection and check that the first connection
          # gets closed.

          req2 = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=1&TYPE=xmlhttp&CI=0", (res2) =>

          res.on 'end', ->
            req2.on 'error', ->
            req2.abort()
            done()

  # The client attaches a sequence number (*RID*) to every message, to make sure they don't end up out-of-order at
  # the server's end.
  #
  # We'll purposefully send some messages out of order and make sure they're held and passed through in order.
  #
  # Gogo gadget reimplementing TCP.
  test 'The server orders forwardchannel messages correctly using RIDs', (done) -> @connect ->
    # @connect sets RID=1000.

    # We'll send 2 maps, the first one will be {v:1} then {v:0}. They should be swapped around by the server.
    lastVal = 0

    @session.on 'map', (map) ->
      assert.strictEqual map.v, "#{lastVal++}", 'messages arent reordered in the server'
      done() if map.v == '2'
  
    # First, send `[{v:2}]`
    @post "/channel/bind?VER=8&RID=1002&SID=#{@session.id}&AID=0", 'count=1&ofs=2&req0_v=2', (res) =>
      res.socket.end()
    # ... then `[{v:0}, {v:1}]` a few MS later.
    soon =>
      @post "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&AID=0", 'count=2&ofs=0&req0_v=0&req1_v=1', (res) =>
        res.socket.end()
  
  # Again, think of browserchannel as TCP on top of UDP...
  test 'Repeated forward channel messages are discarded', (done) -> @connect ->
    gotMessage = false
    # The map must only be received once.
    @session.on 'map', (map) ->
      if gotMessage == false
        gotMessage = true
      else
        throw new Error 'got map twice'
  
    # POST the maps twice.
    @post "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&AID=0", 'count=1&ofs=0&req0_v=0', (res) => res.socket.end()
    @post "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&AID=0", 'count=1&ofs=0&req0_v=0', (res) => res.socket.end()

    # Wait 50 milliseconds for the map to (maybe!) be received twice, then pass.
    soon ->
      assert.strictEqual gotMessage, true
      done()

  # The client can retry failed forwardchannel requests with additional maps. We may have gotten the failed
  # request. An error could have occurred when we reply.
  test 'Repeat forward channel messages can contain extra maps', (done) -> @connect ->
    # We should get exactly 2 maps, {v:0} then {v:1}
    maps = []
    @session.on 'map', (map) ->
      maps.push map

    @post "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&AID=0", 'count=1&ofs=0&req0_v=0', (res) => res.socket.end()
    @post "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&AID=0", 'count=2&ofs=0&req0_v=0&req1_v=1', (res) =>
      res.socket.end()

    soon ->
      assert.deepEqual maps, [{v:0}, {v:1}]
      done()

  # With each request to the server, the client tells the server what array it saw last through the AID= parameter.
  #
  # If a client sends a subsequent backchannel request with an old AID= set, that means the client never saw the arrays
  # the server has previously sent. So, the server should resend them.
  test 'The server resends lost arrays if the client asks for them', (done) -> @connect ->
    process.nextTick =>
      @session.send [1,2,3]
      @session.send [4,5,6]

      @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=0", (res) =>
        readLengthPrefixedJSON res, (data) =>
          assert.deepEqual data, [[1, [1,2,3]], [2, [4,5,6]]]

          # We'll resend that request, pretending that the client never saw the second array sent (`[4,5,6]`)
          req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=1&TYPE=xmlhttp&CI=0", (res) =>
            readLengthPrefixedJSON res, (data) =>
              assert.deepEqual data, [[2, [4,5,6]]]
              # We don't need to abort the first connection because the server should close it.
              req.abort()
              done()

  # If you sleep your laptop or something, by the time you open it again the server could have timed out your session
  # so your session ID is invalid. This will also happen if the server gets restarted or something like that.
  #
  # The server should respond to any query requesting a nonexistant session ID with 400 and put 'Unknown SID'
  # somewhere in the message. (Actually, the BC client test is `indexOf('Unknown SID') > 0` so there has to be something
  # before that text in the message or indexOf will return 0.
  #
  # The google servers also set Unknown SID as the http status code, which is kinda neat. I can't check for that.
  suite 'If a client sends an invalid SID in a request, the server responds with 400 Unknown SID', ->
    testResponse = (done) -> (res) ->
      assert.strictEqual res.statusCode, 400
      buffer res, (data) ->
        assert.ok data.indexOf('Unknown SID') > 0
        done()

    test 'backChannel', (done) ->
      @get "/channel/bind?VER=8&RID=rpc&SID=madeup&AID=0&TYPE=xmlhttp&CI=0", testResponse(done)
    test 'forwardChannel', (done) ->
      @post "/channel/bind?VER=8&RID=1001&SID=junkyjunk&AID=0", 'count=0', testResponse(done)
    # When type=HTML, google's servers still send the same response back to the client. I'm not sure how it detects
    # the error, but it seems to work. So, I'll copy that behaviour.
    test 'backChannel with TYPE=html', (done) ->
      @get "/channel/bind?VER=8&RID=rpc&SID=madeup&AID=0&TYPE=html&CI=0", testResponse(done)

  # When a client connects, it can optionally specify its old session ID and array ID. This solves the old IRC
  # ghosting problem - if the old session hasn't timed out on the server yet, you can temporarily be in a state where
  # multiple connections represent the same user.
  test 'If a client disconnects then reconnects, specifying OSID= and OAID=, the old session is destroyed', (done) ->
    @post '/channel/bind?VER=8&RID=1000&t=1', 'count=0', (res) => res.socket.end()

    # I want to check the following things:
    #
    # - on 'close' is called on the first session
    # - onSession is called with the second session
    # - on 'close' is called before the second session is created
    #
    # Its kinda gross managing all that state in one function...
    @onSession = (session1) =>
      # As soon as the client has connected, we'll fire off a new connection claiming the previous session is old.
      @post "/channel/bind?VER=8&RID=2000&t=1&OSID=#{session1.id}&OAID=0", 'count=0', (res) => res.socket.end()

      c1Closed = false
      session1.on 'close', ->
        c1Closed = true

      # Once the first client has connected, I'm replacing @onSession so the second session's state can be handled
      # separately.
      @onSession = (session2) ->
        assert.ok c1Closed
        assert.strictEqual session1.state, 'closed'

        done()

  # The server might have already timed out an old connection. In this case, the OSID is ignored.
  test 'The server ignores OSID and OAID if the named session doesnt exist', (done) ->
    @post "/channel/bind?VER=8&RID=2000&t=1&OSID=doesnotexist&OAID=0", 'count=0', (res) => res.socket.end()

    # So small & pleasant!
    @onSession = (session) =>
      assert.ok session
      done()

  # OAID is set in the ghosted connection as a final attempt to flush arrays.
  test 'The server uses OAID to confirm arrays in the old session before closing it', (done) -> @connect ->
    # We'll follow the same pattern as the first callback test waay above. We'll send three messages, one
    # in the first callback and two after. We'll pretend that just the first two messages made it through.
    lastMessage = null

    # We'll create a new session in a moment when we POST with OSID and OAID.
    @onSession = ->

    @session.send 1, (error) ->
      assert.ifError error
      assert.strictEqual lastMessage, null
      lastMessage = 1

    # The final message callback should get called after the close event fires
    @session.on 'close', ->
      assert.strictEqual lastMessage, 2

    process.nextTick =>
      @session.send 2, (error) ->
        assert.ifError error
        assert.strictEqual lastMessage, 1
        lastMessage = 2

      @session.send 3, (error) ->
        assert.ok error
        assert.strictEqual lastMessage, 2
        lastMessage = 3
        assert.strictEqual error.message, 'Reconnected'

        soon ->
          req.abort()
          done()

      # And now we'll nuke the session and confirm the first two arrays. But first, its important
      # the client has a backchannel to send data to (confirming arrays before a backchannel is opened
      # to receive them is undefined and probably does something bad)
      req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=1&TYPE=xmlhttp&CI=0", (res) => res.socket.end()

      @post "/channel/bind?VER=8&RID=2000&t=1&OSID=#{@session.id}&OAID=2", 'count=0', (res) => res.socket.end()

  test 'The session times out after awhile if it doesnt have a backchannel', (done) -> @connect ->
    start = timer.Date.now()
    @session.on 'close', (reason) ->
      assert.strictEqual reason, 'Timed out'
      # It should take at least 30 seconds.
      assert.ok timer.Date.now() - start >= 30000
      done()

    timer.waitAll()

  test 'The session can be disconnected by firing a GET with TYPE=terminate', (done) -> @connect ->
    # The client doesn't seem to put AID= in here. I'm not sure why - could be a bug in the client.
    @get "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&TYPE=terminate", (res) ->
      # The response should be empty.
      buffer res, (data) -> assert.strictEqual data, ''

    @session.on 'close', (reason) ->
      # ... Its a manual disconnect. Is this reason string good enough?
      assert.strictEqual reason, 'Disconnected'
      done()

  test 'If a disconnect message reaches the client before some data, the data is still received', (done) -> @connect ->
    # The disconnect message is sent first, but its got a higher RID. It shouldn't be handled until
    # after the data.
    @get "/channel/bind?VER=8&RID=1003&SID=#{@session.id}&TYPE=terminate", (res) -> res.socket.end()
    soon =>
      @post "/channel/bind?VER=8&RID=1002&SID=#{@session.id}&AID=0", 'count=1&ofs=1&req0_m=2', (res) => res.socket.end()
      @post "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&AID=0", 'count=1&ofs=0&req0_m=1', (res) => res.socket.end()

    maps = []
    @session.on 'map', (data) ->
      maps.push data
    @session.on 'close', (reason) ->
      assert.strictEqual reason, 'Disconnected'
      assert.deepEqual maps, [{m:1}, {m:2}]
      done()

  # There's a slightly different codepath after a backchannel is opened then closed again. I want to make
  # sure it still works in this case.
  # 
  # Its surprising how often this test fails.
  test 'The session times out if its backchannel is closed', (done) -> @connect ->
    process.nextTick =>
      req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=0", (res) => res.socket.end()

      # I'll let the backchannel establish itself for a moment, and then nuke it.
      soon =>
        req.on 'error', ->
        req.abort()
        # It should take about 30 seconds from now to timeout the connection.
        start = timer.Date.now()
        @session.on 'close', (reason) ->
          assert.strictEqual reason, 'Timed out'
          assert.ok timer.Date.now() - start >= 30000
          done()

        # The timer sessionTimeout won't be queued up until after the abort() message makes it
        # to the server. I hate all these delays, but its not easy to write this test without them.
        soon -> timer.waitAll()

  # The server sends a little heartbeat across the backchannel every 20 seconds if there hasn't been
  # any chatter anyway. This keeps the machines en route from evicting the backchannel connection.
  # (noops are ignored by the client.)
  test 'A heartbeat is sent across the backchannel (by default) every 20 seconds', (done) -> @connect ->
    start = timer.Date.now()

    req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=0", (res) =>
      readLengthPrefixedJSON res, (msg) ->
        # this really just tests that one heartbeat is sent.
        assert.deepEqual msg, [[1, ['noop']]]
        assert.ok timer.Date.now() - start >= 20000
        req.abort()
        done()

    # Once again, we can't call waitAll() until the request has hit the server.
    soon -> timer.waitAll()

  # So long as the backchannel stays open, the server should just keep sending heartbeats and
  # the session doesn't timeout.
  test 'A server with an active backchannel doesnt timeout', (done) -> @connect ->
    aid = 1
    req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=0", (res) =>
      getNextNoop = ->
        readLengthPrefixedJSON res, (msg) ->
          assert.deepEqual msg, [[aid++, ['noop']]]
          getNextNoop()
      
      getNextNoop()

    # ... give the backchannel time to get established
    soon ->
      # wait 500 seconds. In that time, we'll get 25 noops.
      timer.wait 500 * 1000, ->
        # and then give the last noop a chance to get sent
        soon ->
          assert.strictEqual aid, 26
          req.abort()
          done()

    #req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=0", (res) =>

  # The send callback should be called _no matter what_. That means if a connection times out, it should
  # still be called, but we'll pass an error into the callback.
  suite 'The server calls send callbacks with an error', ->
    test 'when the session times out', (done) -> @connect ->
      # It seems like this message shouldn't give an error, but it does because the client never confirms that
      # its received it.
      sendCallbackCalled = no
      @session.send 'hello there', (error) ->
        assert.ok error
        assert.strictEqual error.message, 'Timed out'
        sendCallbackCalled = yes

      process.nextTick =>
        @session.send 'Another message', (error) ->
          assert.ok error
          assert.strictEqual error.message, 'Timed out'
          assert.ok sendCallbackCalled
          done()

        timer.waitAll()

    test 'when the session is ghosted', (done) -> @connect ->
      # As soon as the client has connected, we'll fire off a new connection claiming the previous session is old.
      @post "/channel/bind?VER=8&RID=2000&t=1&OSID=#{@session.id}&OAID=0", 'count=0', (res) => res.socket.end()

      sendCallbackCalled = no
      @session.send 'hello there', (error) ->
        assert.ok error
        assert.strictEqual error.message, 'Reconnected'
        sendCallbackCalled = yes

      process.nextTick =>
        @session.send 'hi', (error) ->
          assert.ok error
          assert.strictEqual error.message, 'Reconnected'
          assert.ok sendCallbackCalled
          done()

      # Ignore the subsequent connection attempt
      @onSession = ->

    # The server can also abandon a connection by calling .abort(). Again, this should trigger error callbacks.
    test 'when the session is closed by the server', (done) -> @connect ->

      sendCallbackCalled = no
      @session.send 'hello there', (error) ->
        assert.ok error
        assert.strictEqual error.message, 'foo'
        sendCallbackCalled = yes

      process.nextTick =>
        @session.send 'hi', (error) ->
          assert.ok error
          assert.strictEqual error.message, 'foo'
          assert.ok sendCallbackCalled
          done()

        @session.close 'foo'

    # Finally, the server closes a connection when the client actively closes it (by firing a GET with TYPE=terminate)
    test 'when the server gets a disconnect request', (done) -> @connect ->
      sendCallbackCalled = no
      @session.send 'hello there', (error) ->
        assert.ok error
        assert.strictEqual error.message, 'Disconnected'
        sendCallbackCalled = yes

      process.nextTick =>
        @session.send 'hi', (error) ->
          assert.ok error
          assert.strictEqual error.message, 'Disconnected'
          assert.ok sendCallbackCalled
          done()

      @get "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&TYPE=terminate", (res) -> res.socket.end()

  test 'If a session has close() called with no arguments, the send error message says "closed"', (done) -> @connect ->
    @session.send 'hello there', (error) ->
      assert.ok error
      assert.strictEqual error.message, 'closed'
      done()

    @session.close()

  # stop() sends a message to the client saying basically 'something is wrong, stop trying to
  # connect'. It triggers a special error in the client, and the client will stop trying to reconnect
  # at this point.
  #
  # The server can still send and receive messages after the stop message has been sent. But the client
  # probably won't receive them.
  #
  # Stop takes a callback which is called when the stop message has been **sent**. (The client never confirms
  # that it has received the message).
  suite 'Calling stop() sends the stop command to the client', ->
    test 'during init', (done) ->
      @post '/channel/bind?VER=8&RID=1000&t=1', 'count=0', (res) =>
        readLengthPrefixedJSON res, (data) =>
          assert.deepEqual data, [[0, ['c', @session.id, null, 8]], [1, ['stop']]]
          done()

      @onSession = (@session) =>
        @session.stop()

    test 'after init', (done) -> @connect ->
      # This test is similar to the test above, but I've put .stop() in a setTimeout.
      req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=0", (res) =>
        readLengthPrefixedJSON res, (data) ->
          assert.deepEqual data, [[1, ['stop']]]
          req.abort()
          done()

      soon => @session.stop()

  suite 'A callback passed to stop is called once stop is sent to the client', ->
    # ... because the stop message will be sent to the client in the initial connection
    test 'during init', (done) -> @connect ->
      @session.stop ->
        done()

    test 'after init', (done) -> @connect ->
      process.nextTick =>
        stopCallbackCalled = no
        req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=0", (res) =>
          readLengthPrefixedJSON res, (data) ->
            assert.deepEqual data, [[1, ['stop']]]
            assert stopCallbackCalled
            req.abort()
            res.socket.end()
            done()

        @session.stop ->
          # Just a noop test to increase the 'things tested' count
          stopCallbackCalled = yes

  # close() aborts the session immediately. After calling close, subsequent requests to the session
  # should fail with unknown SID errors.
  suite 'session.close() closes the session', ->
    test 'during init', (done) -> @connect ->
      @session.close()
      @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=0", (res) =>
        assert.strictEqual res.statusCode, 400
        res.socket.end()
        done()

    test 'after init', (done) -> @connect ->
      process.nextTick =>
        @session.close()

      @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=0", (res) =>
        assert.strictEqual res.statusCode, 400
        res.socket.end()
        done()

  # If you close immediately, the initial POST gets a 403 response (its probably an auth problem?)
  test 'An immediate session.close() results in the initial connection getting a 403 response', (done) ->
    @onSession = (@session) =>
      @session.close()

    @post '/channel/bind?VER=8&RID=1000&t=1', 'count=0', (res) ->
      buffer res, (data) ->
        assert.strictEqual res.statusCode, 403
        res.socket.end()
        done()

  # The session runs as a little state machine. It starts in the 'init' state, then moves to
  # 'ok' when the session is established. When the connection is closed, it moves to 'closed' state
  # and stays there forever.
  suite 'The session emits a "state changed" event when you close it', ->
    test 'immediately', (done) -> @connect ->
      # Because we're calling close() immediately, the session should never make it to the 'ok' state
      # before moving to 'closed'.
      @session.on 'state changed', (nstate, ostate) =>
        assert.strictEqual nstate, 'closed'
        assert.strictEqual ostate, 'init'
        assert.strictEqual @session.state, 'closed'
        done()

      @session.close()

    test 'after it has opened', (done) -> @connect ->
      # This time we'll let the state change to 'ok' before closing the connection.
      @session.on 'state changed', (nstate, ostate) =>
        if nstate is 'ok'
          @session.close()
        else
          assert.strictEqual nstate, 'closed'
          assert.strictEqual ostate, 'ok'
          assert.strictEqual @session.state, 'closed'
          done()

  # close() also kills any active backchannel connection.
  test 'close kills the active backchannel', (done) -> @connect ->
    @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=0", (res) =>
      res.socket.end()
      done()

    # Give it some time for the backchannel to establish itself
    soon => @session.close()
  
  # # node-browserchannel extensions
  #
  # browserchannel by default only supports sending string->string maps from the client to server. This
  # is really awful - I mean, maybe this is useful for some apps, but really you just want to send & receive
  # JSON.
  #
  # To make everything nicer, I have two changes to browserchannel:
  #
  # - If a map is `{JSON:"<JSON STRING>"}`, the server will automatically parse the JSON string and
  #   emit 'message', object. In this case, the server *also* emits the data as a map.
  # - The client can POST the forwardchannel data using a JSON blob. The message looks like this:
  #
  #     {ofs: 10, data:[null, {...}, 1000.4, 'hi', ....]}
  #
  #   In this case, the server *does not* emit a map, but merely emits the json object using emit 'message'.
  #
  #   To advertise this service, during the first test, the server sends X-Accept: application/json; ...
  test 'The server decodes JSON data in a map if it has a JSON key', (done) -> @connect ->
    data1 = [{}, {'x':null}, 'hi', '!@#$%^&*()-=', '\'"']
    data2 = "hello dear user"
    qs = querystring.stringify count: 2, ofs: 0, req0_JSON: (JSON.stringify data1), req1_JSON: (JSON.stringify data2)
    # I can guarantee qs is awful.
    @post "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&AID=0", qs, (res) => res.socket.end()

    @session.once 'message', (msg) =>
      assert.deepEqual msg, data1

      @session.once 'message', (msg) ->
        assert.deepEqual msg, data2
        done()

  # The server might be JSON decoding the data, but it still needs to emit it as a map.
  test 'The server emits JSON data in a map, as a map as well', (done) -> @connect ->
    data1 = [{}, {'x':null}, 'hi', '!@#$%^&*()-=', '\'"']
    data2 = "hello dear user"
    qs = querystring.stringify count: 2, ofs: 0, req0_JSON: (JSON.stringify data1), req1_JSON: (JSON.stringify data2)
    @post "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&AID=0", qs, (res) => res.socket.end()

    # I would prefer to have more tests mixing maps and JSON data. I'm better off testing that
    # thoroughly using a randomized tester.
    @session.once 'map', (map) =>
      assert.deepEqual map, JSON: JSON.stringify data1

      @session.once 'map', (map) ->
        assert.deepEqual map, JSON: JSON.stringify data2
        done()

  # The server also accepts raw JSON.
  test 'The server accepts JSON data', (done) -> @connect ->
    # The POST request has to specify Content-Type=application/json so we can't just use
    # the @post request. (Big tears!)
    options =
      method: 'POST'
      path: "/channel/bind?VER=8&RID=1001&SID=#{@session.id}&AID=0"
      host: 'localhost'
      port: @port
      headers:
        'Content-Type': 'application/json'

    # This time I'm going to send the elements of the test object as separate messages.
    data = [{}, {'x':null}, 'hi', '!@#$%^&*()-=', '\'"']

    req = http.request options, (res) ->
      readLengthPrefixedJSON res, (resData) ->
        # We won't get this response until all the messages have been processed.
        assert.deepEqual resData, [0, 0, 0]
        assert.deepEqual data, []
        assert data.length is 0

        res.on 'end', -> done()

    req.end (JSON.stringify {ofs:0, data})
  
    @session.on 'message', (msg) ->
      assert.deepEqual msg, data.shift()

  # Hm- this test works, but the client code never recieves the null message. Eh.
  test 'You can send null', (done) -> @connect ->
    @session.send null

    req = @get "/channel/bind?VER=8&RID=rpc&SID=#{@session.id}&AID=0&TYPE=xmlhttp&CI=0", (res) =>
      readLengthPrefixedJSON res, (data) ->
        assert.deepEqual data, [[1, null]]

        req.abort()
        res.socket.end()
        done()

  test 'Sessions are cancelled when close() is called on the server', (done) -> @connect ->
    @session.on 'close', done
    @bc.close()

  #'print', (done) -> @connect -> console.warn @session; done()

  # I should also test that you can mix a bunch of JSON requests and map requests, out of order, and the
  # server sorts it all out.
