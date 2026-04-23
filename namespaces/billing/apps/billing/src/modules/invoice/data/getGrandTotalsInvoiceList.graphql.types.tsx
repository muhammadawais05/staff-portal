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
export type GetInvoicesGrandTotalsQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.InvoicesFilter
}>

export type GetInvoicesGrandTotalsQuery = {
  invoices: { totalCount: number; totals: InvoicesTotalsFragment }
}

export const GetInvoicesGrandTotalsDocument = gql`
  query GetInvoicesGrandTotals(
    $pagination: OffsetPagination!
    $filter: InvoicesFilter!
  ) {
    invoices(pagination: $pagination, filter: $filter) {
      totalCount
      totals {
        ...InvoicesTotalsFragment
      }
    }
  }
  ${InvoicesTotalsFragmentDoc}
`

/**
 * __useGetInvoicesGrandTotalsQuery__
 *
 * To run a query within a React component, call `useGetInvoicesGrandTotalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoicesGrandTotalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoicesGrandTotalsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetInvoicesGrandTotalsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetInvoicesGrandTotalsQuery,
    GetInvoicesGrandTotalsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetInvoicesGrandTotalsQuery,
    GetInvoicesGrandTotalsQueryVariables
  >(GetInvoicesGrandTotalsDocument, options)
}
export function useGetInvoicesGrandTotalsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetInvoicesGrandTotalsQuery,
    GetInvoicesGrandTotalsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetInvoicesGrandTotalsQuery,
    GetInvoicesGrandTotalsQueryVariables
  >(GetInvoicesGrandTotalsDocument, options)
}
export type GetInvoicesGrandTotalsQueryHookResult = ReturnType<
  typeof useGetInvoicesGrandTotalsQuery
>
export type GetInvoicesGrandTotalsLazyQueryHookResult = ReturnType<
  typeof useGetInvoicesGrandTotalsLazyQuery
>
export type GetInvoicesGrandTotalsQueryResult = Apollo.QueryResult<
  GetInvoicesGrandTotalsQuery,
  GetInvoicesGrandTotalsQueryVariables
>
