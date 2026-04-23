import { packageJson, packageLocation } from './constants.js'

export const validateLint = async () => {
  const errors = []
  const hasLintScript = packageJson.scripts && packageJson.scripts.lint

  if (!hasLintScript) {
    errors.push(
      `- No \`lint\` script specified in \`package.json\`
  Recommended scripts (${packageLocation}/package.json):
    "lint": "kurama lint`
    )
  }

  return errors
}
