const gulp = require('gulp');
const mocha = require('gulp-mocha');

function unitTests () {
  gulp.src(['src/test/**/*.js'], {read: false})
		.pipe(mocha({reporter: 'list', exit: true}))
		.on('error', console.error);
}

module.exports = { default: unitTests };
