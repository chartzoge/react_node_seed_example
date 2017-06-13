"use strict";

const gulpHelp = require("gulp-help");
const gulpUtil = require("gulp-util");

module.exports = (gulp) => {
    gulpHelp(gulp, {
        description: "This task is what makes the 'tasks' command work"
    });

    ["task_stop", "task_start", "task_err"].forEach(event => {
        gulp.on(event, message => {
            gulpUtil.log(
                gulpUtil.colors.bold(event),
                message.task + ":",
                gulpUtil.colors.magenta(message.message));
        });
    });

    gulp.on("err", message => {
        message.err = message.err || new Error("Undefined error");

        gulpUtil.log(
            gulpUtil.colors.bold("err"),
            gulpUtil.colors.magenta(message.message),
            message.err, message.err.stack);
    });

    gulp.gutil = gulpUtil;
    gulp.colors = gulp.chalk = gulpUtil.colors;

    gulp.appMessage = (message) => {
        gulp.gutil.log(gulp.colors.white(message));
    };

    gulp.appErrorMessage = (message) => {
        gulp.gutil.log(gulp.colors.bold(gulp.colors.red(message)));
    };
};
