var webpack = require('webpack');
var bower_dir = __dirname + '/bower_components';

// definePlugin takes raw strings and inserts them, so you can put strings of JS if you want.
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

var config = {
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(new RegExp('^' + name + '$');
  },

  entry: {
    app: ['./app/main.js'],
    vendors: ['react']
    profile: ['./app/profile.js'],
    feed: ['./app/feed.js']
  },
  output: {
    path: './build',
    // publicPath: "/build/", //path that will be considered when requiring your files
    // publicPath: 'https://res.cloudinary.com/relay-foods/image/upload/v1422663845/', // This is used to generate URLs to e.g. images
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' },
      { test: /\.less$/, loader: 'style!css!less' }, // use ! to chain loaders
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(png|gif)$/, loader: 'url?limit=8192&minetype=image/png'}, // inline base64 URLs for <=8k images, direct URLs for the rest
      { test: /\.jpg/, loader: 'file' }
    ],
    noParse: []
  },
  resolve: {
    alias: {},
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.js', '.json', '.less']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};

config.addVendor('react', bower_dir + '/react/react.min.js');

module.exports = config;