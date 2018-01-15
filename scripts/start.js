'use strict';

const path = require('path');
const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const RaxWebpackPlugin = require('rax-webpack-plugin');
const fs = require('fs');
const colors = require('chalk');

const app = express();
app.set('views', path.join(__dirname, './templates'));
app.set('view engine', 'xtpl');

const EXAMPLES_DIR = path.resolve(__dirname, '../examples');

function getEntry() {
  let entry = {};

  fs.readdirSync(EXAMPLES_DIR)
    .forEach(file => {
      let f = path.resolve(EXAMPLES_DIR, file);
      if (fs.lstatSync(f).isDirectory()) {
        fs.readdirSync(f).forEach((name) => {
          const demoFile = path.join(f, name);
          entry[`${file}.${path.basename(name, '.js')}.bundle`] = demoFile;
        });
      }
    });

  return entry;
}

const config = {
  target: 'node',
  // devtool: '#inline-source-map',
  entry: getEntry(),
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProgressPlugin(),
    new RaxWebpackPlugin({
      frameworkComment: true,
      platforms: []
    }),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['es2015', 'rax']
      }
    }]
  }
};

const compiler = webpack(config);

app.use('/examples/:name/:section', (req, res) => {
  const name = req.params.name;
  const section = req.params.section;

  res.render('index', {
    name, section
  });
});
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  public: '0.0.0.0',
  disableHostCheck: true,
  stats: {
    colors: true,
    chunks: false,
    errorDetails: true,
  }
}));

app.listen(9999, function() {
  console.log(colors.green('\n  Open http://localhost:9999/examples/ and select example\n'));
});
