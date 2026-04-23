/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { WebResourceFragment } from '../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { WebResourceFragmentDoc } from '../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPurchaseOrderLinesForInvoiceQueryVariables = Types.Exact<{
  invoiceId: Types.Scalars['ID']
}>

export type GetPurchaseOrderLinesForInvoiceQuery = {
  node?: Types.Maybe<{
    id: string
    job?: Types.Maybe<{
      purchaseOrderLine?: Types.Maybe<{ id: string; poLineNumber: string }>
      nextPurchaseOrderLine?: Types.Maybe<{ id: string; poLineNumber: string }>
    }>
    purchaseOrder?: Types.Maybe<{ id: string }>
    purchaseOrderLine?: Types.Maybe<{
      id: string
      purchaseOrder: { id: string }
    }>
    subjectObject: {
      id: string
      purchaseOrdersNullable?: Types.Maybe<{
        nodes: Array<{
          id: string
          poNumber: string
          budgetLeft?: Types.Maybe<string>
          webResource: WebResourceFragment
          purchaseOrderLines: {
            nodes: Array<{
              id: string
              poLineNumber: string
              budgetLeft?: Types.Maybe<string>
              webResource: WebResourceFragment
            }>
          }
        }>
      }>
    }
  }>
}

export const GetPurchaseOrderLinesForInvoiceDocument = gql`
  query GetPurchaseOrderLinesForInvoice($invoiceId: ID!) {
    node(id: $invoiceId) {
      ... on Invoice {
        id
        job {
          purchaseOrderLine {
            id
            poLineNumber
          }
          nextPurchaseOrderLine {
            id
            poLineNumber
          }
        }
        purchaseOrder {
          id
        }
        purchaseOrderLine {
          id
          purchaseOrder {
            id
          }
        }
        subjectObject {
          id
          purchaseOrdersNullable(filter: { assignable: true }) {
            nodes {
              id
              poNumber
              budgetLeft
              webResource {
                ...WebResourceFragment
              }
              purchaseOrderLines(filter: { assignable: true }) {
                nodes {
                  id
                  poLineNumber
                  budgetLeft
                  webResource {
                    ...WebResourceFragment
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${WebResourceFragmentDoc}
`

/**
 * __useGetPurchaseOrderLinesForInvoiceQuery__
 *
 * To run a query within a React component, call `useGetPurchaseOrderLinesForInvoiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseOrderLinesForInvoiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseOrderLinesForInvoiceQuery({
 *   variables: {
 *      invoiceId: // value for 'invoiceId'
 *   },
 * });
 */
export function useGetPurchaseOrderLinesForInvoiceQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPurchaseOrderLinesForInvoiceQuery,
    GetPurchaseOrderLinesForInvoiceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPurchaseOrderLinesForInvoiceQuery,
    GetPurchaseOrderLinesForInvoiceQueryVariables
  >(GetPurchaseOrderLinesForInvoiceDocument, options)
}
export function useGetPurchaseOrderLinesForInvoiceLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPurchaseOrderLinesForInvoiceQuery,
    GetPurchaseOrderLinesForInvoiceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPurchaseOrderLinesForInvoiceQuery,
    GetPurchaseOrderLinesForInvoiceQueryVariables
  >(GetPurchaseOrderLinesForInvoiceDocument, options)
}
export type GetPurchaseOrderLinesForInvoiceQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderLinesForInvoiceQuery
>
export type GetPurchaseOrderLinesForInvoiceLazyQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderLinesForInvoiceLazyQuery
>
export type GetPurchaseOrderLinesForInvoiceQueryResult = Apollo.QueryResult<
  GetPurchaseOrderLinesForInvoiceQuery,
  GetPurchaseOrderLinesForInvoiceQueryVariables
>
