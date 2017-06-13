"use strict";

const path = require("path");
const glob = require("glob");
const gulp = require("gulp");
const runSequence = require("run-sequence");
const CWD = process.cwd();

const CONFIG = require("./config");
const BUILD_CONFIG = CONFIG.BUILD_CONFIG;
const BUILD_PHASES = CONFIG.BUILD_PHASES;

const args = require("./util/arguments")(process);
require("./util/gulp_setup")(gulp);

gulp.appMessage("Running Gulp Tasks...");

const runSingleTask = args[0] === "run";
const parentBuildSteps = BUILD_PHASES[args[0]];

if (!parentBuildSteps && !runSingleTask) {
    throw new Error(`Incorrect arguments passed: ${args}. Valid targets: build, run`);
}

glob("**/task_*.js", {
    root: "/tasks"
}, (err, files) => {
    files.forEach(file => {
        gulp.appMessage(`Loaded task file - ${file}`);

        require(path.join(CWD, file))(gulp, BUILD_CONFIG);
    });

    if (runSingleTask) {
        gulp.appMessage(`Running single gulp task ${args[1]}`);
        return runSequence(args[1]);
    }

    const buildSteps = parentBuildSteps[args[1]];
    const phases = [];
    Object.keys(buildSteps).forEach((phase) => {
        gulp.appMessage(`Running phase - ${phase} - ${buildSteps[phase]}`);

        phases.push(buildSteps[phase]);
    });

    runSequence.apply(null, phases);
});
