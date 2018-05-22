var gulp = require('gulp');  
var sass = require('gulp-sass');  
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');  
var browserSync = require('browser-sync');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {  
    gulp.src(['assets/sass/main.scss'])
        .pipe(plumber())
        .pipe(sass({includePaths: ['assets/sass']}))
        .pipe(gulp.dest('assets/css'))
        .pipe(autoprefixer())
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('browser-sync', function() {  
    browserSync.init(["assets/css/*.css", "assets/js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', ['sass', 'browser-sync'], function () {  
    gulp.watch(["assets/sass/**/*.scss", "assets/sass/main.scss",] ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});
