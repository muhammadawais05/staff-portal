import {
  ApolloError,
  GraphQLErrorCode,
  isAuthorizationGqlError
} from '@staff-portal/data-layer-service'

const isAuthorizationError = (error: Error | ApolloError) => {
  if (!(error instanceof ApolloError)) {
    return false
  }

  const { graphQLErrors, networkError } = error

  return (
    networkError?.message === GraphQLErrorCode.UNAUTHORIZED ||
    graphQLErrors.some(isAuthorizationGqlError)
  )
}

export default isAuthorizationError
