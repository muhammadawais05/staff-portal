import { getLintCommand } from '../commands/get-lint.js'
import { getTestCommand } from '../commands/get-test.js'
import { getPactCommand } from '../commands/get-pact.js'
import { getTypecheckCommand } from '../commands/get-typecheck.js'
import { getGenerateTypesCommand } from '../commands/get-generate-types.js'
import { getStorybookCommand } from '../commands/get-storybook.js'

export const commandsMapping = {
  typecheck: getTypecheckCommand,
  test: getTestCommand,
  pact: getPactCommand,
  lint: getLintCommand,
  'generate-types': getGenerateTypesCommand,
  storybook: getStorybookCommand
}
