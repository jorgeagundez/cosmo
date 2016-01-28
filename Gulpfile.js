var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    stylus  = require('gulp-stylus'),
    nib     = require('nib'),
    jshint  = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    historyApiFallback = require('connect-history-api-fallback');

// Servidor web de desarrollo
gulp.task('server', function() {
  connect.server({
    root: './web',
    hostname: '0.0.0.0',
    port: 8080,
    livereload: true
    // ,
    // middleware: function(connect, opt) {
    //   return [ historyApiFallback ];
    // }
  }); 
});

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() {
  return gulp.src('./web/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Preprocesa archivos Stylus a CSS y recarga los cambios
gulp.task('css', function() {
  gulp.src('./web/stylesheets/main.styl')
    .pipe(stylus({ use: nib() }))
    .pipe(gulp.dest('./web/stylesheets'))
    .pipe(connect.reload());
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
  gulp.src('./web/**/*.html')
    .pipe(connect.reload());
});

// Vigila cambios que se produzcan en el código y lanza las tareas relacionadas
gulp.task('watch', function() {
  gulp.watch(['./web/**/*.html'], ['html']);  
  gulp.watch(['./web/stylesheets/**/*.styl'], ['css']);
  gulp.watch(['./web/scripts/**/*.js', './Gulpfile.js'], ['jshint']);
});

gulp.task('default', ['server', 'watch']);