

const assets = {
    dist: {
        root: 'dist/',
        css: 'dist/css/',
        js: 'dist/js/',
    },
    src: {
        js: 'src/js/main.js',
        scss: 'src/sass/'
    }
};


// Initial Gulp setup -----------------------------------------------

// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const sass          = require('gulp-sass');
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync');
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
const notify        = require('gulp-notify');
const log           = require('fancy-log');
const plumber       = require('gulp-plumber');
const babel         = require('gulp-babel');

// Browsersync --------------------------------------------------
gulp.task('browser-sync', function (done) {
    browserSync.init({
        server: './',
        directory: true
    });
    done();
});

// Error Handling -----------------------------------------------
var onError = (err) => {
    log.error('An error occurred:', err.message);
    browserSync.notify(err.message, 3000);
    notify.onError({
        title:      'Gulp',
        subtitle:   '(ノಠ益ಠ)ノ彡┻━┻',
        message:    err.message,
        sound:      'Beep'
    })(err);
};

// Compile Sass into build folder -------------------------------
gulp.task('sass', () => {
    return gulp.src(assets.src.scss + 'main.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass({
            includePaths: assets.src.scss
        }))
        .on('error', onError)
        .pipe(postcss([
            autoprefixer({
                browsers: [
                    '> 1%', 'last 2 versions'
                ]
            })
        ]))
        .pipe(gulp.dest(assets.dist.css))
        .pipe(browserSync.stream());
});

// Transpile, Concatenate & Minify JS ----------------------------
gulp.task('scripts', () => {
    return gulp.src([
        assets.src.js + '*.js'
    ])
        .pipe(babel({
            presets: [[
                'env', {
                    targets: {
                        browsers: [
                            '> 1%', 'last 2 versions'
                        ]
                    }
                }
            ]]
        }))
        .pipe(concat('main.js'))
        .pipe(gulp.dest(assets.dist.js))
        .pipe(browserSync.stream());
});

// Browsersync task ---------------------------------
gulp.task('bs-reload', (done) => {
    browserSync.reload();
    done();
});

// Watch task --------------------------------------
gulp.task('watch', gulp.parallel(() => {
    gulp.watch(assets.src.scss + 'partials/*.scss', gulp.series('sass'));
    gulp.watch(assets.src.js + '*.js', gulp.series('scripts'));
    gulp.watch(assets.dist.root + '/*.html', gulp.series('bs-reload'));
}));

// Helper tasks
gulp.task('code', gulp.parallel('sass', 'scripts'));

// Default gulp task -------------------------------
gulp.task('default', gulp.series('code', 'browser-sync', 'watch'));
