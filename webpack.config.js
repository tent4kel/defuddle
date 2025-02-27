const path = require('path');

const commonConfig = {
  mode: 'production',
  entry: './src/index.ts',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};

const browserConfig = {
  ...commonConfig,
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'defuddle.js',
    library: {
      name: 'Defuddle',
      type: 'umd',
      export: 'default'
    },
    globalObject: 'this'
  }
};

const nodeConfig = {
  ...commonConfig,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: {
      type: 'commonjs2'
    }
  }
};

module.exports = [nodeConfig, browserConfig]; 