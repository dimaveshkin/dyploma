var gulp = require('gulp');
var watch = require("gulp-watch");
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var cssnano = require("gulp-cssnano");
var sass = require("gulp-sass");
var del = require("del");
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
        images: "images/src/**/*",
        copy: {
            html: [
                "public/src/*.html",
                "public/src/*.txt",
                "public/src/*.jsp"
            ],
            fonts: ["public/src/fonts/**/*"],
            libs: ["public/src/libs/**/*"]
        },
        templates: ["public/src/**/*.hbs"]
    },
    build: {
        css: "public/build/css",
        js: "public/build/js",
        images: "images/build/",
        copy: {
            html: "public/build/",
            fonts: "public/build/fonts/",
            libs: "public/build/libs/"
        },
        templates: "public/build/templates/"
    },
    watch: {
        scss: "public/src/scss/**/*.scss"
    }
};

var adminPath = {
    src: {
        scss: ["admin_public/src/scss/main.scss"],
        mainjs: ["admin_public/src/js/main.js"],
        js: ["admin_public/src/js/**/*.js"],
        images: "images/src/**/*",
        copy: {
            html: [
                "admin_public/src/*.html",
                "admin_public/src/*.txt",
                "admin_public/src/*.jsp"
            ],
            fonts: ["admin_public/src/fonts/**/*"],
            libs: ["admin_public/src/libs/**/*"]
        },
        templates: ["admin_public/src/**/*.hbs"]
    },
    build: {
        css: "admin_public/build/css",
        js: "admin_public/build/js",
        images: "images/build/",
        copy: {
            html: "admin_public/build/",
            fonts: "admin_public/build/fonts/",
            libs: "admin_public/build/libs/"
        },
        templates: "admin_public/build/templates/"
    },
    watch: {
        scss: "admin_public/src/scss/**/*.scss"
    }
};

var buildTasks = ["scss:build", "js:build"];
var adminBuildTasks = ["admin:scss:build", "admin:js:build"];

gulp.task("scss:build", function () {
    gulp.src(path.src.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css));
});

gulp.task("admin:scss:build", function () {
    gulp.src(adminPath.src.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(adminPath.build.css));
});

gulp.task("js:build", function () {
    gulp.src(path.src.mainjs)
        .pipe(browserify({
            transform: 'hbsfy',
            debug: true
        }))
        .pipe(gulp.dest(path.build.js));
});

gulp.task("admin:js:build", function () {
    gulp.src(adminPath.src.mainjs)
        .pipe(browserify({
            transform: 'hbsfy',
            debug: true
        }))
        .pipe(gulp.dest(adminPath.build.js));
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

gulp.task("admin:clean", function () {
    return del(["admin_public/build/*"], {force: true});
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

for (var j in adminPath.src.copy) {
    if (adminPath.src.copy.hasOwnProperty(j)) {
        gulp.task('admin:copy_' + j, (function (i) {
            return function () {
                gulp.src(adminPath.src.copy[i])
                    .pipe(gulp.dest(adminPath.build.copy[i]));
            }
        })(j));
        buildTasks.push("admin:copy_" + j);
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

    for (var j in adminPath.src.copy) {
        if (adminPath.src.copy.hasOwnProperty(j)) {
            watch(adminPath.src.copy[j], (function (i) {
                return function (event, cb) {
                    gulp.start('admin:copy_' + i);
                }
            })(j));
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

    watch(adminPath.watch.scss, function (event, cb) {
        gulp.start('scss:build');
    });

    watch(adminPath.src.js, function (event, cb) {
        gulp.start('js:build');
    });

    watch(adminPath.src.templates, function (event, cb) {
        gulp.start('js:build');
    });

    watch(path.src.images, function (event, cb) {
        gulp.start('img:build');
    });
});

gulp.task('build', buildTasks);
gulp.task('admin:build', adminBuildTasks);
gulp.task('default', ["build", "admin:build", 'watch']);
