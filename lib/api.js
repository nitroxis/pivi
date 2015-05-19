
var sc = require("./streamCanvas.js");
var es = require("event-stream");
var parse = require("./grammar.js").parse;
var Stream = require("stream");
var spawn = require("child_process").spawn;
var path = require("path");

API = {
  processString: function(piviStr, outfile){
    var stream = new Stream();
    stream.readable = true;

    stream.pipe(es.split())
      .pipe(es.mapSync(parse))
      .pipe(sc(outfile));

    stream.emit("data", piviStr);
    stream.emit("end");

  },
  createAnimationProcessor: function(outfile){
    var createAnim = spawn(path.join(__dirname, "../bin/create_anim.sh"), [outfile]);
    return createAnim.stdin;
  },
  processAnimationString: function(piviStr, outfile){
    var anim = API.createAnimationProcessor(outfile);

    var stream = new Stream();
    stream.readable = true;

    stream.pipe(es.split())
      .pipe(es.mapSync(parse))
      .pipe(sc())
      .pipe(anim);

    stream.emit("data", piviStr);
    stream.emit("end");
  }
};

module.exports = API;
