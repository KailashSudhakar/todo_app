var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');

var path = {
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST_BUILD: './assets/js',
  DEST_SRC: './assets/js',
  JS_PATH: './components/**/*',
  ENTRY_POINT: ['./components/app.js']
};



gulp.task('build', function(){
  browserify({
    entries: path.ENTRY_POINT,
    debug: true,
  })
  .transform("babelify", {presets: ["es2015","es2016", "react"]})
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('watch', function() {
  gulp.watch(path.JS_PATH, ['build']);
});


gulp.task('default', ['watch']);
