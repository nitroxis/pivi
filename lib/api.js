
var sc = require("./streamCanvas.js");
var es = require("event-stream");
var parse = require("./grammar.js").parse;
var Stream = require("stream");

module.exports = {
  processString: function(piviStr, outfile){
    var stream = new Stream();
    stream.readable = true;

    stream.pipe(es.split())
      .pipe(es.mapSync(parse))
      .pipe(sc(outfile));

    stream.emit("data", piviStr);
    stream.emit("end");

  },
  processAnimationString: function(piviStr, outfile){
    
  }
};
