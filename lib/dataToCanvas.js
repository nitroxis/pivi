
var _ = require("lodash");

var REPEAT_LAST = -1;
var commands = {
  // type :  data to args
  // points on canvas are drawn with fillRect that has width = height = 1
  "point": {
    commands: 
    [
      ["fillRect", ["@x","@y",1,1]]
    ]
  },
  "line": {
    commands: 
    [
      ["moveTo", ["@x","@y"]],
      ["lineTo", ["@x","@y"]]
    ],
    finalize: ["stroke",[]]
  },
  "polyline": {
    commands:
    [
      ["moveTo", ["@x","@y"]],
      ["lineTo", ["@x","@y"]],
      // go one command back [ repeat lineTo command ]
      REPEAT_LAST
    ],
    finalize: ["stroke",[]]
  }
};

module.exports = function(context, op){
  var cmds = commands[op.type];
  if(typeof cmds === "undefined") return;
  var data = op.data;

  var cmdIdxOffset = 0;
  _.each(op.data, function(data,i){
    if(typeof cmds.commands[i+cmdIdxOffset] === "number"){
      cmdIdxOffset += cmds.commands[i+cmdIdxOffset];
    }
    var cmd = cmds.commands[i+cmdIdxOffset];
    console.log(data,i);
    var fn = cmd[0]
    var args = _.map(cmd[1], function(arg){
      if(arg[0] == "@"){
        return _.get(data, arg.slice(1));
      }
      return arg;
    });
    context[fn].apply(context, args);
  });
  
  if("finalize" in cmds){
    context[cmds.finalize[0]].apply(context, cmds.finalize[1]);
  }
}