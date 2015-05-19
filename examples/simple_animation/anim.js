console.log("canvas 100 100");
for(var i=0; i<30; i++){
  var y1 = Math.sin(i*0.4)*50 + 50;
  var y2 = Math.cos(i*0.4)*50 + 50;
  console.log("line 0 " + y1 + " 100 " + y2);
  console.log("newframe");
}
