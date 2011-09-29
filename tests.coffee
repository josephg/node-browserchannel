# # Unit tests for BrowserChannel server
#
# This contains all the unit tests to make sure the server works like it should.
#
# This is designed to be run using nodeunit. To run the tests, install nodeunit:
#
#     npm install -g nodeunit
#
# then run the tests with:
#
#     nodeunit tests.coffee
#
# I was thinking of using expresso for this, but I'd be starting up a server for
# every test, and starting the servers in parallel means I might run into the
# default open file limit (256 on macos) with all my tests. Its a shame too, because
# nodeunit annoys me sometimes :)
#
# It might be worth pulling in a higher level HTTP request library from somewhere.
# interacting with HTTP using nodejs's http library is a bit lower level than I'd
# like.
#
# For now I'm not going to add in any SSL testing code. I should probably generate
# a self-signed key pair, start the server using https and make sure that I can
# still use it.

{testCase} = require 'nodeunit'
connect = require 'connect'
browserChannel = require('./lib').server

http = require 'http'
{parse} = require 'url'
assert = require 'assert'
querystring = require 'querystring'

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

# Most of these tests will make HTTP requests. A lot of the time, we don't care about the
# timing of the response, we just want to know what it was. This method will buffer the
# response data from an http response object and when the whole response has been received,
# send it on.
buffer = (res, callback) ->
	data = []
	res.on 'data', (chunk) ->
		data.push chunk.toString 'utf8'
	res.on 'end', -> callback data.join ''

# Most tests will just use the default configuration of browserchannel, but obviously
# some tests will need to customise the options. To customise the options we'll need
# to create a new server object.
#
# So, the code to create servers has been pulled out here for use in tests.
createServer = (opts, method, callback) ->
	# Its possible to use the browserChannel middleware without specifying an options
	# object. This little createServer function will mirror that behaviour.
	if typeof opts == 'function'
		callback = method
		method = opts
		# I want to match up with how its actually going to be used.
		bc = browserChannel method
	else
		bc = browserChannel opts, method
	
	# The server is created using connect middleware. I'll simulate other middleware in
	# the stack by adding a second handler which responds with 200, 'Other middleware' to
	# any request.
	server = connect bc, (req, res, next) ->
		# I might not actually need to specify the headers here... (If you don't, nodejs provides
		# some defaults).
		res.writeHead 200, 'OK', 'Content-Type': 'text/plain'
		res.end 'Other middleware'

	# Calling server.listen() without a port lets the OS pick a port for us. I don't
	# know why more testing frameworks don't do this by default.
	server.listen ->
		# Obviously, we need to know the port to be able to make requests from the server.
		# The callee could check this itself using the server object, but it'll always need
		# to know it, so its easier pulling the port out here.
		port = server.address().port
		callback server, port

module.exports = testCase
	# #### setUp
	#
	# Before each test has run, we'll start a new server. The server will only live
	# for that test and then it'll be torn down again.
	#
	# This makes the tests run more slowly, but not slowly enough that I care.
	setUp: (callback) ->
		# When you instantiate browserchannel, you specify a function which gets called
		# with each client that connects. I'll proxy that function call to a local function
		# which tests can override.
		@onClient = (client) ->
		# The proxy is inline here. Also, I <3 coffeescript's (@server, @port) -> syntax here.
		# That will automatically set this.server and this.port to the callback arguments.
		# 
		# Actually calling the callback starts the test.
		createServer null, ((client) => @onClient client), (@server, @port) =>
			callback()

	tearDown: (callback) ->
		# #### tearDown
		#
		# This is called after each tests is done. We'll tear down the server we just created.
		#
		# The next test is run once the callback is called. I could probably chain the next
		# test without waiting for close(), but then its possible that an exception thrown
		# in one test will appear after the next test has started running. Its easier to debug
		# like this.
		@server.on 'close', callback
		@server.close()
	
	# # Testing channel tests
	#
	# ### Server options
	#
	# The first thing a client does when it connects is issue a GET on /test/?mode=INIT.
	# The server responds with an array of [basePrefix or null,blockedPrefix or null]. Blocked
	# prefix isn't supported by node-browerchannel and by default no basePrefix is set. So with no
	# options specified, this GET should return [null,null].
	'GET /test/?mode=INIT with no baseprefix set returns [null, null]': (test) ->
		http.get {path:'/channel/test?VER=8&MODE=init', host: 'localhost', port: @port}, (response) ->
			test.strictEqual response.statusCode, 200
			buffer response, (data) ->
				test.strictEqual data, '[null,null]'
				test.done()

	# If a basePrefix is set in the options, make sure the server returns it.
	'GET /test/?mode=INIT with a basePrefix set returns [basePrefix, null]': (test) ->
		# You can specify a bunch of host prefixes. If you do, the server will randomly pick between them.
		# I don't know if thats actually useful behaviour, but *shrug*
		# I should probably write a test to make sure all host prefixes will be chosen from time to time.
		createServer hostPrefixes:['chan'], (->), (server, port) ->
			http.get {path:'/channel/test?VER=8&MODE=init', host: 'localhost', port: port}, (response) ->
				test.strictEqual response.statusCode, 200
				buffer response, (data) ->
					test.strictEqual data, '["chan",null]'
					# I'm being slack here - the server might not close immediately. I could make test.done()
					# dependant on it, but I can't be bothered.
					server.close()
					test.done()
	
	# node-browserchannel is only compatible with browserchannel client v8. I don't know whats changed
	# since old versions (maybe v6 would be easy to support) but I don't care. If the client specifies
	# an old version, we'll die with an error.
	'GET /test/?mode=INIT without VER=8 returns an error': (test) ->
		http.get {path:'/channel/test?VER=7&MODE=init', host: 'localhost', port: @port}, (response) ->
			test.strictEqual response.statusCode, 400
			test.done()
	
	# I'm not really sure what should happen if the version isn't specified at all. Its not really important
	# I guess... the server could either ditch the client, or it could just assume the most recent version.
	# I'm not sure what google's implementation does.

	# Setting a custom url endpoint to bind node-browserchannel to should make it respond at that url endpoint
	# only.
	'The test channel responds at a bound custom endpoint': (test) ->
		createServer base:'/foozit', (->), (server, port) ->
			http.get {path:'/foozit/test?VER=8&MODE=init', host: 'localhost', port: port}, (response) ->
				test.strictEqual response.statusCode, 200
				buffer response, (data) ->
					test.strictEqual data, '[null,null]'
					server.close()
					test.done()
	
	# Some people will miss out on the leading slash in the URL when they bind browserchannel to a custom
	# url. That should work too.
	'binding the server to a custom url without a leading slash works': (test) ->
		createServer base:'foozit', (->), (server, port) ->
			http.get {path:'/foozit/test?VER=8&MODE=init', host: 'localhost', port: port}, (response) ->
				test.strictEqual response.statusCode, 200
				buffer response, (data) ->
					test.strictEqual data, '[null,null]'
					server.close()
					test.done()
	
	# Its tempting to think that you need a trailing slash on your URL prefix as well. You don't, but that should
	# work too.
	'binding the server to a custom url with a trailing slash works': (test) ->
		# Some day, the copy+paste police are gonna get me. I don't feel so bad doing it for tests though, because
		# it helps readability.
		createServer base:'foozit/', (->), (server, port) ->
			http.get {path:'/foozit/test?VER=8&MODE=init', host: 'localhost', port: port}, (response) ->
				test.strictEqual response.statusCode, 200
				buffer response, (data) ->
					test.strictEqual data, '[null,null]'
					server.close()
					test.done()
	
	# node-browserchannel is only responsible for URLs with the specified (or default) prefix. If a request
	# comes in for a URL outside of that path, it should be passed along to subsequent connect middleware.
	#
	# I've set up the createServer() method above to send 'Other middleware' if browserchannel passes
	# the response on to the next handler.
	'getting a url outside of the bound range gets passed to other middleware': (test) ->
		http.get {path:'/otherapp', host: 'localhost', port: @port}, (response) ->
			test.strictEqual response.statusCode, 200
			buffer response, (data) ->
				test.strictEqual data, 'Other middleware'
				test.done()
	
	# I decided to make URLs inside the bound range return 404s directly. I can't guarantee that no future
	# version of node-browserchannel won't add more URLs in the zone, so its important that users don't decide
	# to start using arbitrary other URLs under channel/.
	#
	# That design decision makes it impossible to add a custom 404 page to /channel/FOO, but I don't think thats a
	# big deal.
	'getting a wacky url inside the bound range returns 404': (test) ->
		http.get {path:'/channel/doesnotexist', host: 'localhost', port: @port}, (response) ->
			test.strictEqual response.statusCode, 404
			test.done()

	
		
	# # Tests to write
	#
	# I need to write the following tests:
	#
	# ## Channel testing
	#
	# There are two testing APIs that node-browserchannel supports
	#
	# - `test/?MODE=init`
	#   This gets a server's subdomains
	#
	# - `test/?MODE=`
	# eg test?VER=8&TYPE=html&zx=558cz3evkwuu&t=1
		# - 

#server = connect browserChannel (client) ->
#	if client.address != '127.0.0.1' or client.appVersion != '10'
#		client.stop()
#
#	client.on 'map', (data) ->
#		console.log data
#	
#	client.send ['hi']
#
#	setInterval (-> client.send ['yo dawg']), 3000
#
#	client.on 'reconnected', (oldSessionId) ->
#	
#	client.on 'destroyed', ->
		# Clean up
#server.listen(4321)

# # Tests
#
# The browserchannel service exposes 2 API endpoints
#
# ## Test Service
#	
