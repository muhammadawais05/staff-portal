import { ErrorHandler } from '@apollo/client/link/error'

import { ApplicationOptions } from '../types'
import { createApplicationGraphQLErrorHandler } from './create-application-graphql-error-handler'
import { createApplicationNetworkErrorHandler } from './create-application-network-error-handler'

export const createApplicationErrorHandlers = (
  options: ApplicationOptions
): ErrorHandler[] => [
  createApplicationGraphQLErrorHandler(options),
  createApplicationNetworkErrorHandler(options)
]
