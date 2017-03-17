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
      // Images
      {
        test   : /\.(png|jpg|jpeg|gif)$/,
        loader : 'url-loader',
        options: {
          limit: 8192
        }
      },
      // Fonts
      {
        test   : /\.woff(\?.+)?$/,
        loader : 'url-loader',
        options: {
          limit   : 10000,
          minetype: 'application/font-woff'
        }
      },
      {
        test   : /\.woff2$/,
        loader : 'url-loader',
        options: {
          limit   : 10000,
          minetype: 'application/font-woff2'
        }
      },
      {
        test   : /\.ttf(\?.+)?$/,
        loader : 'url-loader',
        options: {
          limit   : 10000,
          minetype: 'application/octet-stream'
        }
      },
      {
        test  : /\.eot(\?.+)?$/,
        loader: 'file-loader'
      },
      {
        test   : /\.svg(\?.+)?$/,
        loader : 'url-loader',
        options: {
          limit   : 10000,
          minetype: 'image/svg+xml'
        }
      },
      // JSON
      {
        test  : /\.json$/,
        loader: 'json-loader'
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
      },
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
