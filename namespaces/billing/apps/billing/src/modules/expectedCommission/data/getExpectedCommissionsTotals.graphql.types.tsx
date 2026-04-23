/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetExpectedCommissionsTotalsQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.ExpectedCommissionsFilter
}>

export type GetExpectedCommissionsTotalsQuery = {
  expectedCommissions?: Types.Maybe<{
    totalCount: number
    groups: Array<{ month: number; year: number; totals: { amount: string } }>
  }>
}

export const GetExpectedCommissionsTotalsDocument = gql`
  query GetExpectedCommissionsTotals(
    $pagination: OffsetPagination!
    $filter: ExpectedCommissionsFilter!
  ) {
    expectedCommissions(pagination: $pagination, filter: $filter) {
      totalCount
      groups {
        month
        year
        totals {
          amount
        }
      }
    }
  }
`

/**
 * __useGetExpectedCommissionsTotalsQuery__
 *
 * To run a query within a React component, call `useGetExpectedCommissionsTotalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpectedCommissionsTotalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpectedCommissionsTotalsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetExpectedCommissionsTotalsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetExpectedCommissionsTotalsQuery,
    GetExpectedCommissionsTotalsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetExpectedCommissionsTotalsQuery,
    GetExpectedCommissionsTotalsQueryVariables
  >(GetExpectedCommissionsTotalsDocument, options)
}
export function useGetExpectedCommissionsTotalsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetExpectedCommissionsTotalsQuery,
    GetExpectedCommissionsTotalsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetExpectedCommissionsTotalsQuery,
    GetExpectedCommissionsTotalsQueryVariables
  >(GetExpectedCommissionsTotalsDocument, options)
}
export type GetExpectedCommissionsTotalsQueryHookResult = ReturnType<
  typeof useGetExpectedCommissionsTotalsQuery
>
export type GetExpectedCommissionsTotalsLazyQueryHookResult = ReturnType<
  typeof useGetExpectedCommissionsTotalsLazyQuery
>
export type GetExpectedCommissionsTotalsQueryResult = Apollo.QueryResult<
  GetExpectedCommissionsTotalsQuery,
  GetExpectedCommissionsTotalsQueryVariables
>
