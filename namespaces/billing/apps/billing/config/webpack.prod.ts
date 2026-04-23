import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import SentryWebpackPlugin from '@sentry/webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
// eslint-disable-next-line @toptal/davinci/no-restricted-imports-monorepo
import path from 'path'
// eslint-disable-next-line import/no-extraneous-dependencies
import { getEnvVariables } from '@toptal/davinci-engine/src/utils/get-env-variables'

import baseConfig from './webpack.core'

const env = getEnvVariables({ dotenv: 'auto' }) as {
  DAVINCI_APP_NAME: string
  DAVINCI_RELEASE_VERSION: string
}

const prodWebpackConfig: Configuration = merge(baseConfig, {
  devtool: 'source-map',

  entry: {
    'index.pkg': './src/index-platform.pkg.tsx'
  },

  externals: {
    react: {
      amd: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      root: 'React'
    },
    'react-dom': {
      amd: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      root: 'ReactDOM'
    },
    '@topkit/router': '@topkit/router',
    '@toptal/staff-portal-message-bus': '@toptal/staff-portal-message-bus'
  },

  mode: 'production',

  optimization: {
    minimize: !process.env.enableMinification,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          safari10: true
        }
      })
    ]
  },

  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    // can be any random string https://github.com/webpack/webpack/issues/9766#issuecomment-537612694
    // happened after upgrade picasso to MUI 4.9.2
    path: path.resolve(__dirname, './../dist/platform')
  },

  plugins: [
    new SentryWebpackPlugin({
      dryRun: !process.env.SENTRY,
      include: 'dist/platform',
      release: `${env.DAVINCI_APP_NAME}@${env.DAVINCI_RELEASE_VERSION}`
    })
  ]
})

export default prodWebpackConfig
