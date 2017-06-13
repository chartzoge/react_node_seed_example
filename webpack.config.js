"use strict";

const path = require("path");

module.exports = {
    module: {
        rules: [{
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: "babel-loader"
            }
        }]
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            jQuery: path.resolve(__dirname, "node_modules/jquery/dist/jquery.js"),
            bootstrap: path.resolve(__dirname, "node_modules/bootstrap/dist/js/bootstrap.js")
        }
    }
};
