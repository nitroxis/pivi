
var es = require("event-stream");
var Canvas = require("canvas");
var dtc = require("./dataToCanvas.js");

module.exports = function(outfile){
  outfile = outfile || "./out.png";
  // in javascript every array has stack functionality
  var canvas = new Canvas(200,200);
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "rgb(0,0,0)";

  return es.through(
    function write(data){
      console.log("data!" , data);
      dtc(ctx, data);
    },
    function end(){
      var fs = require('fs');
      var out = fs.createWriteStream(outfile);

      var stream = canvas.pngStream();

      stream.on('data', function(chunk){
        out.write(chunk);
      });

      stream.on("end", function(){
        console.log("png "+outfile+" created");
      });
    }
  );
};
