var fs = require('fs-extra');
var extract = require('extract-comments');
var beautify = require('json-beautify');
var doctrine = require('doctrine');

var CONFIG = require('./config');
var ScanFile = require('./scanfile');

ScanFile(CONFIG.SRC, 'GameObject.json');
