"use strict";

const eslint = require("gulp-eslint");

module.exports = (gulp, config) => {
    const runLinter = () => {
        return gulp.src(config.linting.sources)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    };

    gulp.task("lint", () => {
        return runLinter();
    });
};
