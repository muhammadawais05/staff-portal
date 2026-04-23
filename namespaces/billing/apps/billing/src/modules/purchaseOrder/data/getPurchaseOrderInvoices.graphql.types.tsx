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
export type GetPurchaseOrderInvoicesQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID']
  pagination?: Types.Maybe<Types.OffsetPagination>
}>

export type GetPurchaseOrderInvoicesQuery = {
  node?: Types.Maybe<
    | {
        id: string
        invoices: { totalCount: number; nodes: Array<InvoiceListItemFragment> }
      }
    | {
        id: string
        invoices: { totalCount: number; nodes: Array<InvoiceListItemFragment> }
      }
  >
}

export const GetPurchaseOrderInvoicesDocument = gql`
  query GetPurchaseOrderInvoices($nodeId: ID!, $pagination: OffsetPagination) {
    node(id: $nodeId) {
      ... on PurchaseOrderLine {
        id
        invoices(pagination: $pagination) {
          totalCount
          nodes {
            ...InvoiceListItemFragment
          }
        }
      }
      ... on PurchaseOrder {
        id
        invoices(pagination: $pagination) {
          totalCount
          nodes {
            ...InvoiceListItemFragment
          }
        }
      }
    }
  }
  ${InvoiceListItemFragmentDoc}
`

/**
 * __useGetPurchaseOrderInvoicesQuery__
 *
 * To run a query within a React component, call `useGetPurchaseOrderInvoicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseOrderInvoicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseOrderInvoicesQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetPurchaseOrderInvoicesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPurchaseOrderInvoicesQuery,
    GetPurchaseOrderInvoicesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPurchaseOrderInvoicesQuery,
    GetPurchaseOrderInvoicesQueryVariables
  >(GetPurchaseOrderInvoicesDocument, options)
}
export function useGetPurchaseOrderInvoicesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPurchaseOrderInvoicesQuery,
    GetPurchaseOrderInvoicesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPurchaseOrderInvoicesQuery,
    GetPurchaseOrderInvoicesQueryVariables
  >(GetPurchaseOrderInvoicesDocument, options)
}
export type GetPurchaseOrderInvoicesQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderInvoicesQuery
>
export type GetPurchaseOrderInvoicesLazyQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderInvoicesLazyQuery
>
export type GetPurchaseOrderInvoicesQueryResult = Apollo.QueryResult<
  GetPurchaseOrderInvoicesQuery,
  GetPurchaseOrderInvoicesQueryVariables
>
