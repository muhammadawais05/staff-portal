const webpackPreprocessor = require('@cypress/webpack-preprocessor')
// eslint-disable-next-line import/no-extraneous-dependencies
const { createWebpackConfig } = require('@toptal/davinci-engine')
const fs = require('fs')
const path = require('path')

process.env.NODE_ENV = 'test'

const webpackOptions = createWebpackConfig({
  webpackEnv: 'development',
  isSourceMapEnabled: true,
  watchOptions: {},
  isWorkspace: true,
  enableReactRefresh: false
})

const staffSchemaPath = path.resolve(
  __dirname,
  '../../../../tmp-graphql/gateway_schema.graphql'
)
const lensSchemaPath = path.resolve(
  __dirname,
  '../../../../tmp-graphql/lens_schema.graphql'
)

delete webpackOptions.optimization
delete webpackOptions.plugins
delete webpackOptions.entry

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  const staffSchema = fs.readFileSync(staffSchemaPath, 'utf8')
  const lensSchema = fs.readFileSync(lensSchemaPath, 'utf8')

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('file:preprocessor', webpackPreprocessor({ webpackOptions }))

  on('task', {
    readStaffSchema() {
      return staffSchema
    },
    readLensSchema() {
      return lensSchema
    }
  })

  const configPath = path.resolve(process.cwd(), 'cypress.json')
  const overrideConfig = fs.readFileSync(configPath, 'utf-8')

  config.env.coverage = process.env.CYPRESS_COVERAGE || false

  require('@cypress/code-coverage/task')(on, config)
  require('./parallel')(on, config)

  return { ...config, ...JSON.parse(overrideConfig) }
}
