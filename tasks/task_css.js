"use strict";

const concat = require("gulp-concat");

module.exports = (gulp, config) => {

    const bundleVendor = () => {
        return gulp.src(config.styles.vendorFiles)
        .pipe(concat(config.styles.vendorFileName))
        .pipe(gulp.dest(config.styles.outputDir));
    };

    const bundleApp = () => {
        return gulp.src(config.styles.appFiles)
        .pipe(concat(config.styles.appFileName))
        .pipe(gulp.dest(config.styles.outputDir));
    };

    gulp.task("bundle-css-app", bundleApp);
    gulp.task("bundle-vendor-css", bundleVendor);

    gulp.task("bundle-css", ["bundle-css-app", "bundle-vendor-css"]);

    gulp.task("css-watch", () => {
        gulp.run("bundle-css");

        gulp.appMessage("Watching for style changes...");
        gulp.watch(config.styles.appFiles, () => {

            gulp.appMessage("Rebundling css...");
            bundleApp().on("end", () => gulp.appMessage("css rebundled"));
        });
    });
};
