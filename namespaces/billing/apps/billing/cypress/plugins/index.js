// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const webpackPreprocessor = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  const webpackOptions = require('../../config/webpack.cypress')

  // delete entire optimization object
  // so chunks optimization will be switched off.
  // required fo cypress to work with lazy components imports like in `ModalsState` component
  // taken from https://github.com/cypress-io/cypress/blob/master/npm/webpack-preprocessor/examples/react-app/cypress/plugins/index.js#L25
  delete webpackOptions.optimization
  delete webpackOptions.plugins

  let outputOptions = {}

  // fix incompatiblity with webpack 5 https://github.com/cypress-io/cypress/issues/8900#issuecomment-866897397
  Object.defineProperty(webpackOptions, 'output', {
    get: () => {
      return { ...outputOptions, publicPath: '/' }
    },
    set: function(options) {
      outputOptions = options
    }
  })

  const options = {
    webpackOptions,
    watchOptions: {}
  }

  on('file:preprocessor', webpackPreprocessor(options))

  config.env.coverage = process.env.CYPRESS_COVERAGE || false

  require('@cypress/code-coverage/task')(on, config)

  require('./parallel')(on, config)

  return config
}
