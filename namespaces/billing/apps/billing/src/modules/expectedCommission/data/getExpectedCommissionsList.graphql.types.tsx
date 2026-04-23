/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { ExpectedCommissionFragment } from '../../__fragments__/expectedCommissionFragment.graphql.types'
import { gql } from '@apollo/client'
import { ExpectedCommissionFragmentDoc } from '../../__fragments__/expectedCommissionFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetExpectedCommissionsListQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.ExpectedCommissionsFilter
}>

export type GetExpectedCommissionsListQuery = {
  expectedCommissions?: Types.Maybe<{
    totalCount: number
    groups: Array<{
      month: number
      year: number
      expectedCommissions: Array<ExpectedCommissionFragment>
    }>
  }>
}

export const GetExpectedCommissionsListDocument = gql`
  query GetExpectedCommissionsList(
    $pagination: OffsetPagination!
    $filter: ExpectedCommissionsFilter!
  ) {
    expectedCommissions(pagination: $pagination, filter: $filter) {
      totalCount
      groups {
        month
        year
        expectedCommissions {
          ...ExpectedCommissionFragment
        }
      }
    }
  }
  ${ExpectedCommissionFragmentDoc}
`

/**
 * __useGetExpectedCommissionsListQuery__
 *
 * To run a query within a React component, call `useGetExpectedCommissionsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpectedCommissionsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpectedCommissionsListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetExpectedCommissionsListQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetExpectedCommissionsListQuery,
    GetExpectedCommissionsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetExpectedCommissionsListQuery,
    GetExpectedCommissionsListQueryVariables
  >(GetExpectedCommissionsListDocument, options)
}
export function useGetExpectedCommissionsListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetExpectedCommissionsListQuery,
    GetExpectedCommissionsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetExpectedCommissionsListQuery,
    GetExpectedCommissionsListQueryVariables
  >(GetExpectedCommissionsListDocument, options)
}
export type GetExpectedCommissionsListQueryHookResult = ReturnType<
  typeof useGetExpectedCommissionsListQuery
>
export type GetExpectedCommissionsListLazyQueryHookResult = ReturnType<
  typeof useGetExpectedCommissionsListLazyQuery
>
export type GetExpectedCommissionsListQueryResult = Apollo.QueryResult<
  GetExpectedCommissionsListQuery,
  GetExpectedCommissionsListQueryVariables
>
