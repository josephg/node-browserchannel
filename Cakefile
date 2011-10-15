fs = require 'fs'
coffeescript = require 'coffee-script'
closure = require './closure-compile'

compile = (input, outfile) ->
	# Closure compile the JS
	closure.compile input, (err, code) ->
		throw err if err?

		output = outfile
		fs.writeFileSync output, "(function(){\n#{code}})();"

task 'client', 'Build the closure client into a compiled JS file', ->
	filename = "#{__dirname}/lib/closure.coffee"
	code = fs.readFileSync filename, 'utf8'
	code = coffeescript.compile code, {filename, bare:true}
	fs.writeFileSync 'foo.js', code
	compile code, "#{__dirname}/lib/channel.js"

