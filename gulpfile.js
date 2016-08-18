const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const browserSync = require('browser-sync').create();
const source = require('vinyl-source-stream');


gulp.task('scripts', function() {
  return browserify({
      entries: ['./src/scripts/app.js']
    })
    .transform(babelify, {presets: ["es2015"]})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public'))
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.js', gulp.series('scripts'));
});

gulp.task('serve', function () {
  browserSync.init({
    server: './public',
    port: 8080
  });

  browserSync.watch('./public/**/*.*').on('change', browserSync.reload);
});

gulp.task('build', gulp.series(
    'scripts'
));

gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'watch',
    'serve'
)));