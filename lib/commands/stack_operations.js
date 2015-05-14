
var _ = require("lodash");

module.exports = function(commands) {
  return _.merge({
    "push": {
      finalize: ["save",[]]
    },
    "pop": {
      finalize: ["restore",[]]
    }
  }, commands);
}
