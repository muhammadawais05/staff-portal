// eslint-disable-next-line @toptal/davinci/no-restricted-imports-monorepo
import { Configuration } from 'webpack-dev-server'

const config: Configuration = {
  allowedHosts: ['.toptal.net', '.toptal.rocks'],
  compress: true,
  historyApiFallback: {
    rewrites: [{ from: /^./, to: '/index.html' }]
  },
  host: '0.0.0.0',
  hot: true,
  https: process.env.HTTPS === 'true',
  open: false,
  overlay: true,
  port: process.env.HTTPS === 'true' ? 443 : 4015,
  stats: 'errors-only'
}

const CypressConfig: Configuration = {
  ...config,
  open: false,
  hot: false,
  proxy: {}
}

const devServerConfig = () => config

export { devServerConfig, CypressConfig }
