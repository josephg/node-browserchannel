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
		@server = connect browserChannel (client) => @onClient(client)
		@server.listen =>
			# Calling server.listen() without a port lets the OS pick a port for us. I don't
			# know why more testing frameworks don't do this by default.
			#
			# Obviously, we need to know the port to be able to make requests from the server.
			@port = @server.address().port
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
	
	'foo': (test) ->
		test.done()

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
