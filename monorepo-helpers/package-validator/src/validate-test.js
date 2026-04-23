import { globby } from 'globby'

import { packageJson, packageLocation, workspaceRootPath } from './constants.js'

export const validateTest = async () => {
  const errors = []
  const jestConfigAbsolutePath = `${workspaceRootPath}/config/jest.specs.js`
  const { default: jestConfig } = await import(jestConfigAbsolutePath)

  const hasTestScript = packageJson.scripts && packageJson.scripts.test
  const testPaths = await globby(jestConfig.testMatch)

  if (!hasTestScript && testPaths.length) {
    errors.push(
      `- Test files found, but no \`test\` script specified in \`package.json\`
  Recommended script (${packageLocation}/package.json):
    "test": "kurama test"`
    )
  }

  return errors
}
