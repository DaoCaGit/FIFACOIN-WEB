var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀  
var fileinclude = require('gulp-file-include');
var rename = require('gulp-rename'); //重命名  
var cssnano = require('gulp-cssnano'); // css的层级压缩合并
var sass = require('gulp-sass'); //sass
var jshint = require('gulp-jshint'); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）  
var uglify = require('gulp-uglify'); //js压缩  
var gulpif = require('gulp-if'); // gulp排除文件的用法
var concat = require('gulp-concat'); //合并文件 
var useref = require('gulp-useref');
var path = require('path');
var imagemin = require('gulp-imagemin'); //图片压缩 
var Config = require('./gulpfile.config.js');
//======= gulp build 打包资源 ===============

var filterJs = function (f) {
    console.log(path.basename(f.path));
};

function prod() {
    /** 
     * HTML处理 
     */
    gulp.task('html', function () {
        return gulp.src(Config.html.src)
            .pipe(fileinclude({
                prefix: '@@', //变量前缀 @@include
                basepath: './src/_include', //引用文件路径
                indent: true //保留文件的缩进
            }))
            .pipe(useref())
            .pipe(gulp.dest(Config.html.dist));
    });
    /** 
     * assets文件夹下的所有文件处理 
     */
    gulp.task('assets', function () {
        return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist));
    });
    /** 
     * CSS样式处理 
     */
    gulp.task('css', function () {
        return gulp.src(Config.css.src).pipe(autoprefixer('last 2 version')).pipe(gulp.dest(Config.css.dist)).pipe(rename({
                suffix: '.min'
            })).pipe(cssnano()) //执行压缩  
            .pipe(gulp.dest(Config.css.dist));
    });
    /** 
     * SASS样式处理 
     */
    gulp.task('sass', function () {
        return gulp.src(Config.sass.src).pipe(autoprefixer('last 2 version')).pipe(sass()).pipe(gulp.dest(Config.sass.dist)).pipe(rename({
                suffix: '.min'
            })) //rename压缩后的文件名  
            .pipe(cssnano()) //执行压缩  
            .pipe(gulp.dest(Config.sass.dist));
    });
    /** 
     * js处理 
     */
    gulp.task('js', function () {
        return gulp.src([
                Config.js.dir + '/jquery1.12.4.min.js',
                Config.js.dir + '/bootstrap.min.js',
                Config.js.dir + '/client.js',
                Config.js.dir + '/countUp.min.js',
                Config.js.dir + '/slick.min.js',
                Config.js.dir + '/jquery.mCustomScrollbar.min.js',
                Config.js.dir + '/jquery.animateNumber.min.js'
            ])
            // .pipe(jshint('.jshintrc'))
            // .pipe(jshint.reporter('default'))
            // .pipe(gulp.dest(Config.js.dist))
            // .pipe(gulpif(filterJs, rename({suffix: '.min'})))
            // .pipe(gulpif(filterJs, uglify()))
            .pipe(gulp.dest(Config.js.dist));
    });

    /** 
     * 合并所有js文件并做压缩处理 
     */
    // gulp.task('js-concat', function () {
    //     return gulp.src(Config.js.src)
    //         .pipe(jshint('.jshintrc'))
    //         .pipe(jshint.reporter('default'))
    //         .pipe(concat(Config.js.build_name))
    //         .pipe(gulp.dest(Config.js.dist)).pipe(rename({suffix: '.min'}))
    //         .pipe(uglify()).pipe(gulp.dest(Config.js.dist));
    // });

    gulp.task('js-concat', function () {
        return gulp.src([
                Config.js.dir + '/app.js',
                Config.js.dir + '/dropdown.js',
                Config.js.dir + '/layer.js'
            ])
            .pipe(concat(Config.js.build_name))
            .pipe(gulp.dest(Config.js.dist))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify({
                preserveComments: 'some'
            }))
            .pipe(gulp.dest(Config.js.dist));
    });
    

    /** 
     * 图片处理 
     */
    gulp.task('images', function () {
        return gulp.src(Config.img.src).pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })).pipe(gulp.dest(Config.img.dist));
    });

    /**
     * 字体处理
     */
    gulp.task('font', function () {
        return gulp.src(Config.font.src)
            .pipe(gulp.dest(Config.font.dist));
    });

    //gulp.task('build', ['html', 'css', 'sass', 'js', 'js-concat', 'assets', 'images', 'font']);
    gulp.task('build', ['css', 'sass']);
}
module.exports = prod;