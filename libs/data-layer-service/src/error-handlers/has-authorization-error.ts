import { ApolloError } from '@apollo/client'

import { isAuthorizationGqlError } from '../apollo/utils/check-gql-error-code'

export const hasAuthorizationError = (
  error: ApolloError | undefined,
  key: string
) => {
  return error?.graphQLErrors?.some(
    graphQLError =>
      isAuthorizationGqlError(graphQLError) && graphQLError.path?.includes(key)
  )
}
