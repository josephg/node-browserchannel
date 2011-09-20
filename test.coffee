
connect = require 'connect'
browserchannel = require('./lib').server

server = connect(
	connect.favicon()
	connect.static "#{__dirname}/public"
	connect.logger()
	browserchannel (client) ->
		console.log 'Client connected'

		if client.address != '127.0.0.1' or client.appVersion == '10'
			client.stop()

		client.on 'map', (data) ->
			console.log data
		
		client.send ['hi']

		client.on 'reconnected', (oldSessionId) ->
			console.log 'client reconnected'
		
		client.on 'destroyed', ->
			# Clean up
			console.log 'client destroyed'
).listen 4321
console.log 'Running on localhost:4321'
