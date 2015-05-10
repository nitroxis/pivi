
var _ = require("lodash");
var parse = require("../lib/grammar.js").parse
var chai = require("chai");
chai.should();

describe("Parsing Commands", function(){
  it("parses points", function(){
    var point =
       ["point (1,2)",
        {
            type:"point",
            data: [{
                x: 1,
                y: 2
            }]
        }];
        
    parse(point[0]).should.deep.equal(point[1]);
  });
  it("should ignore whitespaces", function(){
    var point = 
        ["point   ( 10 , 0 )",
        {
            type: "point",
            data: [{
                x: 10,
                y: 0
            }]
        }];
    parse(point[0]).should.deep.equal(point[1]);
  });
  it("should parse negative numbers", function(){
    var point = 
        ["point   ( -10 , -5 )",
        {
            type: "point",
            data: [{
                x: -10,
                y: -5
            }]
        }];
    parse(point[0]).should.deep.equal(point[1]);
  });
  it("detects Push commands", function(){
    parse("[").should.deep.equal({type:"push"});
  });
  
  it("detects Push commands", function(){
    parse("]").should.deep.equal({type:"pop"});
  });
});