import { ApolloError } from '@apollo/client'

import { isInvalidArgumentSyntaxGqlError } from '../apollo/utils/check-gql-error-code'

export const filterInvalidArgumentSyntaxErrors = (error: ApolloError | undefined) => {
  if (!error) {
    return
  }
  const filteredError = { ...error }

  filteredError.graphQLErrors = error.graphQLErrors.filter(
    graphQLError => !isInvalidArgumentSyntaxGqlError(graphQLError)
  )

  if (filteredError.networkError || filteredError.graphQLErrors.length) {
    return new ApolloError(filteredError)
  }
}
