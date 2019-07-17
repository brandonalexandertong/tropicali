// pulls the function from package.json

var gulp = require('gulp')
var postCss = require('gulp-postcss')
var cleanCss = require("gulp-clean-css")
var sourceMaps = require("gulp-sourcemaps")
// broweser refresh
var browserSync = require('browser-sync').create()
// images
var imagemin = require("gulp-imagemin")
var concat  = require("gulp-concat")


gulp.task("postCss", function() {
  // We want to run sass css/app.css app.css --watch
  // this section simply alters the css file to css file
  return gulp.src([
    "src/css/reset.css",
    "src/css/app.css",
    "src/css/typography.css"
  ])
    .pipe(sourceMaps.init())
    .pipe(
      postCss([
        require("autoprefixer"),
        require("postcss-preset-env")({
          stage: 1,
          browsers: ["IE 11", "last 2 versions"]
        })
      ])
    )
    .pipe(concat("app.css"))
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
// if a change is made to css file, it will run "sass" functions
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
  gulp.watch("src/css/*", ["postCss"])
  gulp.watch("src/fonts/*", ["fonts"])
  gulp.watch("src/img/*", ["images"])
})



// will run the "sass" function above,  so we can associate many functions with the default
gulp.task('default', ["postCss", "watch", "html", "fonts", "images"])
