// pulls the function from package.json

var gulp = require('gulp')
var sass = require('gulp-sass')
var cleanCss = require("gulp-clean-css")
var sourceMaps = require("gulp-sourcemaps")

var browserSync = require('browser-sync').create()
var imagemin = require("gulp-imagemin")

sass.compiler = require('node-sass')

gulp.task("sass", function() {
  // We want to run sass css/app.scss app.css --watch
  // this section simply alters the scss file to css file
  return gulp.src("src/css/app.scss")
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(
      cleanCss({
        compatibility: 'ie8'
      })
    )
    .pipe(sourceMaps.write())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream())
})


gulp.task("html",  function() {
  return gulp.src("src/*.html")
    .pipe(gulp.dest("dist"))
})

gulp.task("fonts", function() {
  // asterisk means choose everything inside this folder
  return gulp.src("src/fonts/*")
    .pipe(gulp.dest("dist/fonts"))
})

gulp.task("images", function() {
  return gulp.src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
})
// when you run "gulp watch"  it begins the watch function, whereas
// if a change is made to scss file, it will run "sass" functions
// which will update .css file
gulp.task("watch", function() {

  // want to run browser sync once we start watching
  browserSync.init({
    server: {
      baseDir: "dist"
    }
  })
  // watch for changes
  gulp.watch("src/*.html", ["html"]).on("change", browserSync.reload)
  gulp.watch("src/css/app.scss", ["sass"])
  gulp.watch("src/fonts/*", ["fonts"])
  gulp.watch("src/img/*", ["images"])
})



// will run the "sass" function above,  so we can associate many functions with the default
gulp.task('default', ["sass", "watch", "html", "fonts", "images"])
