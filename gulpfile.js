/**
 * Created by DreamBoy on 2017/1/8.
 */
var init = require('./build/gulpfile.init.js');
var prod = require('./build/gulpfile.prod.js');
var dev = require('./build/gulpfile.dev.js');
init();
prod();
dev();