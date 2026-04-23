import { ApolloError } from '@apollo/client'

import { isAuthorizationGqlError } from '../apollo/utils/check-gql-error-code'

export const filterUnauthorizedErrors = (error: ApolloError | undefined) => {
  if (!error) {
    return
  }
  const filteredError = { ...error }

  filteredError.graphQLErrors = error.graphQLErrors.filter(
    graphQLError => !isAuthorizationGqlError(graphQLError)
  )

  if (filteredError.networkError || filteredError.graphQLErrors.length) {
    return new ApolloError(filteredError)
  }
}
