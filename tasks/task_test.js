"use strict";

const isparta = require("isparta");
const mocha = require("gulp-mocha");
const istanbul = require("gulp-istanbul");
const runSequence = require("run-sequence");

require("babel-core/register");

module.exports = (gulp, config) => {
    gulp.task("coverage:instrument", () => {
        return gulp.src(config.test.coverageFiles)
        .pipe(istanbul({
            includeUntested: true,
            instrumenter: isparta.Instrumenter
        }))
        .pipe(istanbul.hookRequire());
    });

    gulp.task("coverage:report", () => {
        return gulp.src(config.test.testFiles, { read: false })
        .pipe(istanbul.writeReports({
            reporters: ["lcov", "json", "text", "text-summary", "html", "cobertura"],
            reportOpts: {
                lcov: { dir: "./tests/reports/lcovonly" },
                json: { dir: "./tests/reports", file: "coverage.json" },
                cobertura: { dir: "./tests/reports", file: "coverage.xml" },
                html: { dir: "./tests/reports/html" }
            },
            dir: "./tests/reports"
        }));
    });

    gulp.task("client:test", () => {
        return gulp.src(config.test.testFiles)
        .pipe(mocha({
            reporter: "spec",
            compilers: ["js:babel-core/register"]
        }))
        .on("error", (err) => {
            gulp.appErrorMessage(err);
            throw err;
        });
    });

    gulp.task("test-client-coverage", (done) => {
        runSequence("coverage:instrument", "client:test", "coverage:report", done);
    });
};
