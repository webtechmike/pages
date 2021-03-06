var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    order = require('gulp-order'),
    livereload = require('gulp-livereload');

//gutil.env.type = 'dev';
gutil.env.type = 'production';

gulp.task('default', ['watch']);

gulp.task('images', function(){
    return gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('images'));
});

gulp.task('styles', function(){
    return gulp.src('scss/**/*.scss')
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(cssnano())
    .pipe(gulp.dest('css'));
});

gulp.task('jshint', function(){
    return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', function(){
    return gulp.src('js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js'));
});

gulp.task('watch', function(){

    livereload.listen();

    gulp.watch('js/**/*.js', ['jshint']).on('change', livereload.changed);
    gulp.watch('scss/**/*.scss', ['styles']).on('change', livereload.changed);
});

gulp.task('build', ['images', 'styles', 'scripts']);
