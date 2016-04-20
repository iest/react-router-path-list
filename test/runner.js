/*
 * This mainly ripped from babel-tape-runner.
 * https://github.com/wavded/babel-tape-runner/blob/master/bin%2Fbabel-tape-runner
 *
 * Sets up everything we need to be able to run tests.
 */
const path = require('path');
const glob = require('glob');

// Setup babel to transform all require'd js files
require('babel-register');
require('babel-polyfill');

// Require in each requested test file
process.argv.slice(2).forEach(arg => {
  glob(arg, (er, files) => {
    if (er) throw er;

    files.forEach(file => {
      require(path.resolve(process.cwd(), file));
    });
  });
});
