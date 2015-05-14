
var _ = require("lodash");
var Sequences = require("../lib/sequences.js");
var sequence = Sequences.sequence;
var repeat = Sequences.repeat;
var cycle = Sequences.cycle;
var chai = require("chai");
chai.should();

describe("Command Sequences", function(){
  /*it("it converts a command into a call descriptor", function(){
    var seq = sequence({call:"function",args:["args"]})();
    seq.should.deep.equal([{call:"function",args:["args"]}]);

    var seq = sequence({call:"function",args:["args"]}, {call:"fn2",args:[]})();
    seq.should.deep.equal([{call:"function",args:["args"]},{call:"fn2",args:[]}]);
  });
  it("applies data to each command", function(){
    var seq = sequence({call:"function",args:["@x"]}, {call:"fn2",args:["@y"]})([{x:0},{y:1}]);
    seq.should.deep.equal([{call:"function",args:[0]},{call:"fn2",args:[1]}]);
  });
  it("can repeat one element", function(){
    var seq = sequence(repeat({call:"function",args:["x"]}))([{},{},{}]);
    seq.length.should.equal(3);
  });
  it("returns an empty set for repeating no data", function(){
    var seq = sequence(repeat({call:"function",args:["x"]}))([]);
    seq.should.deep.equal([]);
  });
  it("can switch between commands and repeating commands", function(){
    var seq = sequence({call:"fn",args:[]},repeat({call:"fn2",args:[]}))();
    seq[1].call.should.equal("fn2");
    seq.length.should.equal(2);
  });
  it("cycles between multiple commands", function(){
    var seq = sequence(cycle({call:"fn1",args:[]},{call:"fn2",args:[]}))(Array(6));
    seq.length.should.equal(6);
    seq[4].call.should.equal("fn1");
    seq[5].call.should.equal("fn2");
  });
  it("can repeat sequences", function(){
    var seq = sequence(
      repeat(
        sequence({call:"fn1",args:[]},{call:"fn2",args:[]})))(Array(5));
    seq.length.should.equal(10);
  });*/
  it("repeated sequences use data", function(){
    var seq = sequence(
      repeat(
        sequence({call:"fn1",args:[]},{call:"fn2",args:["@a","@b"]})))([{a:0,b:1}]);
    console.log(seq);
    seq[1].args[0].should.equal(0);
    seq[1].args[1].should.equal(1);
  });
});
