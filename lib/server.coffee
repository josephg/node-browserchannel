# This is a browserchannel server.
#
# - It doesn't work yet.
# - It is missing tests
#
# The server is implemented as connect middleware.

# `parse` helps us decode URLs in requests
{parse} = require 'url'
{EventEmitter} = require 'events'
querystring = require 'querystring'
hat = require('hat').rack(40, 36)

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

# All server responses set some standard HTTP headers.
# To be honest, I don't know how many of these are necessary. I just copied
# them from google.
#
# The nocache headers in particular seem unnecessary since each client
# request includes a randomized `zx=junk` query parameter.
standardHeaders =
	'Content-Type': 'text/plain'
	'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate'
	'Pragma': 'no-cache'
	'Expires': 'Fri, 01 Jan 1990 00:00:00 GMT'
	'X-Content-Type-Options': 'nosniff'

# Google's browserchannel server adds some junk after the first message data is sent. I
# assume this stops some whole-page buffering in IE. I assume the data used is noise so it
# doesn't compress.
#
# I don't really know why google does this. I'm assuming there's a good reason to it though.
ieJunk = """7cca69475363026330a0d99468e88d23ce95e222591126443015f5f462d9a177186c8701fb45a6ffe
e0daf1a178fc0f58cd309308fba7e6f011ac38c9cdd4580760f1d4560a84d5ca0355ecbbed2ab715a3350fe0c4790
50640bd0e77acec90c58c4d3dd0f5cf8d4510e68c8b12e087bd88cad349aafd2ab16b07b0b1b8276091217a44a9fe
92fedacffff48092ee693af\n"""

# If the user is using IE, instead of using XHR the content is instead loaded into
# a forever iframe. When data is sent, it is wrapped in <script></script> tags
# which call functions in the browserchannel library.
#
# This method wraps the normal `.writeHead()`, `.write()` and `.end()` methods by
# special versions which produce output based on the request's type.
messagingMethods = (type, res) ->
	if type == 'html'
		junkSent = false

		writeHead: ->
			res.writeHead 200, standardHeaders
			res.write '<html><body>'

			domain = query['DOMAIN']
			# If the iframe is making the request using a secondary domain, I think we need
			# to set the domain to the original domain so that we can call the response methods.
			if domain
				# Make sure the domain doesn't contain anything by naughty by `JSON.stringify()`-ing
				# it before passing it to the client. There are XSS vulnerabilities otherwise.
				domain = JSON.stringify domain
				res.write "<script>try{document.domain=#{domain};}catch(e){}</script>\n"
	
		write: (data) ->
			# The data is passed to `m()`, which is bound to *onTridentRpcMessage_* in the client.
			res.write "<script>try {parent.m(\"#{data}\")} catch(e){}</script>\n"
			unless junkSent
				res.write ieJunk
				junkSent = true

		end: (data) ->
			write data if data

			# Once the data has been received, the client needs to call `d()`, which is bound to
			# *onTridentDone_* with success=*true*.
			res.end "<script>try {parent.d()} catch(e){}</script>\n"

		# This is a helper method for signalling an error in the request back to the client.
		signalError: ->
			# The HTML (iframe) handler has no way to discover that the embedded script tag
			# didn't complete successfully. To signal errors, we return **200 OK** and call an
			# exposed rpcClose() method on the page.
			writeHead()
			res.end "<script>try {parent.m(\"#{data}\")} catch(e){}</script>\n"

	else
		# For XHR requests, we just send data normally.
		writeHead: -> res.writeHead 200, standardHeaders
		write: (data) -> res.write data
		end: (data) -> res.end data
		signalError: (statusCode, message) ->
			res.writeHead statusCode, standardHeaders
			res.end message

# Forward connections POST data to the server using a series of url-encoded maps.
# This method buffers the POST data from a request and decodes it into a JS object.
bufferPostData = (req, callback) ->
	data = []
	req.on 'data', (chunk) ->
		data.push chunk.toString 'utf8'
	req.on 'end', ->
		data = data.join ''
		callback querystring.parse data

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

	# Get or create a client session based on client's `sessionId`. If the client is
	# connecting for the first time, the sessionId is *undefined*. If a client is
	# reconnecting an old connection, they set sessionId *null* and provide their previous
	# sessionId and arrayId.
	#
	# Session ids are generated by [node-hat]. They are guaranteed to be unique.
	# [node-hat]: https://github.com/substack/node-hat
	#
	# This method is synchronous, because a database will never be involved in browserchannel
	# session management. Browserchannel sessions only last as long as the user's browser
	# is open. If there's any connection turbulence, the client will reconnect and get
	# a new session id.
	#
	# There are a bunch of different (interesting!) cases this function must handle:
	#
	# - **The sessionId is provided**
	#   - If there is a session with that id, return it
	#   - If there is no session id with that id, close the client's connection to force
	#     them to try to reconnect. This could happen if the server is restarted and the
	#     client doesn't notice.
	#
	# - **The sessionId is undefined**. This means a client is either connecting for
	#   the first time or trying to reconnect an old session.
	#   - If an old session id is *not* provided, we'll create and return a new client
	#   - If an old session id is provided but we have no client with that id, we'll
	#     create a new session for the client. (*Does the server tell the client that
	#     the session is new somehow?*)
	#   - If an old session id is provided and we have a client with that id, we'll
	#     rename the client and return it.
	createClient = (req, oldSessionId, oldArrayId) ->
		if oldSessionId?
			throw new Error 'Not implemented'

		# Create a new client
		client = new EventEmitter
		client.id = hat()
		client.state = 'init'
		client.changeState = (newState) ->
			# I actually have no idea what this API should look like.
			@emit 'change state', newState, @state
			@emit newState
		client.address = req.connection.remoteAddress

		clients[client.id] = client

		console.log "Created a new client #{client.id} from #{client.address}"

		client

	# ????
	getClient = (sessionId) ->
		clients[sessionId] # Return undefined if there is no session id.

	# This is the returned middleware. Connect middleware is a function which
	# takes in an http request, an http response and a next method.
	#
	# The middleware can do one of two things:
	#
	# - Handle the request, sending data back to the server via the response
	# - Call `next()`, which allows the next middleware in the stack a chance to
	#   handle the request.
	(req, res, next) ->
		{query, pathname} = parse req.url, true
		return next() if pathname.substring(0, base.length) != base

		{writeHead, write, end, signalError} = messagingMethods query['TYPE'], res

		# This server only supports browserchannel protocol version **8**.
		if query['VER'] != '8'
			signalError 400, 'Only browserchannel version 8 is supported' # Is 400 appropriate here?
			return

		# # Connection testing
		#
		# Before the browserchannel client connects, it tests the connection to make
		# sure its working, and to look for buffering proxies.
		#
		# The server-side code for connection testing is completely stateless.
		if pathname == "#{base}/test"
			#### Phase 1: Server info
			# The client is requests host prefixes. The server responds with an array of
			# ['hostprefix' or null, 'blockedprefix' or null].
			#
			# - **hostprefix** is subdomain prepended onto the hostname of each request.
			# This gets around browser connection limits. Using this requires a bank of
			# configured DNS entries and SSL certificates if you're using HTTPS.
			#
			# - **blockedprefix** provides network admins a way to blacklist browserchannel requests.
			# It is not supported by node-browserchannel.
			if query['MODE'] == 'init' and req.method == 'GET'
				hostPrefix = if options.hostPrefixes
					randomArrayElement options.hostPrefixes
				else
					null

				blockedPrefix = null # Blocked prefixes aren't supported.

				# This is a straight-up normal HTTP request like the forward channel requests.
				# We don't use the funny iframe write methods.
				res.writeHead 200, standardHeaders
				res.end(JSON.stringify [hostPrefix, blockedPrefix])

			else
				#### Phase 2: Buffering proxy detection
				# The client is trying to determine if their connection is buffered or unbuffered.
				# We reply with '11111', then 2 seconds later '2'.
				#
				# The client should get the data in 2 chunks - but they won't if there's a misbehaving
				# corporate proxy in the way or something.
				writeHead()
				write '11111'
				setTimeout (-> end '2'), 2000

		# # BrowserChannel connection
		#
		# Once a client has finished testing its connection, it connects.
		#
		# BrowserChannel communicates through two connections:
		#
		# - The **forward channel** is used for the client to send data to the server.
		#   It uses a **POST** request for each message.
		# - The **back channel** is used to get data back from the server. This uses a
		#   hanging **GET** request. If chunking is disallowed (ie, if the proxy buffers)
		#   then the back channel is closed after each server message.
		else if pathname == "#{base}/bind"
			#### Forward Channel
			if req.method == 'POST'
				# The client sends data in a series of url-encoded maps. The data is encoded like this:
				# 
				# ```
				# count=2&ofs=0&req0_x=3&req0_y=10&req1_abc=def
				# ```
				#
				# First, we need to buffer up the request response and query string decode it.
				bufferPostData req, (data) ->
					# Now the data is in the form of:
					#
					# ```
					# { count: '2',
					#   ofs: '0',
					#   req0_x: '3',
					#   req0_y: '10',
					#   req1_abc: 'def'
					# }
					# ```
					count = parseInt data.count
					unless count == 0 or (count > 0 and data.ofs?)
						signalError 400, 'Invalid maps'
						return

					maps = new Array count

					# Scan through all the keys in the data. Every key of the form:
					# `req123_xxx` will be used to populate its map.
					regex = /^req(\d+)_(.+)$/
					for key, val of data
						match = regex.exec key
						if match
							id = match[1]
							mapKey = match[2]
							map = (maps[id] ||= {})
							# The client uses `mapX_type=_badmap` to signify an error encoding a map.
							continue if id == 'type' and mapKey == '_badmap'
							map[mapKey] = val

					console.log 'maps:', maps

					res.writeHead 200, standardHeaders

					client = createClient(req)
					responseArrays = [
						['c', client.id, null, 8]
					]

					arrayId = 0
					arrays = ([arrayId++, d] for d in responseArrays)
					json = JSON.stringify arrays
					res.end "#{json.length}\n#{json}"

			#### Back Channel
			else if req.method == 'GET'
				console.log 'Back channel:', query
				signalError 404, 'Not found'
			

			else
				res.writeHead 405, standardHeaders
				res.end "Method not allowed"
				

		else
			# We'll 404 the user instead of letting another handler take care of it.
			# Users shouldn't be using the specified URL prefix for anything else.
			res.writeHead 404, standardHeaders
			res.end "Not found"

