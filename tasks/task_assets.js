"use strict";

const Promise = require("bluebird");

module.exports = (gulp, config) => {
    gulp.task("copy-assets", () => {
        const folders = config.assets.copy.map(assetsToCopy => {
            return gulp.src(assetsToCopy.files)
            .pipe(gulp.dest(config.assets.outputDir + assetsToCopy.outputDir));
        });

        return Promise.all(folders);
    });
};