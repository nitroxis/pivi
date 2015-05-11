
var es = require("event-stream");
var pStack = require("./propertyStack.js");
var defProps = require("./defaultProperties.json");
var Canvas = require("canvas");
var dtc = require("./dataToCanvas.js");

module.exports = function(){
  // in javascript every array has stack functionality
  var cvStack = defProps;
  var canvas = new Canvas(200,200);
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = "rgb(0,0,0)";

  return es.through(
    function write(data){
      dtc(ctx, data);
    },
    function end(){
      var fs = require('fs');
      var out = fs.createWriteStream('./out.png');

      var stream = canvas.pngStream();

      stream.on('data', function(chunk){
        out.write(chunk);
      });

      stream.on("end", function(){
        console.log("png "+ __dirname + "/test.png created")
      });
    }
  );
}
