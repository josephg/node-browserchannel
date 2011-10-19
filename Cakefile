fs = require 'fs'
coffeescript = require 'coffee-script'
closure = require './closure-compile'

assemble = (files, out) ->
  code = for f in files
    f = "#{__dirname}/lib/#{f}.coffee"
    coffee = fs.readFileSync f, 'utf8'
    js = coffeescript.compile coffee, {f, bare:true}

  code = code.join ''

  options =
    # There's fixes in the SVN head for browserchannel which remove strict dependancies on window.location
    # if the URL is absolute.
    code_url: 'http://closure-library.googlecode.com/svn/trunk/closure/goog/net/browserchannel.js'
    # This makes the compiler not munge the names of any browserchannel handler method calls.
    js_externs: fs.readFileSync 'lib/handler-externs.js', 'utf8'
    # This enables readable output.
#    formatting: 'pretty_print'

  closure.compile code, options, (err, code) ->
    fs.writeFileSync "#{__dirname}/dist/#{out}", "(function(){#{code}})()"

task 'client', 'Build the closure client into a compiled JS file', ->
  assemble ['browserchannel'], 'browserchannel.js'
#  assemble ['microevent', 'channel'], "lib/channel.js"
#  assemble ['microevent', 'channel', 'nodejs-override'], "lib/node-channel.js"

