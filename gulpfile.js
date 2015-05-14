
var gulp = require("gulp");

var jshint = require("gulp-jshint");
var handlebars = require("gulp-compile-handlebars");
var rename = require("gulp-rename");
var peg = require("gulp-peg");
var gutil = require("gulp-util");
var mocha = require("gulp-mocha");
var clean = require("gulp-clean");

gulp.task("jshint", function(){
  gulp.src(["./lib/*.js","!./lib/grammar.js"])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task("clean", function(){
  gulp.src("./lib/grammar.js")
    .pipe(clean());
})

gulp.task("build-grammar", function(){
  gulp.src("./lib/grammar.peg")
    .pipe( peg( ).on( "error", gutil.log ) )
    .pipe(gulp.dest("./lib/"));
});

gulp.task("specification", ["clean","build-grammar","build-specification"]);

gulp.task("build-specification", function(){
  var pivi = require("./lib/api.js");
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

gulp.task("run-tests", function(){
  gulp.src("./test/*.js")
    .pipe(mocha());
})

gulp.task("test", ["clean","build-grammar", "run-tests"]);
