import { globby } from 'globby'
import fs from 'fs'

import { packagePath, packageLocation, packageJson } from './constants.js'

export const validateTypesGeneration = async () => {
  const errors = []
  const hasTypesGenerationScript =
    packageJson.scripts &&
    packageJson.scripts['generate:types'] &&
    packageJson.scripts['generate:types:watch']

  const gqlFilePaths = await globby(['src/**/*.gql.ts', 'src/**/*.graphql.ts'])

  if (!gqlFilePaths.length) {
    return errors
  }

  if (!hasTypesGenerationScript) {
    errors.push(
      `- GQL operation files found, but not all relevant scripts specified in \`package.json\`
  Recommended scripts (${packageLocation}/package.json):
    "generate:types": "kurama generate-types",
    "generate:types:watch": "kurama generate-types --watch"`
    )
  }

  const codegenJsPath = `${packagePath}/codegen.js`

  if (!fs.existsSync(codegenJsPath)) {
    errors.push(
      `- GQL operation files found, but no \`codegen.js\` file specified
  Recommended content (${packageLocation}/codegen.js):
    module.exports = require('@staff-portal/graphql/operations-codegen.js')`
    )
  }

  return errors
}
