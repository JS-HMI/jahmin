const path = require('path');

module.exports = {
  entry: './build/entry.js',
  //entry: './dist/jashmi.js',
  mode : 'production',
   
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  devtool : "inline-source-map",
  	
  /*output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build/'),
    library: 'jashmi'
  },*/
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build/'),
  },
  
   watchOptions: {
    poll: 1000
  }
};






