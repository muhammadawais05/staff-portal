import { ServerError } from '@apollo/client'
import { ErrorHandler } from '@apollo/client/link/error'
import { reportGraphqlNetworkError } from '@staff-portal/monitoring-service'

import { isAuthHttpErrorStatusCode } from '../apollo'
import { ApplicationOptions } from '../types'
import { handleUnauthenticatedRequest } from './handle-unauthenticated-request'

export const createApplicationNetworkErrorHandler =
  ({ appName, packageVersion }: ApplicationOptions): ErrorHandler =>
  errorResponse => {
    const { networkError, operation, response } = errorResponse

    if (!networkError) {
      return
    }

    const error = networkError as ServerError

    if (isAuthHttpErrorStatusCode(error.statusCode)) {
      return handleUnauthenticatedRequest()
    }

    reportGraphqlNetworkError({
      appName,
      packageVersion,
      error,
      operation,
      response
    })
  }
