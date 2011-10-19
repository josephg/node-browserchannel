# This fixes some bits and pieces so the browserchannel client works from nodejs.

request = require 'request'

# I'll make the test image loading work like normal using regular HTTP requests.
goog.net.tmpnetwork.testLoadImage = (url, timeout, callback) ->
  # If the url looks like '//www.google.com/.....' then prepend http: on the front.
  if url.match /^\/\//
    url = 'http:' + url

  #console.warn 'testLoadImage', url

  done = false
  setTimeout ->
      if done is false
        done = true
        callback false
    , timeout

  request url, (error, response, body) ->
    if done is false
      done = true
      callback (error == null)

goog.global = global


# Create XHR objects using the nodejs library.

goog.require 'goog.net.XmlHttpFactory'

XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

goog.net.BrowserChannel.prototype.createXhrIo = (hostPrefix) ->
  xhrio = new goog.net.XhrIo()
  xhrio.createXhr = -> new XMLHttpRequest()
  xhrio

module['exports'] = Channel
