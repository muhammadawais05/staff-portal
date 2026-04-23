const webpack = require('webpack')
const path = require('path')

module.exports = function({ config }) {
  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /@testing-library.*/ }),
      new webpack.IgnorePlugin({ resourceRegExp: /@pact-foundation.*/ }),
      new webpack.IgnorePlugin({ resourceRegExp: /(.*|)test\.(ts|tsx)$/ })
    )
  }

  config.resolve.alias = {
    './lodash.min': 'lodash/lodash.js',
    '~': path.resolve(__dirname, './src'),
    'react-dom$': 'react-dom/profiling',
    'scheduler/tracing': 'scheduler/tracing-profiling'
  }

  config.module.rules.push({
    // Exclude all non-english locales from chrono-node
    test: /chrono-node\/dist\/locales\/(?!en).*/,
    use: 'null-loader'
  })

  config.optimization = {
    ...config.optimization,
    splitChunks: {
      ...config.optimization.splitChunks,
      cacheGroups: {
        ...config.optimization.splitChunks.cacheGroups,
        billingModules: {
          priority: 20,
          test: /[\\/]node_modules[\\/]@toptal[\\/]billing-frontend[\\/]src[\\/]modules/,
          name: module => {
            const moduleName = module.context.match(
              /[\\/]src[\\/]modules[\\/]([^\\/]+)([\\/]|$)/
            )[1]

            return `billing-${moduleName}`
          }
        }
      }
    }
  }

  // Disabling overlay so feature tests can pass
  config.devServer = {
    client: {
      overlay: false
    }
  }

  return config
}
