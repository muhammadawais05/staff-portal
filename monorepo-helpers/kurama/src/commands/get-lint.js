import path from 'path'

import { workspaceRootPath, packagePath } from '../constants.js'
import { orderArguments } from '../services/order-arguments.js'

export const getLintCommand = () => {
  const { options } = orderArguments()
  const pathToTheLintScript = path.resolve(
    workspaceRootPath,
    '_scripts/run-package-lint.mjs'
  )
  const relativePathToLintScript = path.relative(
    packagePath,
    pathToTheLintScript
  )

  // We have to use `exec` here, because otherwise we can't use our own script for linting
  return ['exec', relativePathToLintScript, ...options]
}
