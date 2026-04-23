const globalConfigWithMocks = require('../../../../config/jest-with-global-mocks.specs.js')
// const coverageThreshold = require('../../coverage.js')
const excludeFiles = require('../_nyc/excludeFiles')

module.exports = {
  ...globalConfigWithMocks,

  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    ...excludeFiles.map(path => `!${path}`)
  ]
  // coverageThreshold,
}
