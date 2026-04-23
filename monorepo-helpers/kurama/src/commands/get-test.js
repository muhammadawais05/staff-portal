import path from 'path'

import { orderArguments } from '../services/order-arguments.js'
import {
  workspaceRootPath,
  jestConfigFileName,
  packagePath
} from '../constants.js'

export const getTestCommand = () => {
  const { options } = orderArguments()
  const isConfigProvided = options.some(option => option.startsWith('--config'))

  if (!isConfigProvided) {
    // It uses jest root config by default for every package.
    // If `--config path-to-custom-config.js` is provided, it will be used instead.
    const rootJestConfigPath = `${workspaceRootPath}/config/${jestConfigFileName}`
    const relativeJestConfigPath = path.relative(
      packagePath,
      rootJestConfigPath
    )

    options.push('--config', relativeJestConfigPath)
  }

  return ['davinci', 'qa', 'unit', ...options]
}
