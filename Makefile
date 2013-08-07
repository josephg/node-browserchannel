# I require a local version of the closure library because the version in google's
# REST service is too old and crufty to be useful.
#
# You can get the closure library like this:
#
#     % svn co http://closure-library.googlecode.com/svn/trunk closure-library
#
# And download the closure compiler JAR here:
#
# http://code.google.com/p/closure-compiler/downloads/list
#
# I also compile with a patch to the closure library (which is in the root of
# this repo). The patch fixes some cleanup issues in the closure library to
# make sure everything gets cleaned up properly when connections close.

.PHONY: clean, all, test

CLOSURE_DIR = ../closure-library
CLOSURE_COMPILER = ../closure-library/compiler.jar

CLOSURE_BUILDER = $(CLOSURE_DIR)/closure/bin/build/closurebuilder.py

CLOSURE_CFLAGS = \
	--root="$(CLOSURE_DIR)" \
	--root=tmp/ \
	--output_mode=compiled \
	--compiler_jar="$(CLOSURE_COMPILER)" \
	--compiler_flags=--compilation_level=ADVANCED_OPTIMIZATIONS \
	--compiler_flags=--warning_level=DEFAULT \
	--compiler_flags=--externs=lib/handler-externs.js \
	--namespace=bc.BCSocket

PRETTY_PRINT = --compiler_flags=--formatting=PRETTY_PRINT

COFFEE = ./node_modules/.bin/coffee
MOCHA = ./node_modules/.bin/mocha

all: dist/server.js dist/bcsocket.js dist/node-bcsocket.js dist/bcsocket-uncompressed.js dist/node-bcsocket-uncompressed.js

clean:
	rm -rf tmp

test:
	$(MOCHA)

tmp/%.js: lib/%.coffee
	$(COFFEE) -bco tmp $+ 

dist/%.js: tmp/compiled-%.js
	echo '(function(){' > $@
	cat $+ >> $@
	echo "})();" >> $@

# The server should be in dist/ too, but we don't need to compile that with closure.
dist/server.js: lib/server.coffee
	$(COFFEE) -bco dist $<

tmp/compiled-bcsocket.js: tmp/bcsocket.js tmp/browserchannel.js
	$(CLOSURE_BUILDER) $(CLOSURE_CFLAGS) > $@

tmp/compiled-node-bcsocket.js: tmp/bcsocket.js tmp/nodejs-override.js tmp/browserchannel.js
	$(CLOSURE_BUILDER) $(CLOSURE_CFLAGS) --namespace=bc.node > $@

tmp/compiled-bcsocket-uncompressed.js: tmp/bcsocket.js tmp/browserchannel.js
	$(CLOSURE_BUILDER) $(CLOSURE_CFLAGS) --compiler_flags=--formatting=PRETTY_PRINT > $@

tmp/compiled-node-bcsocket-uncompressed.js: tmp/bcsocket.js tmp/nodejs-override.js tmp/browserchannel.js
	$(CLOSURE_BUILDER) $(CLOSURE_CFLAGS) --compiler_flags=--formatting=PRETTY_PRINT --namespace=bc.node > $@

