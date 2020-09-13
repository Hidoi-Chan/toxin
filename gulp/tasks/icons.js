const gulp = require('gulp')

module.exports = function icons() {
  return gulp.src('src/icons/*')
    .pipe(gulp.dest('build/icons'))
}