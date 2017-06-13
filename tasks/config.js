const path = require("path");
const CWD = process.cwd();

const BUILD_CONFIG = {
    serverWatch: [
        path.join(CWD, "server/**/*.*")
    ],
    linting: {
        sources: [
            path.join(CWD, "/client/**/*.js"),
            path.join(CWD, "/client/**/*.jsx"),
            path.join(CWD, "/tasks/**/*.js")
        ]
    },
    assets: {
        outputDir: path.join(CWD, "public"),
        copy: [{
            outputDir: "/fonts",
            files: [
                path.join(CWD, "node_modules/bootstrap/dist/fonts/*.*"),
                path.join(CWD, "node_modules/font-awesome/fonts/*.*")
            ]
        }]
    },
    styles: {
        outputDir: path.join(CWD, "public/css"),
        vendorFileName: "vendor.css",
        appFileName: "application.css",
        vendorFiles: [
            path.join(CWD, "node_modules/bootstrap/dist/css/bootstrap.css"),
            path.join(CWD, "node_modules/font-awesome/css/font-awesome.css")
        ],
        appFiles: [
            path.join(CWD, "/client/assets/css/**/*.css")
        ]
    },
    bundle: {
        outputDir: path.join(CWD, "public/js"),
        files: [{
            buildOnWatch: true,
            src: path.join(CWD, "/client/application.js"),
            outputName: "application.js"
        }],
        watchFiles: [
            path.join(CWD, "client/**/*.*")
        ]
    },
    test: {
        coverageFiles: [path.join(CWD, "client/**/*.js")],
        testFiles: path.join(CWD, "tests/**/*_spec.js")
    }
};

// named build steps. each key will run in sequence
// each key contains an array of gulp-tasks to run in parallel
// i.e. `npm run build dev` or `npm run build prod`
const BUILD_PHASES = {
    test: {
        client: {
            test: ["test-client"]
        }
    },
    build: {
        dev: {
            validate: ["lint"],
            bundle: ["concat-files", "bundle-css", "copy-assets"]
        },
        prod: {
            validate: ["lint"],
            bundle: ["concat-files", "bundle-css", "copy-assets"]
        }
    },
    server: {
        local: {
            validate: ["lint"],
            bundle: ["watch-server", "concat-watch-files", "css-watch", "copy-assets"]
        }
    }
};

module.exports = {
    BUILD_CONFIG: BUILD_CONFIG,
    BUILD_PHASES: BUILD_PHASES
};
