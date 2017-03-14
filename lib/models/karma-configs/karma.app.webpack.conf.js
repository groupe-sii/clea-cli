const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: [ '.ts', '.js' ]
  },

  module: {
    rules: [
      // Typescript files
      {
        test: /\.tsx?$/,
        use : [
          {
            loader: 'ng-annotate-loader'
          },
          {
            loader : 'ts-loader',
            options: {
              silent: true
            }
          }
        ]
      },
      // Angular templates
      {
        test  : /\.html$/,
        loader: 'raw-loader'
      },
      // CSS Stylesheets
      {
        test: /\.css$/,
        use : [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      // SASS Stylesheets
      {
        test: /\.scss$/,
        use : [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },

  devtool: 'inline-source-map',

  plugins: [
    new webpack.DefinePlugin({
      ENV   : JSON.stringify('TEST'),
      CONFIG: JSON.stringify({})
    })
  ]
};
