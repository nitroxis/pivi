
var gulp = require("gulp");

var jshint = require("gulp-jshint");
var pivi = require("./lib/api.js");
var handlebars = require("gulp-compile-handlebars");
var rename = require("gulp-rename");

gulp.task("jshint", function(){
  gulp.src(["./lib/*.js","!./lib/grammar.js"])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task("build-specification", function(){
  var i=0;
  options = {
    noEscape: true,
    helpers:
    {
      example: function(piviStr){
        i++;
        pivi.processString(piviStr, "specification/example"+i+".png");
        return "```\n"+piviStr+"\n```\n![](example"+i+".png)\n";
  }}};
  gulp.src("./specification/spec.md.hbs")
    .pipe(handlebars({},options))
    .pipe(rename("specification.md"))
    .pipe(gulp.dest("./specification/"));
})
