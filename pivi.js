#!/usr/bin/env node

var canvas = require("canvas");
var es = require("event-stream");
var parse = require("./lib/grammar.js").parse;
var sc = require("./lib/streamCanvas.js");
var argv = require("yargs")
          .usage("echo 'line (0 0) (200 200)' | $0 [options]")
          .default("f","./out%d.png")
          .describe("f", "The output file that gets generated")
          .default("a",false)
          .describe("a","create an animated gif")
          .help("h")
          .argv;
var api = require("./lib/api.js");

if(argv.a){
  if(argv.f == "./out%d.png"){
    argv.f = "out.gif";
  }
  process.stdin
    .pipe(es.split())
    .pipe(es.mapSync(parse))
    .pipe(sc())
    .pipe(api.createAnimationProcessor(argv.f));
} else {
  process.stdin
      .pipe(es.split())
      .pipe(es.mapSync(parse))
      .pipe(sc(argv.f))
      .pipe(process.stdout);
}
