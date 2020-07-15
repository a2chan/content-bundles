'use strict'

let gulp = require('gulp')
let sass = require('gulp-sass')
let sourcemaps = require('gulp-sourcemaps')
let rename = require('gulp-rename')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')
var gulpif = require('gulp-if')

/**
 * Converting SCSS files into minfied, autoprefixed css file
 *
 * @param {minify} Boolean minify css file
 * @param {autoprefix} Boolean add autoprefix to css properties
 *
 */
function generateCSSFromSCSS({ minify = true, autoprefix = true }) {
	let postCSSPlugins = [autoprefixer()]
	return gulp
		.src('./styles/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: minify ? 'compressed' : 'expanded'
			}).on('error', sass.logError)
		)
		.pipe(gulpif(autoprefix, postcss(postCSSPlugins)))
		.pipe(
			rename(path => {
				path.extname = '.min.css'
			})
		)
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./styles/'))
}

/* gulp tasks */
gulp.task('sass', function() {
	return generateCSSFromSCSS({ minify: true, autoprefix: true })
})

gulp.task('sass:watch', function() {
	gulp.watch('./styles/**/*.scss', () =>
		generateCSSFromSCSS({ minify: false, autoprefix: false })
	)
})
