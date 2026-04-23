const path = require('path')
const fs = require('fs-extra')

const updateEntries = packageJsonContent => {
  const { devDependencies, dependencies } = packageJsonContent

  const devDeps = {
    ...devDependencies,
    ...dependencies
  }

  const sortedDevDeps = Object.keys(devDeps)
    .sort()
    .reduce((obj, key) => {
      obj[key] = devDeps[key]

      return obj
    }, {})

  return {
    ...packageJsonContent,
    dependencies: {},
    devDependencies: sortedDevDeps
  }
}

const movePackageJsonDepsToDevDeps = (filePath = './package.json') => {
  // eslint-disable-next-line no-console
  console.log('Moving package.json dependencies to devDependencies')

  const packageJsonPath = path.resolve(filePath)
  const packageJsonContent = require(packageJsonPath)
  const content = updateEntries(packageJsonContent)

  fs.writeFileSync(packageJsonPath, JSON.stringify(content, null, 2) + '\n')
}

module.exports = {
  movePackageJsonDepsToDevDeps
}
