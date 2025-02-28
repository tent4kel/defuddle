const path = require('path');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    mode: argv.mode || 'production',
    entry: './src/index.ts',
    devtool: isDevelopment ? 'inline-source-map' : false,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      library: {
        name: 'Defuddle',
        type: 'umd'
      },
      globalObject: 'typeof self !== "undefined" ? self : this'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.json'
              }
            }
          ],
          exclude: /node_modules/
        }
      ]
    },
    optimization: {
      // Ensure consistent output in both dev and prod
      moduleIds: 'deterministic',
      // Disable eval
      minimize: !isDevelopment
    }
  };
}; 