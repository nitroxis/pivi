
var _ = require("lodash");

var cmdPlugins = [
  "./commands/point_data.js",
  "./commands/line_data.js",
];
var commands = _.reduce(cmdPlugins, function(acc, plugin){
  return require(plugin)(acc);
}, {});

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
