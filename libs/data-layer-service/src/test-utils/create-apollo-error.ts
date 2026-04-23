import { ApolloError } from '@apollo/client'
import { Maybe } from '@toptal/picasso/utils'
import { GraphQLError } from 'graphql'

import { GraphQLErrorCode } from '../types'

const createApolloError = (
  errorMessage: string,
  code: keyof typeof GraphQLErrorCode,
  path: Maybe<readonly (string | number)[]> = null
) =>
  new ApolloError({
    graphQLErrors: [
      new GraphQLError(errorMessage, null, null, null, path, null, {
        code
      })
    ],
    networkError: null,
    errorMessage,
    extraInfo: null
  })

export default createApolloError
