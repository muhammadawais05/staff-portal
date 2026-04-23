const HtmlWebpackPlugin = require('html-webpack-plugin')
const DefinePlugin = require('webpack').DefinePlugin
const tsResolver = require('resolve-ts-aliases')
const path = require('path')
const {
  getEnvVariables
// eslint-disable-next-line import/no-extraneous-dependencies
} = require('@toptal/davinci-engine/src/utils/get-env-variables')

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
)

const env = getEnvVariables({ dotenv: 'auto' })

const stringifiedEnv = {}

for (const key in env) {
  stringifiedEnv[key] = JSON.stringify(env[key])
}

module.exports = {
  watch: false,

  mode: 'development',

  output: {
    publicPath: '/'
  },

  devServer: {
    compress: true,
    hot: false,
    open: false,
    overlay: true,
    port: 3032,
    proxy: {},
    historyApiFallback: true,
    stats: 'errors-only'
  },

  devtool: 'cheap-module-source-map',

  entry: ['./src/index.cypress.tsx'],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        include: /node_modules/,
        test: /\.mjs$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false
        }
      },

      {
        exclude: /(node_modules)/,
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              envName: 'cypress'
            }
          }
        ]
      },
      {
        loader: 'pug-loader',
        test: /\.pug$/
      },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        loader: require.resolve('url-loader'),
        options: {
          limit: imageInlineSizeLimit,
          name: 'static/media/[name].[hash:8].[ext]'
        },
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './_pages/app.pug'),
      title: 'Toptal Billing Frontend'
    }),
    new DefinePlugin({ 'process.env': stringifiedEnv }),
    new DefinePlugin({
      'process.env.PLATFORM_URL': JSON.stringify(process.env.PLATFORM_URL)
    })
  ],

  resolve: {
    alias: tsResolver.resolveTsAliases(path.resolve('./tsconfig.json')),
    extensions: [
      '.js',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.gql',
      '.graphql',
      '.json'
    ],
    // Error: Can't resolve 'fs' in 'staff-portal/node_modules/node-email-reply-parser'
    fallback: {
      fs: false,
      path: 'path-browserify'
    }
  },
  target: 'web'
}
