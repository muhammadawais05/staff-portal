import { globby } from 'globby'

import { workspaceRootPath, packageLocation, packageJson } from './constants.js'

export const validatePact = async () => {
  const errors = []
  const pactConfigAbsolutePath = `${workspaceRootPath}/config/jest.pact.js`
  const { default: pactConfig } = await import(pactConfigAbsolutePath)

  const hasPactScripts = packageJson.scripts && packageJson.scripts.pact
  const pactPaths = await globby(pactConfig.testMatch)

  if (!hasPactScripts && pactPaths.length) {
    errors.push(
      `- Pact files found, but not all relevant \`pact\` scripts are specified in \`package.json\`
  Recommended script (${packageLocation}/package.json):
    "pact": "kurama pact"`
    )
  }

  return errors
}
