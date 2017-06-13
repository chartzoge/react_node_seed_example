"use strict";

const Promise = require("bluebird");
const _ = require("lodash");

const gulpWebpack = require("webpack-stream");
const webpack = require("webpack");
const named = require("vinyl-named");

const WEBPACK_CONFIG = require("../webpack.config.js");

module.exports = (gulp, config) => {
    const concatFiles = (runWatch) => {
        const bundleTaskPromises = config.bundle.files.map(file => {
            if (!file.buildOnWatch && runWatch) {
                return Promise.resolve();
            }

            gulp.appMessage("Running bundle: " + file.outputName);

            const webpackConfig = _.assign(WEBPACK_CONFIG, {
                output: {
                    filename: file.outputName
                },
                // we're using gulp watch so we can run the linter
                watch: false,
                externals: file.externals
            });

            return new Promise((resolve, reject) => {
                gulp.src(file.src)
                    .pipe(named())
                    .pipe(gulpWebpack(webpackConfig, webpack, (err) => {
                        if (!err) {
                            return;
                        }

                        gulp.gutil.PluginError("Webpack", err);
                    }))
                    .pipe(gulp.dest(config.bundle.outputDir))
                    .on("error", (err) => {
                        gulp.appErrorMessage(err);
                        reject(err);
                    })
                    .on("end", resolve);
            });
        });

        return Promise.all(bundleTaskPromises);
    };

    gulp.task("concat-files", () => concatFiles(false));

    gulp.task("concat-watch-files", () => {
        gulp.watch(config.bundle.watchFiles, ["lint", () => {
            concatFiles(true)
            .then(() => {
                gulp.appMessage("Rebundler done!");
            })
            .catch((err) => {
                gulp.appErrorMessage(err);
                throw err;
            });
        }]);
    });
};
