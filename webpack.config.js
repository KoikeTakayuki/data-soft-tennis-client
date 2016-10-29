module.exports = {
  context: __dirname + "/source",
  entry: {
    jsx: "./index.jsx",
    css: "./main.css",
    html: "./index.html",
  },

  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  module: {
    preLoaders: [
        //Eslint loader
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "eslint-loader"},
    ],
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]" },
      { test: /\.css$/, loader: "file?name=[name].[ext]" },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ["react-hot","babel-loader?stage=0&optional=runtime"]},
      { test: /\.(jpg|jpeg|gif|png)$/, exclude: /node_modules/, loader:'url-loader?limit=1024&name=images/[name].[ext]'},
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  eslint: {
    configFile: './.eslintrc'
  },
};