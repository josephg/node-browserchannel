
connect = require 'connect'
browserchannel = require('./lib').server

server = connect(
	connect.favicon()
	connect.static "#{__dirname}/public"
	connect.logger()
	browserchannel()
).listen 4321
console.log 'Running on localhost:4321'
