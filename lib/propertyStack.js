
var _ = require("lodash");

var defaultProperties = require("./defaultProperties.json");

module.exports = {
  push: function(stack, operation){
    stack.push(operation);
  },
  pop: function(stack){
    if(stack.length < 2){
      console.error("[Error] Stack.pop: Cannot remove default values from stack. Too many closing brackets ']'.");
      return;
    }
    stack.pop();
  },
  setProperty: function(stack, property, value){
    if(stack.length === 0){
      console.error("[Error] Stack.setProperty: Invalid property stack. It must contain at least one element (the default values)");
      return;
    }
    last = stack.length - 1 ;
    stack[last][property] = value;
  },
  getProperty: function(stack, property){
    var stackElement = _.findLast(stack, _.partial(_.has, _, property));
    if(typeof stackElement === "undefined"){
      console.error("[Error] Stack.getProperty: Invalid property \"" + property +"\". Value is undefined");
    }
    return stackElement[property];
  },
  // clears the stack up to the default properties
  clear: function(stack){
    // this really works oO. `stack[0]` always contains the default values
    stack.length = 1;
    stack[0] = defaultProperties;
  }
};
