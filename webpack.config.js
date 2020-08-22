const path = require(`path`);
const publicPath = path.join(__dirname, `public`);

module.exports = {
  entry: `./src/index.tsx`,
  output: {
    filename: `bundle.js`,
    path: publicPath
  },
  devServer: {
    contentBase: publicPath,
    open: true,
    port: 1337,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`
        },
      }, {
        test: /\.(tsx|ts)$/,
        loader: "ts-loader"
      }
    ],
  },
  resolve: {
    extensions: [`.ts`, `.tsx`, `.js`, `json`]
  },
  devtool: `source-map`,
};