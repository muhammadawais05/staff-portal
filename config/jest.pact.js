// eslint-disable-next-line import/no-extraneous-dependencies
const { getWorkspaceRoot } = require('@toptal/davinci-engine/src/utils')

const jestConfig = require('./jest.specs.js')

module.exports = Object.assign({}, jestConfig, {
  testMatch: ['**/pact.test.ts', '**/*.pact.ts'],
  // TODO: Setup proper coverage
  collectCoverageFrom: ['src/**/pact.test.ts', 'src/**/*.pact.ts'],
  setupFilesAfterEnv: [
    ...jestConfig.setupFilesAfterEnv,
    `${getWorkspaceRoot()}/config/jest.pact.setupFilesAfterEnv.js`
  ]
})
