# # Unit tests for BrowserChannel client
#
# The browserchannel client is currently implemented using a shim over the closure
# browserchannel library.

module.exports = nodeunit.testCase
  setUp: (callback) ->
    callback()

  tearDown: (callback) ->
    callback()
  
  'foo': (test) -> test.done()

