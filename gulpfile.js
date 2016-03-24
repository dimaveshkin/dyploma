var gulp = require('gulp');
var watch = require("gulp-watch");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var cssnano = require("gulp-cssnano");
var sass = require("gulp-sass");
var del = require("del");

var path = {
    src: {
        scss: ["public/src/scss/main.scss"],
        copy: {
            html: [
                "public/src/*.html",
                "public/src/*.txt",
                "public/src/*.jsp"
            ],
            images: ["public/src/images/**/*"],
            fonts: ["public/src/fonts/**/*"],
            libs: ["public/src/libs/**/*"]
        },
        templates: ["public/src/templates/**/*.hbs"]
    },
    build: {
        css: "public/build/css",
        js: "public/build/js",
        copy: {
            html: "public/build/",
            images: "public/build/images/",
            fonts: "public/build/fonts/",
            libs: "public/build/libs/"
        },
        templates: "public/build/templates/"
    }
};

var buildTasks = ["scss:build"];

//gulp.task("type:build", function () {
//    gulp.src(path.src.mainjs)
//        //.pipe(sourcemaps.init())
//        .pipe(browserify({
//            transform: 'hbsfy',
//            debug: true
//        }))
//        //.pipe(concat('main.js'))
//        //.pipe(uglify())
//        //.pipe(sourcemaps.write())
//        .pipe(gulpif(BUILD_TO_TARGET, gulp.dest(path.buildToTarget.base + path.buildToTarget.js)))
//        .pipe(gulp.dest(path.build.js));
//});

gulp.task("scss:build", function () {
    gulp.src(path.src.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css));
});

gulp.task("clean", function () {
    return del(["public/build/*"], {force: true});
});

for(var i in path.src.copy) {
    if(path.src.copy.hasOwnProperty(i)) {
        gulp.task('copy_' + i, (function (i) {
            return function() {
                gulp.src(path.src.copy[i])
                    .pipe(gulp.dest(path.build.copy[i]));
            }
        })(i));
        buildTasks.push("copy_"+ i);
    }
}

gulp.task('watch', function(){
    for(var i in path.src.copy) {
        if(path.src.copy.hasOwnProperty(i)) {
            watch(path.src.copy[i], function(event, cb) {
                gulp.start('copy_' + i);
            });
        }
    }

    watch(path.src.scss, function(event, cb) {
        gulp.start('scss:build');
    });
    //
    //watch(path.src.js, function(event, cb) {
    //    gulp.start('js:build');
    //});
    //
    //watch(path.src.templates, function(event, cb) {
    //    gulp.start('js:build');
    //});
});

gulp.task('build', buildTasks);
gulp.task('default', ["build", 'watch']);
