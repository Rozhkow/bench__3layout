const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");

const uglify = require("gulp-uglify-es").default;
const minifyCSS = require("gulp-minify-css");

const paths = {
  src: {
    js: "src/js/**/*.js",
    sass: "src/scss/**/*.scss",
    html: "src/*.html",
    img: "src/assets/img/**/*.{jpg,jpeg,png,svg,gif}",
    fonts: "src/assets/fonts/**/*.{ttf,otf}",
  },
  dist: {
    js: "dist/",
    sass: "dist/",
    html: "dist/",
    img: "dist/img",
    fonts: "dist/fonts",
  },
};

gulp.task("sass", () => {
  return gulp
    .src(paths.src.sass)
    .pipe(sass().on("error", sass.logError))
    .pipe(minifyCSS())
    .pipe(concat("index.min.css"))
    .pipe(gulp.dest(paths.dist.sass));
});

gulp.task("js", () => {
  return gulp
    .src(paths.src.js)
    .pipe(uglify())
    .pipe(concat("index.min.js"))
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task("html", () => {
  return gulp.src(paths.src.html).pipe(gulp.dest(paths.dist.html));
});

gulp.task("img", () => {
  return gulp
    .src(paths.src.img)
    .pipe(
      cache(
        imagemin({
          interlaced: true,
          verbose: true,
        })
      )
    )
    .pipe(gulp.dest(paths.dist.img));
});

gulp.task("fonts", () => {
  return gulp.src(paths.src.fonts).pipe(gulp.dest(paths.dist.fonts));
});

gulp.task(
  "default",
  gulp.series(["sass", "js", "html", "fonts", "img"], (cb) => {
    gulp.watch(paths.src.sass, gulp.series("sass"));
    gulp.watch(paths.src.js, gulp.series("js"));
    gulp.watch(paths.src.html, gulp.series("html"));
    gulp.watch(paths.src.img, gulp.series("img"));
    gulp.watch(paths.src.fonts, gulp.series("fonts"));

    cb();
  })
);

gulp.task("clear cache", () => cache.clearAll());
