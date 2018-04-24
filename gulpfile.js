const gulp = require('gulp');

const util = require('gulp-util');
const del = require('del')
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const jade = require('gulp-pug');
const babel = require('gulp-babel');
const notify = require('gulp-notify');
const sass = require('gulp-sass');

const source = "source";
const build = "build";
const gulpSrcOptions = {base: source};

const paths = {
	sass: [`${source}/**/*.sass`, `${source}/**/*.scss`],
	pug: [`${source}/**/*.pug`, `${source}/**/*.jade`],
	babel: [`${source}/**/*.babel`]
};
paths.generic = [`${source}/**/*`];
for (group in paths) {
	if (group !== "generic") {
		for (path of paths[group]) {
			paths.generic.push('!' + path);
		}
	}
}

const handleError = function (error) {
	util.log(util.colors.red(error.message));
	this.emit('end');
}
gulp.task('default', ['sass', 'pug', 'babel', 'generic']);
gulp.task('sass', () => {
	return gulp.src(paths.sass, gulpSrcOptions)
		.pipe(sass())
		.on('error', handleError)
		.pipe(autoprefixer())
		.on('error', handleError)
		.pipe(gulp.dest(build))
		//.pipe(notify('<%= file.relative %>'));
});
gulp.task('pug', () => {
	return gulp.src(paths.pug, gulpSrcOptions)
		.pipe(pug())
		.on('error', handleError)
		.pipe(gulp.dest(build))
		//.pipe(notify('<%= file.relative %>'));
});
gulp.task('babel', () => {
	return gulp.src(paths.babel, gulpSrcOptions)
		.pipe(babel({
			presets: ['env']
		}))
		.on('error', handleError)
		.pipe(gulp.dest(build))
		//.pipe(notify('<%= file.relative %>'));
});
gulp.task('generic', () => {
	return gulp.src(paths.generic, gulpSrcOptions)
		.pipe(gulp.dest(build));
		// .pipe(notify('<%= file.relative %>'));
});

gulp.task('clean', () => {
	return del(`${build}/*`);
});

gulp.task('watch', () => {
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.pug, ['pug']);
	gulp.watch(paths.babel, ['babel']);
	gulp.watch(paths.generic, ['generic']);
});
