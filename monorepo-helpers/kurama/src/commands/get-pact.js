import path from 'path'

import { orderArguments } from '../services/order-arguments.js'
import {
  workspaceRootPath,
  pactConfigFileName,
  packagePath
} from '../constants.js'

export const getPactCommand = () => {
  const { options } = orderArguments()
  const isConfigProvided = options.some(option => option.startsWith('--config'))

  if (!isConfigProvided) {
    // It uses jest.pact.js root config by default for every package.
    // If `--config path-to-custom-config.js` is provided, it will be used instead.
    const rootPactConfigPath = `${workspaceRootPath}/config/${pactConfigFileName}`
    const relativePactConfigPath = path.relative(
      packagePath,
      rootPactConfigPath
    )

    options.push('--config', relativePactConfigPath)
  }

  return ['davinci', 'qa', 'unit', ...options, '--runInBand', 'true']
}
