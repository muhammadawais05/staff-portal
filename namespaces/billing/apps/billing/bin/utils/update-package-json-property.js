const path = require('path')
const fs = require('fs-extra')

const updatePackageJsonProperty = ({
  filePath = './package.json',
  key,
  value
}) => {
  // eslint-disable-next-line no-console
  console.log(`Updating package.json property: ${key} to ${value}`)

  if (!key) {
    console.warn('updatePackageJsonProperty: Missing `key` property, aborting')

    return
  }

  const packageJsonPath = path.resolve(filePath)
  const packageJsonContent = require(packageJsonPath)
  const content = {
    ...packageJsonContent,
    [key]: value
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(content, null, 2) + '\n')
}

module.exports = {
  updatePackageJsonProperty
}
