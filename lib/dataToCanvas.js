
var _ = require("lodash");

var cmdPlugins = [
  "./commands/point_data.js",
  "./commands/line_data.js",
  "./commands/ellipse_data.js",
  "./commands/stack_operations.js",
  "./commands/properties.js",
];
var commands = _.reduce(cmdPlugins, function(acc, plugin){
  return require(plugin)(acc);
}, {});


module.exports = function(context, op){
  var cmds = commands[op.type];
  if(typeof cmds === "undefined") return;
  var data = op.data;
  var calls = cmds(data);
  _.each(calls, function(call){
    if(op.isProperty){
      context[call.call] = call.args[0];
    } else {
      context[call.call].apply(context, call.args);
    }
  });
};
