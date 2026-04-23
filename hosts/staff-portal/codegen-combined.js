const path = require('path')
const fs = require('fs')
const execSync = require('child_process').execSync
const staffOperations = require('@staff-portal/graphql/operations-codegen.js')
const lensOperations = require('@staff-portal/graphql/lens-operations-codegen.js')

const sortedPackages = execSync(
  'yarn --silent --cwd=../.. lerna list --all --toposort --json --loglevel silent'
).toString()

const currentDir = process.cwd()

const packageLocations = JSON.parse(sortedPackages).map(package => {
  const location = path.relative(currentDir, package.location)

  return location === '' ? '.' : location
})

const packageWithCodegenLocations = packageLocations.filter(location => {
  const file = fs.readFileSync(`${location}/package.json`).toString()
  const packageJson = JSON.parse(file)

  return (
    packageJson && packageJson.scripts && packageJson.scripts['generate:types']
  )
})

module.exports = {
  ...staffOperations,
  generates: {
    'src/modules': {
      ...staffOperations.generates['src/modules'],
      documents: packageWithCodegenLocations.map(
        location => `${location}/src/**/*.staff.gql.ts`
      )
    },
    'src/lens': {
      ...lensOperations.generates['src/lens'],
      documents: packageWithCodegenLocations.map(
        location => `${location}/src/**/*.lens.gql.ts`
      )
    }
  }
}
