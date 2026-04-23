const path = require('path')
const fs = require('fs-extra')

/**
 *
 * @param {Record<string, any>} packageJsonContent
 * @param {string} entry
 * @param {string} types
 * @returns {Record<string, any> & {types: string, module: string, main: string}}
 */
const updateEntries = (packageJsonContent, entry, types) => {
  return {
    ...packageJsonContent,
    main: entry,
    module: entry,
    types
  }
}

/**
 *
 * @param {string} fromPackageJson
 * @param {string} toPackageJson
 * @param {string} entry
 * @param {string} types
 */
const copyPackageJson = ({
  from: fromPackageJson,
  to: toPackageJson,
  entry,
  types
}) => {
  // eslint-disable-next-line no-console
  console.log(`Copying package.json from: ${fromPackageJson}`)

  const fromPackageJsonPath = path.resolve(fromPackageJson)
  const fromPackageJsonContent = require(fromPackageJsonPath)

  const content = updateEntries(fromPackageJsonContent, entry, types)

  const outputPackageJson = path.resolve(toPackageJson)

  fs.writeFileSync(outputPackageJson, JSON.stringify(content, null, 2) + '\n')
}

module.exports = {
  copyPackageJson
}
