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

# If the user is using IE, instead of using XHR backchannel loaded using
# a forever iframe. When data is sent, it is wrapped in <script></script> tags
# which call functions in the browserchannel library.
#
# This method wraps the normal `.writeHead()`, `.write()` and `.end()` methods by
# special versions which produce output based on the request's type.
#
# This **is not used** for:
#
# - The first channel test
# - The first *bind* connection a client makes. The server sends arrays there, but the
#   connection is a POST and it returns immediately. So that request happens using XHR/Trident
#   like regular forward channel requests.
messagingMethods = (type, res) ->
	if type == 'html'
		junkSent = false

		writeHead: ->
			res.writeHead 200, 'OK', standardHeaders
			res.write '<html><body>'

			domain = query.DOMAIN
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
		# For normal XHR requests, we send data normally.
		writeHead: -> res.writeHead 200, 'OK', standardHeaders
		write: (data) -> res.write data
		end: (data) -> res.end data
		signalError: (statusCode, message) ->
			res.writeHead statusCode, standardHeaders
			res.end message

# ## Parsing client maps from the forward channel
#
# The client sends data in a series of url-encoded maps. The data is encoded like this:
# 
# ```
# count=2&ofs=0&req0_x=3&req0_y=10&req1_abc=def
# ```
#
# First, we need to buffer up the request response and query string decode it.
bufferPostData = (req, callback) ->
	data = []
	req.on 'data', (chunk) ->
		data.push chunk.toString 'utf8'
	req.on 'end', ->
		data = data.join ''
		callback querystring.parse data

# Next, we'll need to decode the querystring-encoded maps into an array of objects.
#
# When this function is called, the data is in this form:
#
# ```
# { count: '2',
#   ofs: '0',
#   req0_x: '3',
#   req0_y: '10',
#   req1_abc: 'def'
# }
# ```
#
# ... and we will return an object in the form of [{x:'3', y:'10'}, {abc: 'def'}]
#
# I really wish they'd just used JSON. I guess this lets you submit forward channel
# data using just a GET request if you really want to. I wonder if thats how early
# versions of browserchannel worked...
decodeMaps = (data) ->
	count = parseInt data.count
	throw new Error 'Invalid maps' unless count == 0 or (count > 0 and data.ofs?)

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

	maps

# The server module returns a function, which you can call with your configuration
# options. It returns your configured connect middleware, which is actually another function.
module.exports = (options, onConnect) ->
	if typeof onConnect == 'undefined'
		onConnect = options
		options = {}

	options ||= {}
	options[option] ||= value for option, value of defaultOptions

	# Strip off a trailing slash in base.
	base = options.base
	base = base[... base.length - 1] if base.match /\/$/

	clients = {}

	# Host prefixes provide a way to skirt around connection limits. They're only
	# really important for old browsers.
	getHostPrefix = ->
		if options.hostPrefixes
			randomArrayElement options.hostPrefixes
		else
			null

	# # Create a new client session.
	#
	# This method will start a new client session. It is called in two different ways:
	#
	# - A new client is connecting for the first time
	# - A client is reconnecting a dropped connection. In this case, the client provides
	#   their previous *sessionId* and *arrayId*.
	#
	# Session ids are generated by [node-hat]. They are guaranteed to be unique.
	# [node-hat]: https://github.com/substack/node-hat
	#
	# This method is synchronous, because a database will never be involved in browserchannel
	# session management. Browserchannel sessions only last as long as the user's browser
	# is open. If there's any connection turbulence, the client will reconnect and get
	# a new session id.
	#
	# I'm not sure what should happen if there's an old *sessionId* that we still know about.
	# Presumably, we rename the old session and pretend nothing happened... though I imagine
	# its a bit more complicated than that. I'll have to read more of the code.
	createClient = (address, appVersion, oldSessionId, oldArrayId) ->
		if oldSessionId?
			client = clients[oldSessionId]
			if client?
				# We create a new session id for the client and send any pending arrays
				client.id = hat()

				client.emit 'reconnected'

				# Resending arrays isn't implemented yet.
				throw new Error 'Not implemented'

				# We probably need to reset the client's rid and all sorts of nonsense.

				return client

			# Otherwise we'll just create a new client like normal. I'm not sure if
			# we ever tell the client that we have no idea about its old sessionId.

		# Create a new client. Clients extend node's [EventEmitter][] so they have access to
		# goodies like `client.on(event, handler)`, `client.emit('paarty')`, etc.
		# [EventEmitter]: http://nodejs.org/docs/v0.4.12/api/events.html
		client = new EventEmitter

		# The client's unique ID for this connection
		client.id = hat()

		# The client is a big ol' state machine. It has the following states:
		#
		# - **init**: The client has been created and its sessionId hasn't been sent yet.
		#   The client moves to the **connected** state almost immediately.
		#
		# - **connected**: The client is sitting pretty and ready to send and receive data.
		#   The client should spend most of its time in this state.
		#
		# - **stopped**: The client is invalid for some reason. The client stays in this
		#   state just long enough to tell the client to stop connecting and tell the
		#   application that the client is going to be destroyed. Then the client is becomes
		#   **dead** and its removed from the session list.
		#
		# - **dead**: The client has been removed from the session list. It can no longer
		#   be used for any reason.
		#
		#   It is invalid to send arrays to a client while it is stopped or dead. Unless you're
		#   Bruce Willis...
		client.state = 'init'

		# The state is modified through this method. It emits events when the state changes.
		# (yay)
		client.changeState = (newState) ->
			oldState = @state
			@state = newState
			@emit @state, oldState

			if newState == 'stopped'
				client.queueArray ['stop']

		# The server sends messages to the client via a hanging GET request. Of course,
		# the client has to be the one to open that request.
		#
		# This is a handle to that request.
		client.setBackChannel = (res, query) ->
			throw new Error 'Invalid backchannel headers' unless query.RID == 'rpc'

			@backChannel = res
			@backChannelMethods = messagingMethods query.TYPE, res
			@chunk = query.CI == '0'

			# If we haven't sent anything for 30 seconds, we'll send a little `['noop']` to the
			# client to make sure we haven't forgotten it. (And to make sure the backchannel
			# connection doesn't time out.)
			#
			# Its possible that a little bit of noise on the network connection (but not at the
			# application level) will make this setTimeout not fire sometimes. Its not a big
			# deal anyway - the client will just reopen it.
			res.connection.setTimeout 30 * 1000, -> client.send ['noop']

			# Send any arrays we've buffered now that we have a backchannel
			client.flush()

			res.connection.on 'close', ->
				# Sad.
				client.backChannel = client.backChannelMethods = null

		client.refreshHeartbeat = ->

		# The server sends data to the client by sending *arrays*. It seems a bit silly that
		# client->server messages are maps and server->client messages are arrays, but there it is.
		client.outgoingArrays = []

		# `lastArrayId` is the array ID of the last queued array
		client.lastArrayId = -1

		# Every request from the client has an *AID* parameter which tells the server the ID
		# of the last request the client has received. We won't remove arrays from the outgoingArrays
		# list until the client has confirmed its received them.
		#
		# In `lastSentArrayId` we store the ID of the last array which we actually sent.
		client.lastSentArrayId = -1

		# The arrays get removed once they've been acknowledged
		client.acknowledgedArrays = (id) ->
			@outgoingArrays.shift() while @outgoingArrays.length > 0 and @outgoingArrays[0][0] <= id

		# Queue an array to be sent
		client.queueArray = (arr) ->
			if client.state in ['dead', 'stopped']
				throw new Error "Cannot queue array when state is #{@state}"

			@outgoingArrays.push [++@lastArrayId, arr] # MOAR Arrays! The people demand it!

		# Figure out how many unacknowledged arrays are hanging around in the client.
		client.unacknowledgedArrays = ->
			numUnsentArrays = client.lastArrayId - client.lastSentArrayId
			client.outgoingArrays[... client.outgoingArrays - numUnsentArrays]

		# The session has just been created. The first thing it needs to tell the client
		# is its session id and host prefix and stuff.
		client.queueArray ['c', client.id, getHostPrefix(), 8]

		# ## Encoding server arrays for the back channel
		#
		# The server sends data to the client in **chunks**. Each chunk is a *JSON* array prefixed
		# by its length in bytes.
		#
		# The array looks like this:
		#
		# ```
		# [
		#   [100, ['message', 'one']],
		#   [101, ['message', 'two']],
		#   [102, ['message', 'three']]
		# ]
		# ```
		#
		# Each individial message is prefixed by its *array id*, which is a counter starting at 0
		# when the session is first created and incremented with each array.
		client.sendTo = (channel, write) ->
			numUnsentArrays = client.lastArrayId - client.lastSentArrayId
			if numUnsentArrays > 0
				arrays = client.outgoingArrays[client.outgoingArrays.length - numUnsentArrays ...]

				json = JSON.stringify(arrays) + "\n"
				# **Away!**
				write "#{json.length}\n#{json}"

				client.lastSentArrayId = client.lastArrayId

			numUnsentArrays

		# Queue the arrays to be sent on the next tick
		client.flush = ->
			process.nextTick ->
				if client.backChannel
					sentSomething = client.sendTo client.backChannel, client.backChannelMethods.write
					client.backChannelMethods.end() if !client.chunk and sentSomething
					
		client.send = (arr) ->
			@queueArray arr
			@flush()

		# The client's IP address when it first opened the session
		client.address = address

		# The client's reported application version, or null. This is sent when the
		# connection is first requested, so you can use it to make your application die / stay
		# compatible with people who don't close their browsers.
		client.appVersion = appVersion if appVersion?

		# Stop the client's connections and make it die. This will send the special
		# 'stop' signal to the client, which will cause it to stop trying to reconnect.
		client.stop = ->
			@changeState 'stop'
			@close()

		# This closes a client's connections and makes the server forget about it.
		# The client will probably try and reconnect if you simply close its connections.
		# It'll get a new client object when it does so.
		client.close = ->
			# ... close all connections and stuff.

		# Send the client array data through the backchannel
		client.sendArray = (data) ->

		# Remind everybody that the client is still alive and ticking. If the client
		# doesn't see any traffic for awhile, it'll get deleted and the browser will just have
		# to reconnect.
		client.touch = ->

		clients[client.id] = client

		console.log "Created a new client #{client.id} from #{client.address}"

		client

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

		{writeHead, write, end, signalError} = messagingMethods query.TYPE, res

		# This server only supports browserchannel protocol version **8**.
		if query.VER != '8'
			signalError 400, 'Only version 8 is supported' # Is 400 appropriate here?
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
			# - **blockedprefix** provides network admins a way to blacklist browserchannel
			# requests. It is not supported by node-browserchannel.
			if query.MODE == 'init' and req.method == 'GET'
				hostPrefix = getHostPrefix()
				blockedPrefix = null # Blocked prefixes aren't supported.

				# This is a straight-up normal HTTP request like the forward channel requests.
				# We don't use the funny iframe write methods.
				res.writeHead 200, 'OK', standardHeaders
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
			# All browserchannel connections have an associated client object. A client
			# is created immediately if the connection is new.
			if query.SID
				client = clients[query.SID]
				unless client?
					# This is a special error code for the client. It tells the client to abandon its
					# connection request and reconnect.
					signalError '400', 'Unknown SID'

			#### Forward Channel
			if req.method == 'POST'
				if client == undefined
					# The client is new! Make them a new client object and let the
					# application know.
					client = createClient(req.connection.remoteAddress, query.CVER, query.OSID, query.OAID)
					onConnect? client
					init = true

				client.acknowledgedArrays query.AID if query.AID?

				bufferPostData req, (data) ->
					maps = decodeMaps data
					client.emit 'map', map for map in maps unless client.state == 'stop'

					res.writeHead 200, 'OK', standardHeaders
					# On the initial request, we send any pending server arrays to the client.
					# This is important because it tells the client what its session id is.
					if init
						client.sendTo res, write
						res.end()
					else
						# On normal forward channels, we reply to the request by telling the client
						# if our backchannel is still live and telling it how many unconfirmed
						# arrays we have.
						unacknowledgedArrays = client.unacknowledgedArrays()
						outstandingBytes = if unacknowledgedArrays.length == 0
							0
						else
							JSON.stringify(unacknowledgedArrays).length

						response = JSON.stringify [client.backChannel?, client.lastSentArrayId, outstandingBytes]
						end "#{response.length}\n#{response}"

			#### Back Channel
			else if req.method == 'GET'
				throw new Error 'invalid SID' if typeof query.SID != 'string' && query.SID.length < 5
				throw new Error 'Session not specified' unless client?
				#console.log 'Back channel:', query
				writeHead()
				client.setBackChannel res, query

			else
				res.writeHead 405, 'Method Not Allowed', standardHeaders
				res.end "Method not allowed"
				

		else
			# We'll 404 the user instead of letting another handler take care of it.
			# Users shouldn't be using the specified URL prefix for anything else.
			res.writeHead 404, 'Not Found', standardHeaders
			res.end "Not found"

