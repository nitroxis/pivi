#!/usr/bin/env node

var canvas = require("canvas");
var es = require("event-stream");
var parse = require("./lib/grammar.js").parse;
var sc = require("./lib/streamCanvas.js");
var argv = require("yargs")
          .usage("echo 'line (0 0) (200 200)' | $0 [options]")
          .default("f","./out.png")
          .describe("f", "The output file that gets generated")
          .help("h")
          .argv;

process.stdin
    .pipe(es.split())
    .pipe(es.mapSync(parse))
    .pipe(sc(argv.f));
