const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const browserSync = require('browser-sync').create();
const source = require('vinyl-source-stream');
const del = require('del');

gulp.task('views', function() {
  return gulp.src('./src/views/index.html')
    .pipe(gulp.dest('./public'))
});

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
  gulp.watch('./src/views/**/*.html', gulp.series('views'));
  gulp.watch('./src/scripts/**/*.js', gulp.series('scripts'));
});

gulp.task('serve', function () {
  browserSync.init({
    server: './public',
    port: 8080
  });

  browserSync.watch('./public/**/*.*').on('change', browserSync.reload);
});

gulp.task('clean', function () {
  return del('./public')
});


gulp.task('build', gulp.series(
    'views',
    'scripts'
));

gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'watch',
    'serve'
)));