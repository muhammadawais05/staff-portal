const noop = require('lodash/noop')

const { copyPackageJson } = require('./copy-package-json')
const { bumpPackageJsonVersion } = require('./bump-package-json')
const { updatePackageJsonProperty } = require('./update-package-json-property')
const {
  movePackageJsonDepsToDevDeps
} = require('./move-package-json-deps-to-devdeps')

module.exports = {
  bumpPackageJsonVersion,
  copyPackageJson,
  movePackageJsonDepsToDevDeps,
  updatePackageJsonProperty,
  log: noop
}
