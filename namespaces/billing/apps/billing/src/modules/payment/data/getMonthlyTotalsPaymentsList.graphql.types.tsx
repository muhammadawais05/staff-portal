/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { PaymentsTotalsFragment } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentsTotalsFragment.graphql.types'
import { gql } from '@apollo/client'
import { PaymentsTotalsFragmentDoc } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentsTotalsFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPaymentsMonthlyTotalsQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.PaymentsFilter
}>

export type GetPaymentsMonthlyTotalsQuery = {
  payments: {
    groups?: Types.Maybe<
      Array<{ month: number; year: number; totals: PaymentsTotalsFragment }>
    >
  }
}

export const GetPaymentsMonthlyTotalsDocument = gql`
  query GetPaymentsMonthlyTotals(
    $pagination: OffsetPagination!
    $filter: PaymentsFilter!
  ) {
    payments(pagination: $pagination, filter: $filter) {
      groups {
        month
        year
        totals {
          ...PaymentsTotalsFragment
        }
      }
    }
  }
  ${PaymentsTotalsFragmentDoc}
`

/**
 * __useGetPaymentsMonthlyTotalsQuery__
 *
 * To run a query within a React component, call `useGetPaymentsMonthlyTotalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsMonthlyTotalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsMonthlyTotalsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetPaymentsMonthlyTotalsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPaymentsMonthlyTotalsQuery,
    GetPaymentsMonthlyTotalsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPaymentsMonthlyTotalsQuery,
    GetPaymentsMonthlyTotalsQueryVariables
  >(GetPaymentsMonthlyTotalsDocument, options)
}
export function useGetPaymentsMonthlyTotalsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentsMonthlyTotalsQuery,
    GetPaymentsMonthlyTotalsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPaymentsMonthlyTotalsQuery,
    GetPaymentsMonthlyTotalsQueryVariables
  >(GetPaymentsMonthlyTotalsDocument, options)
}
export type GetPaymentsMonthlyTotalsQueryHookResult = ReturnType<
  typeof useGetPaymentsMonthlyTotalsQuery
>
export type GetPaymentsMonthlyTotalsLazyQueryHookResult = ReturnType<
  typeof useGetPaymentsMonthlyTotalsLazyQuery
>
export type GetPaymentsMonthlyTotalsQueryResult = Apollo.QueryResult<
  GetPaymentsMonthlyTotalsQuery,
  GetPaymentsMonthlyTotalsQueryVariables
>
