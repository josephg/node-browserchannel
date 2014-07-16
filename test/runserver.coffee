#!/usr/bin/env coffee
# This file hosts a web server which exposes a bunch of browserchannel clients
# which respond in different ways to requests.

fs = require 'fs'
express = require 'express'
browserChannel = require('..').server
coffee = require 'coffee-script'

app = express()

app.use express.static "#{__dirname}/web"
app.use express.static "#{__dirname}/../node_modules/mocha" # for mocha.js, mocha.css
#app.use express.logger 'dev'

# Compile and host the tests.
app.use (req, res, next) ->
  return next() unless req.url is '/tests.js'
  f = fs.readFileSync require.resolve('./bcsocket'), 'utf8'
  f = "require = (m) -> window[m]\n" + f
  res.setHeader 'Content-Type', 'application/javascript'
  res.end coffee.compile f

# So, I really want to remove the 'base:' property from browserchannel and just
# use express's router's mechanism. It works fine, except that options.base defaults
# to '/channel', so you have to override it.
#
# I missed a great opportunity to make this change in browserchannel 2.0.

# When a client connects, send it a simple message saying its app version
app.use '/notify', browserChannel base:'', (session) ->
  session.send {appVersion: session.appVersion}

# Echo back any JSON messages a client sends.
app.use browserChannel base:'/echo', (session) ->
  session.on 'message', (message) ->
    session.send message

# Echo back any maps the client sends
app.use browserChannel base:'/echomap', (session) ->
  session.on 'map', (message) ->
    session.send message

# This server aborts incoming sessions *immediately*.
app.use browserChannel base:'/dc1', (session) ->
  session.close()

# This server aborts incoming sessions after sending
app.use browserChannel base:'/dc2', (session) ->
  process.nextTick ->
    session.close()

app.use browserChannel base:'/dc3', (session) ->
  setTimeout (-> session.close()), 100

# Send a stop() message immediately
app.use browserChannel base:'/stop1', (session) ->
  session.stop()

# Send a stop() message in a moment
app.use browserChannel base:'/stop2', (session) ->
  process.nextTick ->
    session.stop()

# Send the characters that aren't valid javascript as literals
# http://timelessrepo.com/json-isnt-a-javascript-subset
app.use browserChannel base:'/utfsep', (session) ->
  session.send "\u2028 \u2029"
  #session.send {"\u2028 \u2029"}

app.use browserChannel base:'/extraParams', (session) ->
  session.send session.query

app.use browserChannel base:'/extraHeaders', (session) ->
  session.send session.headers

server = module.exports = require('http').createServer(app)

if require.main == module
  server.listen 4321
  console.log 'Point your browser at http://localhost:4321/'
