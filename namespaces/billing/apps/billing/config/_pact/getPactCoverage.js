const glob = require('glob')
const path = require('path')
const fs = require('fs')

glob('src/graphql/**/*.graphql', (err, files) => {
  if (err) {
    throw err
  }

  const queriesAndMutations = files.filter(
    fileName => !fileName.includes('generated/schema')
  )

  const coverage = queriesAndMutations.map(fileName => {
    const expectedPactFile = fileName.replace('.graphql', '.pact.ts')

    const baseName = path.basename(expectedPactFile)
    const dirName = path.dirname(expectedPactFile)
    const finalPath = path.join(dirName, baseName)

    const covered = fs.existsSync(finalPath)

    return { covered, fileName }
  })

  const allCovered = coverage
    .filter(queryFile => queryFile.covered)
    .map(queryFile => queryFile.fileName)

  // eslint-disable-next-line no-console
  console.log('Covered:')
  // eslint-disable-next-line no-console
  allCovered.forEach(file => console.log(' *', file))

  const missing = coverage
    .filter(queryFile => !queryFile.covered)
    .map(queryFile => queryFile.fileName)

  // eslint-disable-next-line no-console
  console.log('Missing:')
  // eslint-disable-next-line no-console
  missing.forEach(file => console.log(' *', file))
})
