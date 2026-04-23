import { runSync, print } from '@toptal/davinci-cli-shared'

import { orderArguments } from './order-arguments.js'
import { commandsMapping } from './commands-mapping.js'

export const runCommand = () => {
  const { scriptName } = orderArguments()
  const getCommand = commandsMapping[scriptName]

  print.green(`Running script "${scriptName}"...`)

  runSync('yarn', getCommand())
}
