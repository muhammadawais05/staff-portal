// eslint-disable-next-line import/no-extraneous-dependencies
const defaultExclude = require('@istanbuljs/schema/default-exclude')

const appExcludeFiles = require('./config/_nyc/excludeFiles')

const excludes = [...defaultExclude, ...appExcludeFiles, 'cypress']

module.exports = {
  excludeAfterRemap: true,
  'temp-dir': './coverage/temp/',
  'report-dir': './coverage/cypress/',
  reporter: ['json', 'json-summary'],
  exclude: excludes
}
