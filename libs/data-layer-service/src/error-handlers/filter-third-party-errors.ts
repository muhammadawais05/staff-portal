import { ApolloError } from '@apollo/client'

import { checkGqlErrorCode } from '../apollo/utils'
import { GraphQLErrorCode } from '../types'

export const filterThirdPartyErrors = (error: ApolloError | undefined) => {
  if (!error) {
    return
  }

  const filteredError = { ...error }

  filteredError.graphQLErrors = error.graphQLErrors.filter(
    graphQLError =>
      !checkGqlErrorCode(
        GraphQLErrorCode.THIRD_PARTY_SERVICE_ERROR,
        graphQLError
      )
  )

  if (filteredError.networkError || filteredError.graphQLErrors.length) {
    return new ApolloError(filteredError)
  }
}
