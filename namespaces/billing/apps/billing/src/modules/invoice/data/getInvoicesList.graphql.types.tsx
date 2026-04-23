/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { InvoiceListItemFragment } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/invoiceListItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { InvoiceListItemFragmentDoc } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/invoiceListItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetInvoicesListQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.InvoicesFilter
}>

export type GetInvoicesListQuery = {
  invoices?: Types.Maybe<{
    totalCount: number
    groups: Array<{
      month: number
      year: number
      invoices: Array<InvoiceListItemFragment>
    }>
  }>
}

export const GetInvoicesListDocument = gql`
  query GetInvoicesList(
    $pagination: OffsetPagination!
    $filter: InvoicesFilter!
  ) {
    invoices: invoicesNullable(pagination: $pagination, filter: $filter) {
      totalCount
      groups {
        month
        year
        invoices {
          ...InvoiceListItemFragment
        }
      }
    }
  }
  ${InvoiceListItemFragmentDoc}
`

/**
 * __useGetInvoicesListQuery__
 *
 * To run a query within a React component, call `useGetInvoicesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoicesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoicesListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetInvoicesListQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetInvoicesListQuery,
    GetInvoicesListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetInvoicesListQuery,
    GetInvoicesListQueryVariables
  >(GetInvoicesListDocument, options)
}
export function useGetInvoicesListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetInvoicesListQuery,
    GetInvoicesListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetInvoicesListQuery,
    GetInvoicesListQueryVariables
  >(GetInvoicesListDocument, options)
}
export type GetInvoicesListQueryHookResult = ReturnType<
  typeof useGetInvoicesListQuery
>
export type GetInvoicesListLazyQueryHookResult = ReturnType<
  typeof useGetInvoicesListLazyQuery
>
export type GetInvoicesListQueryResult = Apollo.QueryResult<
  GetInvoicesListQuery,
  GetInvoicesListQueryVariables
>
