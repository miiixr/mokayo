var gulp         = require('gulp'),
    $            = require('gulp-load-plugins')(),
    sass         = require('gulp-ruby-sass'),
    minifycss    = require('gulp-minify-css'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    notify       = require('gulp-notify'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload,
    argv         = require('yargs').argv,
    del          = require('del');

gulp.task('styles', function() {  
  return sass('./src/assets/scss/**/*.{scss,sass}', { style: 'expanded' })
    .pipe($.plumber())
    .pipe($.autoprefixer('last 2 version'))
    .pipe(minifycss({
        keepBreaks: true,
    }))
    .pipe(gulp.dest('./assets/stylesheets'))
    // .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('templates', function() {
  return gulp.src('src/views/*.jade')
    .pipe($.plumber())
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('./'))
    // .pipe(notify({ message: 'Templates task complete' }));
});

gulp.task('scripts', function() {  
  return gulp.src('src/assets/js/*.js')
    // .pipe(uglify())
    .pipe(gulp.dest('./assets/scripts'))
    // .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {  
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('./assets/images'))
    // .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {  
  return del(['./assets/stylesheets/*.css', './assets/scripts/*.js'], ['./assets/images/**/*']);
});

gulp.task('browser-sync', function() {
  browserSync({
    open: !!argv.open,
    notify: !!argv.notify,
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('build', ['styles', 'templates', 'scripts', 'images']);

gulp.task('serve', ['clean', 'build', 'browser-sync'], function () {
  gulp.watch('src/assets/scss/**/*.{scss,sass}',['styles', reload]);
  gulp.watch('src/assets/js/**/*.js',['scripts', reload]);
  gulp.watch('src/views/*.jade',['templates', reload]);
  gulp.watch('src/images/**/*',['images', reload]);
});

gulp.task('default', ['serve']);