#!/usr/bin/env node

var canvas = require("canvas");
var es = require("event-stream");
var parse = require("./lib/grammar.js").parse;
var sc = require("./lib/streamCanvas.js");

process.stdin
    .pipe(es.split())
    .pipe(es.mapSync(parse))
    .pipe(sc());
