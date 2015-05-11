
var _ = require("lodash");

var REPEAT_LAST = -1;
module.exports = function(commands) {
  return _.merge({
    "point": {
      commands:
      [
        ["fillRect", ["@x","@y",1,1]],
        REPEAT_LAST
      ]
    }
  }, commands);
}
