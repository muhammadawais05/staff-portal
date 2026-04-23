const path = require('path')
const fs = require('fs-extra')

const updateEntries = (packageJsonContent, version) => {
  return {
    ...packageJsonContent,
    version: version
  }
}

const bumpPackageJsonVersion = ({ filePath = './package.json', version }) => {
  // eslint-disable-next-line no-console
  console.log(`Updating package.json version: ${version}`)

  const packageJsonPath = path.resolve(filePath)
  const packageJsonContent = require(packageJsonPath)
  const content = updateEntries(packageJsonContent, version)

  fs.writeFileSync(packageJsonPath, JSON.stringify(content, null, 2) + '\n')
}

module.exports = {
  bumpPackageJsonVersion
}
