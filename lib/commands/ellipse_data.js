
var _ = require("lodash");
var S = require("../sequences.js");

module.exports = function(commands) {
  return _.merge({
    "circles": function(data){
      return S.sequence(
        S.repeat(
          S.sequence(
            {call:"beginPath", args:[]},
            {call:"arc", args:["@0.x","@0.y","@1",0,2*Math.PI, false]},
            {call:"stroke", args:[]}
      )))(data);
    }
  }, commands);
}
