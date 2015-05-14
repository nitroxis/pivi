
var _ = require("lodash");
var S = require("../sequences.js");

var REPEAT_LAST = -1;
module.exports = function(commands) {
  return _.merge({
    "points": function(data){
      return S.sequence(S.repeat({call:"fillRect",args:["@x","@y",1,1]}))(data);
    }
  }, commands);
}
