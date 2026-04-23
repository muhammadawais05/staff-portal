import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { Configuration, DefinePlugin } from 'webpack'
import { resolveTsAliases } from 'resolve-ts-aliases'
// eslint-disable-next-line @toptal/davinci/no-restricted-imports-monorepo
import path from 'path'
// eslint-disable-next-line import/no-extraneous-dependencies
import { getEnvVariables } from '@toptal/davinci-engine/src/utils/get-env-variables'

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
)

const env = getEnvVariables({ dotenv: 'auto' })

const stringifiedEnv = {}

for (const key in env) {
  stringifiedEnv[key] = JSON.stringify(env[key])
}

const baseWebpackConfig: Configuration = {
  module: {
    rules: [
      {
        // Exclude all non-english locales from chrono-node
        test: /chrono-node\/dist\/locales\/(?!en).*/,
        use: 'null-loader'
      },
      {
        exclude: /node_modules\/(?!crypto-hash).*/,
        test: /\.(ts|tsx|js)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      // Was breaking the legacy build after upgrade to v5
      // See https://github.com/webpack/webpack/issues/11467#issuecomment-691873586
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
        test: /\.(graphql|gql)$/
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

  plugins: [new DefinePlugin({ 'process.env': stringifiedEnv })],

  resolve: {
    alias: resolveTsAliases(path.resolve('./tsconfig.json')),
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
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
  }
}

if (process.env.APP_ANALYZE) {
  baseWebpackConfig.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'gzip',
      generateStatsFile: true,
      logLevel: 'info',
      reportFilename: './generated/bundle_report.html'
    })
  )
}

export default baseWebpackConfig
