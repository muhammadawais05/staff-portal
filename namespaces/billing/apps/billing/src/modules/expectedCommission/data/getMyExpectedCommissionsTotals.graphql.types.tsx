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
export type GetMyExpectedCommissionsTotalsQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
}>

export type GetMyExpectedCommissionsTotalsQuery = {
  viewer: {
    expectedCommissions?: Types.Maybe<{
      totalCount: number
      totals: { amount: string }
      groups: Array<{ month: number; year: number; totals: { amount: string } }>
    }>
  }
}

export const GetMyExpectedCommissionsTotalsDocument = gql`
  query GetMyExpectedCommissionsTotals($pagination: OffsetPagination!) {
    viewer {
      expectedCommissions(pagination: $pagination) {
        totalCount
        totals {
          amount
        }
        groups {
          month
          year
          totals {
            amount
          }
        }
      }
    }
  }
`

/**
 * __useGetMyExpectedCommissionsTotalsQuery__
 *
 * To run a query within a React component, call `useGetMyExpectedCommissionsTotalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyExpectedCommissionsTotalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyExpectedCommissionsTotalsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetMyExpectedCommissionsTotalsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetMyExpectedCommissionsTotalsQuery,
    GetMyExpectedCommissionsTotalsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetMyExpectedCommissionsTotalsQuery,
    GetMyExpectedCommissionsTotalsQueryVariables
  >(GetMyExpectedCommissionsTotalsDocument, options)
}
export function useGetMyExpectedCommissionsTotalsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMyExpectedCommissionsTotalsQuery,
    GetMyExpectedCommissionsTotalsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetMyExpectedCommissionsTotalsQuery,
    GetMyExpectedCommissionsTotalsQueryVariables
  >(GetMyExpectedCommissionsTotalsDocument, options)
}
export type GetMyExpectedCommissionsTotalsQueryHookResult = ReturnType<
  typeof useGetMyExpectedCommissionsTotalsQuery
>
export type GetMyExpectedCommissionsTotalsLazyQueryHookResult = ReturnType<
  typeof useGetMyExpectedCommissionsTotalsLazyQuery
>
export type GetMyExpectedCommissionsTotalsQueryResult = Apollo.QueryResult<
  GetMyExpectedCommissionsTotalsQuery,
  GetMyExpectedCommissionsTotalsQueryVariables
>
