import { Configuration } from 'webpack'
import { smart } from 'webpack-merge'

import { devServerConfig } from './_plugins/dev-server.plugin'
import baseConfig from './webpack.core'

const developmentConfig: Configuration = smart(baseConfig, {
  devServer: devServerConfig(),
  entry: ['./src/index.staff-portal.ts']
})

export default developmentConfig
