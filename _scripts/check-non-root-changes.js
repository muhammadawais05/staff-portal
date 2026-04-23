// The script is used check if there is any changes in root files
// to decide whether to rerun jest or lint for all packages instead
// of only changed ones

const { execSync } = require('child_process')

const changedFilesCommand = `git diff --name-only origin/master`

const result = execSync(changedFilesCommand)
const listOfChangedFiles = result.toString().split('\n').filter(Boolean)

const rootChangedFiles = listOfChangedFiles.filter(filePath => {
  // Any change that is not in these folders will be considered
  // as root change and should trigger lint and jest for all packages
  const baseFolders = ['libs', 'namespaces', 'hosts']

  return baseFolders.every(folderName => !filePath.startsWith(`${folderName}/`))
})

console.log(rootChangedFiles)

process.exit(rootChangedFiles.length ? 1 : 0)
