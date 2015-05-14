
var _ = require("lodash");
var S = require("../sequences.js");

module.exports = function(commands) {
  return _.merge({
    "lines": function(data){
      return _.union(
        S.sequence(S.cycle(
          {call:"moveTo", args:["@x","@y"]},
          {call:"lineTo", args:["@x","@y"]}))(data),
        S.sequence({call:"stroke",args:[]})()
      );
    },
    "polyline": function(data){
      return _.union(
        S.sequence(
          {call:"moveTo",args:["@x","@y"]},
          S.repeat({call:"lineTo", args:["@x","@y"]}))(data),
        S.sequence({call:"stroke",args:[]})()
      );
    }
  }, commands);
}
