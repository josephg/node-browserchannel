# # Unit tests for BrowserChannel client
#
# The browserchannel client is currently implemented using a shim over the closure
# browserchannel library.

{testCase} = require 'nodeunit'
{server, client} = require('..')

assert = require 'assert'
{createServer} = require './helpers'

#timer = require 'timerstub'
#browserChannel._setTimerMethods timer

module.exports = testCase
	setUp: (callback) ->
		@onSession = (session) ->
		createServer ((session) => @onSession session), (@server, @port) =>
			callback()

	tearDown: (callback) ->
		@server.on 'close', callback
		@server.close()
	
	'foo': (test) -> test.done()
