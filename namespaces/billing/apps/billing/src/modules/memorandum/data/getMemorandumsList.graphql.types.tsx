/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { MemorandumListItemFragment } from '../../__fragments__/memorandumListItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { MemorandumListItemFragmentDoc } from '../../__fragments__/memorandumListItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetMemorandumsListQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.MemorandumsFilter
}>

export type GetMemorandumsListQuery = {
  memorandums?: Types.Maybe<{
    totalCount: number
    nodes: Array<MemorandumListItemFragment>
  }>
}

export const GetMemorandumsListDocument = gql`
  query GetMemorandumsList(
    $pagination: OffsetPagination!
    $filter: MemorandumsFilter!
  ) {
    memorandums: memorandumsNullable(filter: $filter, pagination: $pagination) {
      totalCount
      nodes {
        ...MemorandumListItemFragment
      }
    }
  }
  ${MemorandumListItemFragmentDoc}
`

/**
 * __useGetMemorandumsListQuery__
 *
 * To run a query within a React component, call `useGetMemorandumsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemorandumsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemorandumsListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetMemorandumsListQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetMemorandumsListQuery,
    GetMemorandumsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetMemorandumsListQuery,
    GetMemorandumsListQueryVariables
  >(GetMemorandumsListDocument, options)
}
export function useGetMemorandumsListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMemorandumsListQuery,
    GetMemorandumsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetMemorandumsListQuery,
    GetMemorandumsListQueryVariables
  >(GetMemorandumsListDocument, options)
}
export type GetMemorandumsListQueryHookResult = ReturnType<
  typeof useGetMemorandumsListQuery
>
export type GetMemorandumsListLazyQueryHookResult = ReturnType<
  typeof useGetMemorandumsListLazyQuery
>
export type GetMemorandumsListQueryResult = Apollo.QueryResult<
  GetMemorandumsListQuery,
  GetMemorandumsListQueryVariables
>
