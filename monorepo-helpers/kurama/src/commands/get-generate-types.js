import { orderArguments } from '../services/order-arguments.js'
import { gqlFilesWatchPattern } from '../constants.js'

export const getGenerateTypesCommand = () => {
  const { options } = orderArguments()
  const modifiedOptions = [...options]
  // If just `--watch` is passed, it will add gql watch pattern automatically
  const shouldIncludeWatchPattern = options.includes('--watch')

  if (shouldIncludeWatchPattern) {
    const watchIndex = options.indexOf('--watch')

    modifiedOptions.splice(watchIndex + 1, 0, `"${gqlFilesWatchPattern}"`)
  }

  return ['graphql-codegen', ...modifiedOptions]
}
