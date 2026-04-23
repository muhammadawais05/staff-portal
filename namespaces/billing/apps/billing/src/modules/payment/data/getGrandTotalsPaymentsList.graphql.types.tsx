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
export type GetPaymentsGrandTotalsQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.PaymentsFilter
}>

export type GetPaymentsGrandTotalsQuery = {
  payments: {
    totalCount?: Types.Maybe<number>
    totals?: Types.Maybe<PaymentsTotalsFragment>
  }
}

export const GetPaymentsGrandTotalsDocument = gql`
  query GetPaymentsGrandTotals(
    $pagination: OffsetPagination!
    $filter: PaymentsFilter!
  ) {
    payments(pagination: $pagination, filter: $filter) {
      totalCount
      totals {
        ...PaymentsTotalsFragment
      }
    }
  }
  ${PaymentsTotalsFragmentDoc}
`

/**
 * __useGetPaymentsGrandTotalsQuery__
 *
 * To run a query within a React component, call `useGetPaymentsGrandTotalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsGrandTotalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsGrandTotalsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetPaymentsGrandTotalsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPaymentsGrandTotalsQuery,
    GetPaymentsGrandTotalsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPaymentsGrandTotalsQuery,
    GetPaymentsGrandTotalsQueryVariables
  >(GetPaymentsGrandTotalsDocument, options)
}
export function useGetPaymentsGrandTotalsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentsGrandTotalsQuery,
    GetPaymentsGrandTotalsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPaymentsGrandTotalsQuery,
    GetPaymentsGrandTotalsQueryVariables
  >(GetPaymentsGrandTotalsDocument, options)
}
export type GetPaymentsGrandTotalsQueryHookResult = ReturnType<
  typeof useGetPaymentsGrandTotalsQuery
>
export type GetPaymentsGrandTotalsLazyQueryHookResult = ReturnType<
  typeof useGetPaymentsGrandTotalsLazyQuery
>
export type GetPaymentsGrandTotalsQueryResult = Apollo.QueryResult<
  GetPaymentsGrandTotalsQuery,
  GetPaymentsGrandTotalsQueryVariables
>
