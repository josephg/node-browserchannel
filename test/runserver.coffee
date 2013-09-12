#!/usr/bin/env coffee
# This file hosts a web server which exposes a bunch of browserchannel clients
# which respond in different ways to requests.

fs = require 'fs'
connect = require 'connect'
browserChannel = require('..').server
coffee = require 'coffee-script'

server = module.exports = connect(
  connect.static "#{__dirname}/web"
  connect.static "#{__dirname}/../node_modules/mocha" # for mocha.js, mocha.css
  #connect.logger 'dev'

  # Compile and host the tests.
  (req, res, next) ->
    return next() unless req.url is '/tests.js'
    f = fs.readFileSync require.resolve('./bcsocket'), 'utf8'
    f = "require = (m) -> window[m]\n" + f
    res.setHeader 'Content-Type', 'application/javascript'
    res.end coffee.compile f

  # When a client connects, send it a simple message saying its app version
  browserChannel base:'/notify', (session) ->
    session.send {appVersion: session.appVersion}

  # Echo back any JSON messages a client sends.
  browserChannel base:'/echo', (session) ->
    session.on 'message', (message) ->
      session.send message

  # Echo back any maps the client sends
  browserChannel base:'/echomap', (session) ->
    session.on 'map', (message) ->
      session.send message

  # This server aborts incoming sessions *immediately*.
  browserChannel base:'/dc1', (session) ->
    session.close()

  # This server aborts incoming sessions after sending
  browserChannel base:'/dc2', (session) ->
    process.nextTick ->
      session.close()

  browserChannel base:'/dc3', (session) ->
    setTimeout (-> session.close()), 100

  # Send a stop() message immediately
  browserChannel base:'/stop1', (session) ->
    session.stop()

  # Send a stop() message in a moment
  browserChannel base:'/stop2', (session) ->
    process.nextTick ->
      session.stop()

  # Send the characters that aren't valid javascript as literals
  # http://timelessrepo.com/json-isnt-a-javascript-subset
  browserChannel base:'/utfsep', (session) ->
    session.send "\u2028 \u2029"
    #session.send {"\u2028 \u2029"}
)

if require.main == module
  server.listen 4321
  console.log 'Point your browser at http://localhost:4321/'
