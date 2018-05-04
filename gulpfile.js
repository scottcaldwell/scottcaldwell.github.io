var gulp = require('gulp');
var sass = require('gulp-sass');

var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var postCss = require('gulp-postcss');

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("src/sass/*.scss", ['sass']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./src/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("]./dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

// // Include Our Plugins
// var sass = require('gulp-sass');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');

// // Compile Our Sass
// gulp.task('sass', function() {
//     return gulp.src('src/sass/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('dist/wp-content/themes/sproutly/css'));
// });

// //Concatenate & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src('src/js/*.js')
//         .pipe(concat('scripts.js'))
//         .pipe(gulp.dest('dist/wp-content/themes/sproutly/js'))
//         .pipe(rename('sproutly.min.js'))
//         .pipe(uglify())
// });

// // Watch Files For Changes
// gulp.task('watch', function() {
//     gulp.watch('src/js/*.js', ['scripts']);
//     gulp.watch('src/sass/**/*.scss', ['sass']);
// });

// // Default Task
// gulp.task('default', ['sass']);
