
var _ = require("lodash");
var S = require("../sequences.js");

module.exports = function(commands) {
  return _.merge({
    "push": function(data){
      return S.sequence({call:"save",args:[]})(data);
    },
    "pop": function(data){
      return S.sequence({call:"restore",args:[]})(data);
    }
  }, commands);
}
