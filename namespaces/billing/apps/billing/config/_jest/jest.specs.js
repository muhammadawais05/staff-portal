const commonConfig = require('@staff-portal/billing/config/jest.specs')

const excludeFiles = require('../_nyc/excludeFiles')

module.exports = {
  ...commonConfig,
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    ...excludeFiles.map(path => `!${path}`)
  ]
}
