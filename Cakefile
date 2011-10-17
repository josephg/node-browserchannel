fs = require 'fs'
coffeescript = require 'coffee-script'
closure = require './closure-compile'

assemble = (files, out) ->
  code = for f in files
    f = "#{__dirname}/src/#{f}.coffee"
    coffee = fs.readFileSync f, 'utf8'
    js = coffeescript.compile coffee, {f, bare:true}

  code = code.join ''

  # There's fixes in the SVN head for browserchannel which remove strict dependancies on window.location
  # if the URL is absolute.
  options =
    code_url: 'http://closure-library.googlecode.com/svn/trunk/closure/goog/net/browserchannel.js'
    # This enables readable output.
#    formatting: 'pretty_print'

  closure.compile code, options, (err, code) ->
    fs.writeFileSync out, code

task 'client', 'Build the closure client into a compiled JS file', ->
  assemble ['microevent', 'channel'], "lib/channel.js"
  assemble ['microevent', 'channel', 'nodejs-override'], "lib/node-channel.js"

