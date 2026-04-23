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
export type GetTransferQueryVariables = Types.Exact<{
  transferNodeId: Types.Scalars['ID']
}>

export type GetTransferQuery = { node?: Types.Maybe<TransferFragment> }

export const GetTransferDocument = gql`
  query GetTransfer($transferNodeId: ID!) {
    node(id: $transferNodeId) {
      ... on Transfer {
        ...TransferFragment
      }
    }
  }
  ${TransferFragmentDoc}
`

/**
 * __useGetTransferQuery__
 *
 * To run a query within a React component, call `useGetTransferQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransferQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransferQuery({
 *   variables: {
 *      transferNodeId: // value for 'transferNodeId'
 *   },
 * });
 */
export function useGetTransferQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetTransferQuery,
    GetTransferQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<GetTransferQuery, GetTransferQueryVariables>(
    GetTransferDocument,
    options
  )
}
export function useGetTransferLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetTransferQuery,
    GetTransferQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetTransferQuery,
    GetTransferQueryVariables
  >(GetTransferDocument, options)
}
export type GetTransferQueryHookResult = ReturnType<typeof useGetTransferQuery>
export type GetTransferLazyQueryHookResult = ReturnType<
  typeof useGetTransferLazyQuery
>
export type GetTransferQueryResult = Apollo.QueryResult<
  GetTransferQuery,
  GetTransferQueryVariables
>
