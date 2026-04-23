/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { InvoiceOperationsFragment } from '../../../../../../../../libs/billing/src/__fragments__/invoiceOperationsFragment.graphql.types'
import { WebResourceFragment } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { InvoiceOperationsFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/invoiceOperationsFragment.graphql.types'
import { WebResourceFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetInvoiceDetailsHeaderQueryVariables = Types.Exact<{
  invoiceId: Types.Scalars['ID']
}>

export type GetInvoiceDetailsHeaderQuery = {
  node?: Types.Maybe<
    {
      cleanAmountToPay?: Types.Maybe<string>
      downloadHtmlUrl?: Types.Maybe<string>
      downloadPdfUrl?: Types.Maybe<string>
      documentNumber: number
      id: string
      gid: string
      status: Types.DocumentStatus
      consolidatedInvoice?: Types.Maybe<{ id: string }>
      historyLink?: Types.Maybe<{ url?: Types.Maybe<string> }>
      webResource: WebResourceFragment
    } & InvoiceOperationsFragment
  >
}

export const GetInvoiceDetailsHeaderDocument = gql`
  query GetInvoiceDetailsHeader($invoiceId: ID!) {
    node(id: $invoiceId) {
      ... on Invoice {
        cleanAmountToPay
        consolidatedInvoice {
          id
        }
        downloadHtmlUrl
        downloadPdfUrl
        documentNumber
        id
        historyLink {
          url
        }
        gid
        ...InvoiceOperationsFragment
        status
        webResource {
          ...WebResourceFragment
        }
      }
    }
  }
  ${InvoiceOperationsFragmentDoc}
  ${WebResourceFragmentDoc}
`

/**
 * __useGetInvoiceDetailsHeaderQuery__
 *
 * To run a query within a React component, call `useGetInvoiceDetailsHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceDetailsHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceDetailsHeaderQuery({
 *   variables: {
 *      invoiceId: // value for 'invoiceId'
 *   },
 * });
 */
export function useGetInvoiceDetailsHeaderQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetInvoiceDetailsHeaderQuery,
    GetInvoiceDetailsHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetInvoiceDetailsHeaderQuery,
    GetInvoiceDetailsHeaderQueryVariables
  >(GetInvoiceDetailsHeaderDocument, options)
}
export function useGetInvoiceDetailsHeaderLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetInvoiceDetailsHeaderQuery,
    GetInvoiceDetailsHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetInvoiceDetailsHeaderQuery,
    GetInvoiceDetailsHeaderQueryVariables
  >(GetInvoiceDetailsHeaderDocument, options)
}
export type GetInvoiceDetailsHeaderQueryHookResult = ReturnType<
  typeof useGetInvoiceDetailsHeaderQuery
>
export type GetInvoiceDetailsHeaderLazyQueryHookResult = ReturnType<
  typeof useGetInvoiceDetailsHeaderLazyQuery
>
export type GetInvoiceDetailsHeaderQueryResult = Apollo.QueryResult<
  GetInvoiceDetailsHeaderQuery,
  GetInvoiceDetailsHeaderQueryVariables
>
