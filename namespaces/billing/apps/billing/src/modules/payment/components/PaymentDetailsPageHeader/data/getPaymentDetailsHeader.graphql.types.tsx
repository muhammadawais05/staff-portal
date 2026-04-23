/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { PaymentOperationsFragment } from '../../../../../../../../libs/billing/src/__fragments__/paymentOperationsFragment.graphql.types'
import { WebResourceFragment } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { PaymentOperationsFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/paymentOperationsFragment.graphql.types'
import { WebResourceFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPaymentDetailsHeaderQueryVariables = Types.Exact<{
  paymentId: Types.Scalars['ID']
}>

export type GetPaymentDetailsHeaderQuery = {
  node?: Types.Maybe<
    {
      documentNumber: number
      downloadHtmlUrl?: Types.Maybe<string>
      downloadPdfUrl?: Types.Maybe<string>
      id: string
      gid: string
      status: Types.DocumentStatus
      paymentGroup?: Types.Maybe<{
        id: string
        number: number
        webResource: WebResourceFragment
      }>
      historyLink?: Types.Maybe<{ url?: Types.Maybe<string> }>
      webResource: WebResourceFragment
    } & PaymentOperationsFragment
  >
}

export const GetPaymentDetailsHeaderDocument = gql`
  query GetPaymentDetailsHeader($paymentId: ID!) {
    node(id: $paymentId) {
      ... on Payment {
        documentNumber
        downloadHtmlUrl
        downloadPdfUrl
        id
        gid
        ...PaymentOperationsFragment
        paymentGroup {
          id
          number
          webResource {
            ...WebResourceFragment
          }
        }
        historyLink {
          url
        }
        status
        webResource {
          ...WebResourceFragment
        }
      }
    }
  }
  ${PaymentOperationsFragmentDoc}
  ${WebResourceFragmentDoc}
`

/**
 * __useGetPaymentDetailsHeaderQuery__
 *
 * To run a query within a React component, call `useGetPaymentDetailsHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentDetailsHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentDetailsHeaderQuery({
 *   variables: {
 *      paymentId: // value for 'paymentId'
 *   },
 * });
 */
export function useGetPaymentDetailsHeaderQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPaymentDetailsHeaderQuery,
    GetPaymentDetailsHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPaymentDetailsHeaderQuery,
    GetPaymentDetailsHeaderQueryVariables
  >(GetPaymentDetailsHeaderDocument, options)
}
export function useGetPaymentDetailsHeaderLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentDetailsHeaderQuery,
    GetPaymentDetailsHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPaymentDetailsHeaderQuery,
    GetPaymentDetailsHeaderQueryVariables
  >(GetPaymentDetailsHeaderDocument, options)
}
export type GetPaymentDetailsHeaderQueryHookResult = ReturnType<
  typeof useGetPaymentDetailsHeaderQuery
>
export type GetPaymentDetailsHeaderLazyQueryHookResult = ReturnType<
  typeof useGetPaymentDetailsHeaderLazyQuery
>
export type GetPaymentDetailsHeaderQueryResult = Apollo.QueryResult<
  GetPaymentDetailsHeaderQuery,
  GetPaymentDetailsHeaderQueryVariables
>
