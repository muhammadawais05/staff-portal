import { useMemo } from 'react'
import { parse as parseGql } from 'graphql'
import { Operation } from '@staff-portal/graphql/staff'
import { ApolloError, useLazyQuery } from '@staff-portal/data-layer-service'

import { OperationType } from '../../types'

export interface GetLazyOperationQuery {
  node?: { operations?: { [key: string]: Operation } }
}

export type GetLazyOperationVariables = OperationType & {
  nodeId: string
}

export const makeGetLazyOperationQuery = ({
  nodeType,
  operationName
}: OperationType) =>
  // We need to dynamically compile the query since it's not static
  // `gql` tag is not an option since it's import will be removed at build time
  // by `babel-plugin-graphql-tag`
  parseGql(`
    query GetLazyOperation ($nodeId: ID!) {
      node(id: $nodeId) {
        ...on ${nodeType} {
          id
          operations {
            ${operationName} {
              callable
              messages
            }
          }
        }
      }
    }
  `)

export const useGetLazyOperation = (
  { nodeId, nodeType, operationName }: GetLazyOperationVariables,
  {
    onCompleted,
    onError
  }: {
    onCompleted: (data: GetLazyOperationQuery) => void
    onError: (error?: ApolloError) => void
  }
) => {
  const getLazyOperationQuery = useMemo(
    () =>
      makeGetLazyOperationQuery({ nodeType, operationName } as OperationType),
    [nodeType, operationName]
  )

  return useLazyQuery<GetLazyOperationQuery, { nodeId: string }>(
    getLazyOperationQuery,
    { variables: { nodeId }, fetchPolicy: 'network-only', onCompleted, onError }
  )
}
