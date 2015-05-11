
var _ = require("lodash");

var REPEAT_LINE = -1;
var REPEAT_NEW_LINE = -2;
module.exports = function(commands) {
  return _.merge({
    "lines": {
      commands:
      [
        ["moveTo", ["@x","@y"]],
        ["lineTo", ["@x","@y"]],
        REPEAT_NEW_LINE
      ],
      finalize: ["stroke",[]]
    },
    "polyline": {
      commands:
      [
        ["moveTo", ["@x","@y"]],
        ["lineTo", ["@x","@y"]],
        // go one command back [ repeat lineTo command ]
        REPEAT_LINE
      ],
      finalize: ["stroke",[]]
    }
  }, commands);
}
