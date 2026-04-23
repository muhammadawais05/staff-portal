import { globby } from 'globby'

import { packageJson, packageLocation } from './constants.js'

export const validateStorybook = async () => {
  const errors = []

  const hasTestScript = packageJson.scripts && packageJson.scripts.storybook
  const testPaths = await globby('**/*.stories.*')

  if (!hasTestScript && testPaths.length) {
    errors.push(
      `- Stories found, but no \`storybook\` script specified in \`package.json\`
  Recommended script (${packageLocation}/package.json):
    "test": "kurama storybook"`
    )
  }

  return errors
}
