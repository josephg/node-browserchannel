# This is a browserchannel server.
#
# - It doesn't work yet.
# - It is missing tests
#
# The server is implemented as connect middleware.

# `parse` helps us decode URLs in requests
{parse} = require 'url'

# `randomInt(k)` generates and returns a random int smaller than *n* (0 <= k < n)
randomInt = (n) -> Math.floor(Math.random() * n)

# `randomArrayElement(array)` Selects and returns a random element from *array*
randomArrayElement = (array) -> array[randomInt(array.length)]

# The module is configurable
defaultOptions =
	# An optional array of host prefixes. Each browserchannel client will randomly pick
	# from the list of host prefixes when it connects. This reduces the impact of per-host
	# connection limits.
	#
	# All host prefixes should point to the same server. Ie, if your server's hostname
	# is *example.com* and your hostPrefixes contains ['a', 'b', 'c'],
	# a.example.com, b.example.com and c.example.com should all point to the same host
	# as example.com.
	hostPrefixes: null

	# You can specify the base URL which browserchannel connects to. Change this if you want
	# to scope browserchannel in part of your app, or if you want /channel to mean something
	# else, or whatever.
	base: '/channel'

# The server module returns a function, which you can call with your configuration
# options. It returns your configured connect middleware, which is actually another function.
module.exports = (options, onConnect) ->
	if typeof client == 'undefined'
		client = options
		options = {}

	options ||= {}
	options[option] ||= value for option, value of defaultOptions

	# Strip off a trailing slash in base.
	base = options.base
	base = base[... base.length - 1] if base.match /\/$/

	clients = {}

	# This is the returned middleware. Connect middleware is a function which
	# takes in an http request, an http response and a next method.
	#
	# The middleware can do one of two things:
	#
	# - Handle the request, sending data back to the server via the response
	# - Call `next()`, which allows the next middleware in the stack a chance to
	#   handle the request.
	(req, res, next) ->
		query = parse req.url, true
		return next() if query.pathname.substring(0, base.length) != base

		# This server only supports browserchannel protocol version 8.
		if query.query['VER'] != '8'
			# I'm not sure which HTTP error code to send.
			res.writeHead

		# All responses have a standard set of HTTP headers.
		# To be honest, I don't know how many of these are necessary. I just copied
		# them from google.
		standardHeaders =
			'Content-Type': 'text/plain'
			'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate'
			'Pragma': 'no-cache'
			'X-Content-Type-Options': 'nosniff'
			'Expires': 'Fri, 01 Jan 1990 00:00:00 GMT'

		if query.pathname == "#{base}/test"
			if query.query['MODE'] == 'init' and req.method == 'GET'
				#### Connection test - phase 1
				# The client is requesting host prefixes. The server responds with an array of
				# ['hostprefix' or null, 'blockedprefix' or null].
				#
				# - **hostprefix** is subdomain prepended onto the hostname of each request.
				# This gets around browser connection limits. Using this requires a bank of
				# configured DNS entries and SSL certificates if you're using HTTPS.
				#
				# - **blockedprefix** provides network admins a way to blacklist browserchannel requests.
				# It is not supported by node-browserchannel.
				#
				# This request is **stateless**.
				hostPrefix = if options.hostPrefixes
					randomArrayElement options.hostPrefixes
				else
					null

				blockedPrefix = null # Blocked prefixes aren't supported by this module

				res.writeHead 200, 'Content-Type': 'application/json'
				res.end(JSON.stringify [hostPrefix, blockedPrefix])

			else if query.query['TYPE'] in ['html', 'xmlhttp']
				#### Connection test - phase 2
				# The client is trying to determine if their connection is buffered or unbuffered.
				# We reply with '11111', then 2 seconds later '2'.
				#
				# The client should get the data in 2 chunks - but they won't if there's a misbehaving
				# corporate proxy in the way or something.
				res.writeHead 200, standardHeaders
				res.write '11111'
				setTimeout (-> res.end '2'), 2000

			else
				res.writeHead 400, standardHeaders
				res.end "Bad request"

		else if query.pathname == "#{base}/bind"
			# This is a channel request.
			console.log query

		else
			# We'll 404 the user instead of letting another handler take care of it.
			# Users shouldn't be using the specified URL prefix for anything else.
			res.writeHead 404, standardHeaders
			res.end "Not found"

