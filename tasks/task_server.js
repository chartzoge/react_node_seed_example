"use strict";

const spawn = require("child_process").spawn;

module.exports = (gulp, config) => {
    let node = null;

    gulp.task("server-run", () => {
        gulp.appMessage("Running server");

        if (node) {
            node.kill();
        }

        node = spawn("node", ["server"], {
            stdio: "inherit"
        });

        node.on("close", (code) => {
            if (code === 8) {
                gulp.appErrorMessage("Error detected. Waiting for changes...");
            }

            gulp.appMessage("Closing node");
        });
    });

    gulp.task("watch-server", () => {
        gulp.run("server-run");

        gulp.watch(config.serverWatch, () => {
            gulp.run("server-run");
        });
    });

    process.on("exit", () => {
        gulp.appMessage("Exiting...");

        if (node) {
            node.kill();
        }
    });
};
