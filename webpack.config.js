const path = require('path');

module.exports = {
  entry: './dist/jashmi.js',
  mode : 'development',
   
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
  	
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build/'),
    library: 'jashmi'
  },

   watchOptions: {
    poll: 1000
  }
};






