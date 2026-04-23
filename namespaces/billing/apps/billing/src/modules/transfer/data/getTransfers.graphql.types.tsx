/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { TransferFragment } from '../../__fragments__/transferFragment.graphql.types'
import { gql } from '@apollo/client'
import { TransferFragmentDoc } from '../../__fragments__/transferFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetTransfersQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID']
}>

export type GetTransfersQuery = {
  node?: Types.Maybe<
    | { id: string; transfers: { nodes: Array<TransferFragment> } }
    | { id: string; transfers: { nodes: Array<TransferFragment> } }
  >
}

export const GetTransfersDocument = gql`
  query GetTransfers($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Invoice {
        id
        transfers {
          nodes {
            ...TransferFragment
          }
        }
      }
      ... on Payment {
        id
        transfers {
          nodes {
            ...TransferFragment
          }
        }
      }
    }
  }
  ${TransferFragmentDoc}
`

/**
 * __useGetTransfersQuery__
 *
 * To run a query within a React component, call `useGetTransfersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransfersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransfersQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetTransfersQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetTransfersQuery,
    GetTransfersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetTransfersQuery,
    GetTransfersQueryVariables
  >(GetTransfersDocument, options)
}
export function useGetTransfersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetTransfersQuery,
    GetTransfersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetTransfersQuery,
    GetTransfersQueryVariables
  >(GetTransfersDocument, options)
}
export type GetTransfersQueryHookResult = ReturnType<
  typeof useGetTransfersQuery
>
export type GetTransfersLazyQueryHookResult = ReturnType<
  typeof useGetTransfersLazyQuery
>
export type GetTransfersQueryResult = Apollo.QueryResult<
  GetTransfersQuery,
  GetTransfersQueryVariables
>
