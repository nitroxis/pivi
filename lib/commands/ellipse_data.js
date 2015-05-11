
var _ = require("lodash");

var REPEAT_LAST = -1;
module.exports = function(commands) {
  return _.merge({
    "circles": {
      prepareEach: ["beginPath",[]],
      commands:
      [
        ["arc", ["@0.x","@0.y","@1",0,2*Math.PI, false]],
        REPEAT_LAST
      ],
      finalizeEach: ["stroke",[]]
    }
  }, commands);
}
