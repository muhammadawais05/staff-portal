import {
  ApolloError,
  GraphQLErrorCode,
  isEmptyGqlError
} from '@staff-portal/data-layer-service'

const isNotFoundError = (error: Error | ApolloError) => {
  if (!(error instanceof ApolloError)) {
    return false
  }

  const { graphQLErrors, networkError } = error

  return (
    networkError?.message === GraphQLErrorCode.EMPTY ||
    graphQLErrors.some(isEmptyGqlError)
  )
}

export default isNotFoundError
