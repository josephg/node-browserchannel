fs = require 'fs'
{exec} = require 'child_process'
coffeescript = require 'coffee-script'

# The compilation process now uses the closure compiler .jar. You'll need a copy of
# closure and a copy of the closure compiler to compile browserchannel from source.
#
# I do this because the version in the REST service is too old and crufty to be useful.
#
# You can get the closure library like this:
#
#     % svn co http://closure-library.googlecode.com/svn/trunk closure-library
#
# And download the closure compiler JAR here:
#
# http://code.google.com/p/closure-compiler/downloads/list
#
# I also compile with this patch to the closure library:
# http://code.google.com/p/closure-library/issues/detail?id=388&sort=-id
# ... which fixes a couple timing issues in nodejs.
CLOSURE_DIR = '../closure-library'
CLOSURE_COMPILER = '../closure-library/compiler.jar'

# This just coffee-script compiles the named files into lib/
compile = (files) ->
  code = for f in files
    filename = "#{__dirname}/lib/#{f}.coffee"
    coffee = fs.readFileSync filename, 'utf8'
    js = coffeescript.compile coffee, {filename, bare:true}
    fs.writeFileSync "#{__dirname}/tmp/#{f}.js", js

assemble = (namespaces, out) ->
#  code = code.join ''
#  code = "(function(){#{code}})()"

#  fs.writeFileSync "#{__dirname}/tmp/#{out}", code

  console.warn "Compiling #{out}..."

  namespaces = [namespaces] if typeof namespaces is 'string'
  namespaceArgs = ("--namespace=#{n}" for n in namespaces).join ' '

  # You can add the line below to enable readable output
  #--compiler_flags=\"--formatting=PRETTY_PRINT\"
  exec "#{CLOSURE_DIR}/closure/bin/build/closurebuilder.py
    --root=#{CLOSURE_DIR}
    --root=tmp/
    #{namespaceArgs}
    --output_mode=compiled
    --compiler_jar=#{CLOSURE_COMPILER}
    --compiler_flags=\"--compilation_level=ADVANCED_OPTIMIZATIONS\"
    --compiler_flags=\"--warning_level=DEFAULT\"
    --compiler_flags=\"--externs=lib/handler-externs.js\"", (err, stdout, stderr) ->
    throw err if err
    console.warn stderr
    fs.writeFileSync "#{__dirname}/dist/#{out}", "(function(){#{stdout}})();"

task 'client', 'Build the closure client into a compiled JS file', ->
  compile ['nodejs-override', 'browserchannel', 'bcsocket']

  console.warn "Closure compiling. It takes about a minute, so be patient."

#  assemble 'bc', 'browserchannel.js'
#  assemble ['bc', 'bc.node'], 'node-browserchannel.js'

  assemble 'bc.BCSocket', 'BCSocket.js'
  assemble ['bc.BCSocket', 'bc.node'], 'node-BCSocket.js'

