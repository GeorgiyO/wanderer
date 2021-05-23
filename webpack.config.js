const path = require("path");

require("webpack-dev-server")

const ROOT = path.resolve( __dirname, "src" );
const DESTINATION = path.resolve( __dirname, "public" );

module.exports = {
    context: ROOT,
    entry: {
        main: "./index.ts"
    },
    output: {
        filename: "bundle.js",
        path: DESTINATION,
        publicPath: "/public/"
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [
            __dirname,
            "node_modules"
        ]
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                use: "source-map-loader"
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: "awesome-typescript-loader",
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        port: 3000,
        open: true
    },
};

