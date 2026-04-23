/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { InvoicesTotalsFragment } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/invoicesTotalsFragment.graphql.types'
import { gql } from '@apollo/client'
import { InvoicesTotalsFragmentDoc } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/invoicesTotalsFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetInvoicesMonthlyTotalsQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.InvoicesFilter
}>

export type GetInvoicesMonthlyTotalsQuery = {
  invoices: {
    groups: Array<{
      month: number
      year: number
      totals: InvoicesTotalsFragment
    }>
  }
}

export const GetInvoicesMonthlyTotalsDocument = gql`
  query GetInvoicesMonthlyTotals(
    $pagination: OffsetPagination!
    $filter: InvoicesFilter!
  ) {
    invoices(pagination: $pagination, filter: $filter) {
      groups {
        month
        year
        totals {
          ...InvoicesTotalsFragment
        }
      }
    }
  }
  ${InvoicesTotalsFragmentDoc}
`

/**
 * __useGetInvoicesMonthlyTotalsQuery__
 *
 * To run a query within a React component, call `useGetInvoicesMonthlyTotalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoicesMonthlyTotalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoicesMonthlyTotalsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetInvoicesMonthlyTotalsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetInvoicesMonthlyTotalsQuery,
    GetInvoicesMonthlyTotalsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetInvoicesMonthlyTotalsQuery,
    GetInvoicesMonthlyTotalsQueryVariables
  >(GetInvoicesMonthlyTotalsDocument, options)
}
export function useGetInvoicesMonthlyTotalsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetInvoicesMonthlyTotalsQuery,
    GetInvoicesMonthlyTotalsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetInvoicesMonthlyTotalsQuery,
    GetInvoicesMonthlyTotalsQueryVariables
  >(GetInvoicesMonthlyTotalsDocument, options)
}
export type GetInvoicesMonthlyTotalsQueryHookResult = ReturnType<
  typeof useGetInvoicesMonthlyTotalsQuery
>
export type GetInvoicesMonthlyTotalsLazyQueryHookResult = ReturnType<
  typeof useGetInvoicesMonthlyTotalsLazyQuery
>
export type GetInvoicesMonthlyTotalsQueryResult = Apollo.QueryResult<
  GetInvoicesMonthlyTotalsQuery,
  GetInvoicesMonthlyTotalsQueryVariables
>
