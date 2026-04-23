import {
  ApolloError,
  GraphQLErrorCode,
  isInvalidArgumentSyntaxGqlError
} from '@staff-portal/data-layer-service'

const isInvalidArgumentSyntax = (error: Error | ApolloError) => {
  if (!(error instanceof ApolloError)) {
    return false
  }

  const { graphQLErrors, networkError } = error

  return (
    networkError?.message === GraphQLErrorCode.INVALID_ARGUMENT_SYNTAX ||
    graphQLErrors.some(isInvalidArgumentSyntaxGqlError)
  )
}

export default isInvalidArgumentSyntax
