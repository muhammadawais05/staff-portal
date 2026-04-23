const path = require('path')
// eslint-disable-next-line import/no-extraneous-dependencies
const davinciJestConfig = require('@toptal/davinci-qa/src/configs/jest.config.js')
// eslint-disable-next-line import/no-extraneous-dependencies
const { getWorkspaceRoot } = require('@toptal/davinci-engine/src/utils')

module.exports = {
  ...davinciJestConfig,
  coverageReporters: ['json'],
  testMatch: [...davinciJestConfig.testMatch, '!**/pact.test.ts'],
  moduleNameMapper: {
    ...davinciJestConfig.moduleNameMapper,
    '^lodash-es$': 'lodash'
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': path.join(__dirname, './babel-preprocessor.js')
  },
  setupFilesAfterEnv: [
    ...davinciJestConfig.setupFilesAfterEnv,
    `${getWorkspaceRoot()}/config/jest.specs.setupFilesAfterEnv.js`
  ],
  verbose: false
}
