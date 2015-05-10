var _ = require("lodash");
var parse = require("../lib/grammar.js").parse
var chai = require("chai");
chai.should();

describe("Parsing Commands", function(){
  it("can parse the 'pointSize' property", function(){
    var property =
       ["pointSize 7",
        {
            type:"property",
            property: "pointSize",
            data: 7
        }];
        
    parse(property[0]).should.deep.equal(property[1]);
  });
  it("doesn't accept negative pointSizes", function(){
    var pointSize = "pointSize -7";
        
    (function(){parse(pointSize[0]);}).should.throw(Error);
  });
  it("can parse the 'color' property with an tupel", function(){
    var property =
       ["color 128 200 100",
        {
            type:"property",
            property: "color",
            data: {x:128, y:200,z:100}
        }];
        
    parse(property[0]).should.deep.equal(property[1]);
  });
  it("can parse the 'color' property using color names", function(){
    var knownColors = ["red","green","blue"];
    _.each(knownColors, function(c){
      var property = ["color " + c,
        {
            type:"property",
            property: "color",
            data: c
        }];
        parse(property[0]).should.deep.equal(property[1]);
    });
    
  })
});