import { print } from '@toptal/davinci-cli-shared'

import { orderArguments } from './order-arguments.js'
import { commandsMapping } from './commands-mapping.js'

export const validateCommand = () => {
  const { scriptName } = orderArguments()

  if (!commandsMapping[scriptName]) {
    const supportedCommands = Object.keys(commandsMapping)
      .map(command => `'${command}'`)
      .join(', ')

    print.red(`
      Script '${scriptName}' is not supported.
      List of available scripts: ${supportedCommands}"
    `)
    process.exit(1)
  }
}
