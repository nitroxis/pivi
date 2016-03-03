#!/usr/bin/env node

// perhaps include it later...
// var canvas = require("canvas");
var es = require("event-stream");
var parse = require("./lib/grammar.js").parse;
// perhaps include canvas later?
// var sc = require("./lib/streamCanvas.js");
var sr = require("./lib/streamRune.js");
var argv = require("yargs")
          .usage("echo 'line (0 0) (200 200)' | $0 [options]")
          .default("f",null)
          .describe("f", "The output file that gets generated")
          .help("h")
          .argv;
// var api = require("./lib/api.js");

if(argv.a){
  if(argv.f == "./out%d.png"){
    argv.f = "out.gif";
  }
  process.stdin
    .pipe(es.split())
    .pipe(es.mapSync(parse))
    .pipe(sr())
    .pipe(api.createAnimationProcessor(argv.f));
} else {
  process.stdin
      .pipe(es.split())
      .pipe(es.mapSync(parse))
      .pipe(sr(argv.f))
      .pipe(process.stdout);
}
