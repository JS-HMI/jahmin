const path = require('path');

module.exports = {
  entry: './src/jashmi.ts',
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
    path: path.resolve(__dirname, 'build/')
  },

   watchOptions: {
    poll: 1000
  }
};






