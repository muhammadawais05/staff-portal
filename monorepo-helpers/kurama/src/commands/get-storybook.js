import path from 'path'

import { workspaceRootPath, packagePath } from '../constants.js'
import { orderArguments } from '../services/order-arguments.js'

export const getStorybookCommand = () => {
  const { options } = orderArguments()

  const pathToStorybookScript = path.resolve(
    workspaceRootPath,
    '_scripts/run-storybooks.sh'
  )
  const relativePathToStorybookScript = path.relative(
    packagePath,
    pathToStorybookScript
  )

  // We have to use `exec` here, because otherwise we can't use our own script for storybook
  return ['exec', relativePathToStorybookScript, ...options]
}
