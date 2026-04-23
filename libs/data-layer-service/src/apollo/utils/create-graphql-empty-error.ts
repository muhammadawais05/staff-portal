import { GraphQLError } from 'graphql'

import { GraphQLErrorCode } from '../enums/GraphQLErrorCode'

export const createGraphqlEmptyError = (
  errorMessage: string = GraphQLErrorCode.EMPTY
) =>
  new GraphQLError(
    errorMessage,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    { code: GraphQLErrorCode.EMPTY }
  )
