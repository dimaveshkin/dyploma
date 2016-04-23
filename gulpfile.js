var gulp = require('gulp');
var watch = require("gulp-watch");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var cssnano = require("gulp-cssnano");
var sass = require("gulp-sass");
var del = require("del");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var hbsfy = require('hbsfy');
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");

var path = {
    src: {
        scss: ["public/src/scss/main.scss"],
        mainjs: ["public/src/js/main.js"],
        js: ["public/src/js/**/*.js"],
        images: "public/src/images/**/*",
        copy: {
            html: [
                "public/src/*.html",
                "public/src/*.txt",
                "public/src/*.jsp"
            ],
            // images: ["public/src/images/**/*"],
            fonts: ["public/src/fonts/**/*"],
            libs: ["public/src/libs/**/*"]
        },
        templates: ["public/src/**/*.hbs"]
    },
    build: {
        css: "public/build/css",
        js: "public/build/js",
        images: "public/build/images/",
        copy: {
            html: "public/build/",
            // images: "public/build/images/",
            fonts: "public/build/fonts/",
            libs: "public/build/libs/"
        },
        templates: "public/build/templates/"
    },
    watch: {
        scss: "public/src/scss/**/*.scss"
    }
};

var buildTasks = ["scss:build", "js:build", "img:build"];

gulp.task("scss:build", function () {
    gulp.src(path.src.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css));
});

gulp.task("js:build", function () {
    gulp.src(path.src.mainjs)
        .pipe(browserify({
            transform: 'hbsfy',
            debug: true
        }))
        .pipe(gulp.dest(path.build.js));
});

gulp.task("img:build", function () {
    gulp.src(path.src.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            optimizationLevel: 5
        }))
        .pipe(gulp.dest(path.build.images));
});

gulp.task("clean", function () {
    return del(["public/build/*"], {force: true});
});

for (var i in path.src.copy) {
    if (path.src.copy.hasOwnProperty(i)) {
        gulp.task('copy_' + i, (function (i) {
            return function () {
                gulp.src(path.src.copy[i])
                    .pipe(gulp.dest(path.build.copy[i]));
            }
        })(i));
        buildTasks.push("copy_" + i);
    }
}

gulp.task('watch', function () {
    for (var i in path.src.copy) {
        if (path.src.copy.hasOwnProperty(i)) {
            watch(path.src.copy[i], (function (i) {
                return function (event, cb) {
                    gulp.start('copy_' + i);
                }
            })(i));
        }
    }

    watch(path.watch.scss, function (event, cb) {
        gulp.start('scss:build');
    });

    watch(path.src.js, function (event, cb) {
        gulp.start('js:build');
    });

    watch(path.src.templates, function (event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('build', buildTasks);
gulp.task('default', ["build", 'watch']);
