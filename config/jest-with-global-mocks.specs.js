// eslint-disable-next-line import/no-extraneous-dependencies
const { getWorkspaceRoot } = require('@toptal/davinci-engine/src/utils')

const jestConfig = require('./jest.specs')

module.exports = {
  ...jestConfig,
  roots: ['<rootDir>', `${getWorkspaceRoot()}/__mocks__`]
}
