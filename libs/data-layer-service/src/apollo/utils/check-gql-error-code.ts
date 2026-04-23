import { GraphQLError } from 'graphql'

import { GraphQLErrorCode } from '../enums'

export const checkGqlErrorCode = (
  errorCode: GraphQLErrorCode,
  { extensions }: GraphQLError
) => extensions?.code === errorCode

export const hasGqlErrorCode = (
  errors: readonly GraphQLError[],
  errorCode: GraphQLErrorCode
) => errors.some(checkGqlErrorCode.bind(null, errorCode))

export const isAuthenticationGqlError = checkGqlErrorCode.bind(
  null,
  GraphQLErrorCode.UNAUTHENTICATED
)
export const isAuthorizationGqlError = checkGqlErrorCode.bind(
  null,
  GraphQLErrorCode.UNAUTHORIZED
)

export const isEmptyGqlError = checkGqlErrorCode.bind(
  null,
  GraphQLErrorCode.EMPTY
)

export const isInvalidArgumentGqlError = checkGqlErrorCode.bind(
  null,
  GraphQLErrorCode.INVALID_ARGUMENT
)

export const isInvalidArgumentSyntaxGqlError = checkGqlErrorCode.bind(
  null,
  GraphQLErrorCode.INVALID_ARGUMENT_SYNTAX
)

export const isUploadLimitExceedError = checkGqlErrorCode.bind(
  null,
  GraphQLErrorCode.UPLOAD_LIMIT_EXCEEDED
)
