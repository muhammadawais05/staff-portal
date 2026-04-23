import { ApolloError } from '@apollo/client'

import { GraphQLErrorCode } from '../enums'
import { checkGqlErrorCode } from './check-gql-error-code'

export const checkIfFieldIsForbidden = (
  fieldName: string,
  error?: ApolloError
) =>
  error?.graphQLErrors.some(graphQLError => {
    const isUNAUTHORIZED = checkGqlErrorCode(
      GraphQLErrorCode.UNAUTHORIZED,
      graphQLError
    )
    const path = graphQLError.path || []
    const lastIndex = path.length - 1

    return isUNAUTHORIZED && path[lastIndex] === fieldName
  })
