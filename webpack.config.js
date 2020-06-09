const path = require(`path`);
const publicPath = path.join(__dirname, `public`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `bundle.js`,
    path: publicPath
  },
  devServer: {
    contentBase: publicPath,
    open: true,
    port: 1337
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`
        },
      }
    ],
  },
  devtool: `source-map`,
};