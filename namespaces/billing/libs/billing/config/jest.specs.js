// eslint-disable-next-line import/no-extraneous-dependencies
const { getWorkspaceRoot } = require('@toptal/davinci-engine/src/utils')

const globalConfig = require('../../../../../config/jest.specs')

const billingLibPath = `${getWorkspaceRoot()}/namespaces/billing/libs/billing`

module.exports = {
  ...globalConfig,

  roots: ['<rootDir>', `${billingLibPath}/__mocks__`],
  setupFilesAfterEnv: [`${billingLibPath}/config/jest.specs.setupTests.js`],

  resetMocks: false,
  restoreMocks: false
}
