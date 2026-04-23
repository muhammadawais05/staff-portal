import { Observable } from '@apollo/client'
import { ErrorHandler } from '@apollo/client/link/error'
import { GraphQLError } from 'graphql'
// TODO: remove cross-lib references https://toptal-core.atlassian.net/browse/SPB-2526
import { reportGraphqlErrors } from '@staff-portal/monitoring-service'

import {
  GraphQLErrorCode,
  isInvalidArgumentSyntaxGqlError,
  isAuthorizationGqlError,
  isEmptyGqlError
} from '../apollo'
import {
  handleTosNotAcceptedRequest,
  handleUnauthenticatedRequest,
  handleUnauthorizedPortalRequest
} from '../error-handlers'
import { hasGqlErrorCode, isUploadLimitExceedError } from '../apollo/utils'
import { ApplicationOptions } from '../types'

const getCriticalErrorHandler = (errors: readonly GraphQLError[] = []) => {
  if (hasGqlErrorCode(errors, GraphQLErrorCode.UNAUTHENTICATED)) {
    return handleUnauthenticatedRequest
  }

  if (hasGqlErrorCode(errors, GraphQLErrorCode.UNAUTHORIZED_PORTAL)) {
    return handleUnauthorizedPortalRequest
  }

  if (hasGqlErrorCode(errors, GraphQLErrorCode.TOS_UNACCEPTED)) {
    return handleTosNotAcceptedRequest
  }
}

const filterUnhandledErrors = (errors: readonly GraphQLError[]) =>
  errors.filter(
    error =>
      !isAuthorizationGqlError(error) &&
      !isEmptyGqlError(error) &&
      !isInvalidArgumentSyntaxGqlError(error) &&
      !isUploadLimitExceedError(error)
  )

export const createApplicationGraphQLErrorHandler =
  ({ appName, packageVersion }: ApplicationOptions): ErrorHandler =>
  errorResponse => {
    const {
      operation,
      response: { errors = [] as readonly GraphQLError[] } = {}
    } = errorResponse

    if (!errors?.length) {
      return
    }

    const criticalErrorHandler = getCriticalErrorHandler(errors)

    if (criticalErrorHandler) {
      return new Observable(() => {
        criticalErrorHandler()
      })
    }

    const unhandledErrors = filterUnhandledErrors(errors)

    if (!unhandledErrors.length) {
      return
    }

    // TODO: move this report to ModuleErrorBoundary
    // current stuck is `appName` and `packageVersion` specific props, that are passed from outside
    reportGraphqlErrors({
      appName,
      packageVersion,
      errors: unhandledErrors,
      operation
    })
  }
