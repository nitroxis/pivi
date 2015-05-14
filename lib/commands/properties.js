
var _ = require("lodash");
var S = require("../sequences.js");

module.exports = function(commands) {
  return _.merge({
    "color" : function(data){
      return S.sequence({call: "strokeStyle", args: ["@"]})(data)
    },
    "lineWidth" : function(data){
      return S.sequence({call: "lineWidth", args: ["@"]})(data)
    }
  }, commands);
}
