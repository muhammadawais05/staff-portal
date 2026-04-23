import { globby } from 'globby'
import path from 'path'
import fs from 'fs'

import {
  workspaceRootPath,
  packagePath,
  packageLocation,
  packageJson
} from './constants.js'

export const validateTypecheck = async () => {
  const errors = []
  const hasTypecheckScript =
    packageJson.scripts && packageJson.scripts.typecheck
  const tsFilePaths = await globby(['src/**/*.ts', 'src/**/*.tsx'])

  if (!tsFilePaths.length) {
    return errors
  }

  if (!hasTypecheckScript) {
    errors.push(
      `- Typescipt files found, but no \`typecheck\` script specified in \`package.json\`
  Recommended script (${packageLocation}/package.json):
    "typecheck": "kurama typecheck"`
    )
  }

  const tsConfigPath = `${packagePath}/tsconfig.json`
  const globalTsConfigPath = path.relative(
    packagePath,
    `${workspaceRootPath}/tsconfig`
  )
  const globalTypesPath = path.relative(
    packagePath,
    `${workspaceRootPath}/@types`
  )

  if (!fs.existsSync(tsConfigPath)) {
    errors.push(
      `- No \`tsconfig.json\` file specified
  Recommended content (${packageLocation}/tsconfig.json):
    {
      "extends": "${globalTsConfigPath}",
      "include": ["${globalTypesPath}/**/*", "src/**/*"]
    }`
    )
  }

  return errors
}
