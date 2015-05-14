
var _ = require("lodash");
var Sequences = require("../lib/sequences.js");
var sequence = Sequences.sequence;
var repeat = Sequences.repeat;
var cycle = Sequences.cycle;
var chai = require("chai");
chai.should();

describe("Command Sequences", function(){
  it("it converts a command into a call descriptor", function(){
    var seq = sequence(["function",["args"]])();
    seq.should.deep.equal([["function",["args"]]]);

    var seq = sequence(["function",["args"]], ["fn2",[]])();
    seq.should.deep.equal([["function",["args"]],["fn2",[]]]);
  });
  it("applies data to each command", function(){
    var seq = sequence(["function",["@x"]], ["fn2",["@y"]])([{x:0},{y:1}]);
    seq.should.deep.equal([["function",[0]],["fn2",[1]]]);
  });
  it("can repeat one element", function(){
    var seq = sequence(repeat(["function",["x"]]))([{},{},{}]);
    seq.length.should.equal(3);
  });
  it("returns an empty set for repeating no data", function(){
    var seq = sequence(repeat(["function",["x"]]))([]);
    seq.should.deep.equal([]);
  });
  it("can switch between commands and repeating commands", function(){
    var seq = sequence(["fn",[]],repeat(["fn",[]]))();
    seq.length.should.equal(2);
  });
  it("cycles between multiple commands", function(){
    var seq = sequence(cycle(["fn1",[]],["fn2",[]]))(Array(6));
    seq.length.should.equal(6);
    seq[4][0].should.equal("fn1");
    seq[5][0].should.equal("fn2");
  });
});
