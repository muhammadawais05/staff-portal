/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { MemorandumItemFragment } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/memorandumFragment.graphql.types'
import { gql } from '@apollo/client'
import { MemorandumItemFragmentDoc } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/memorandumFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetMemorandumQueryVariables = Types.Exact<{
  memorandumId: Types.Scalars['ID']
}>

export type GetMemorandumQuery = { node?: Types.Maybe<MemorandumItemFragment> }

export const GetMemorandumDocument = gql`
  query GetMemorandum($memorandumId: ID!) {
    node(id: $memorandumId) {
      ... on Memorandum {
        ...MemorandumItem
      }
    }
  }
  ${MemorandumItemFragmentDoc}
`

/**
 * __useGetMemorandumQuery__
 *
 * To run a query within a React component, call `useGetMemorandumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemorandumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemorandumQuery({
 *   variables: {
 *      memorandumId: // value for 'memorandumId'
 *   },
 * });
 */
export function useGetMemorandumQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetMemorandumQuery,
    GetMemorandumQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetMemorandumQuery,
    GetMemorandumQueryVariables
  >(GetMemorandumDocument, options)
}
export function useGetMemorandumLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMemorandumQuery,
    GetMemorandumQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetMemorandumQuery,
    GetMemorandumQueryVariables
  >(GetMemorandumDocument, options)
}
export type GetMemorandumQueryHookResult = ReturnType<
  typeof useGetMemorandumQuery
>
export type GetMemorandumLazyQueryHookResult = ReturnType<
  typeof useGetMemorandumLazyQuery
>
export type GetMemorandumQueryResult = Apollo.QueryResult<
  GetMemorandumQuery,
  GetMemorandumQueryVariables
>
