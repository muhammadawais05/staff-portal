/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { PaymentGroupOperationsFragment } from '../../../../__fragments__/paymentGroupOperationsFragment.graphql.types'
import { WebResourceFragment } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { PaymentGroupOperationsFragmentDoc } from '../../../../__fragments__/paymentGroupOperationsFragment.graphql.types'
import { WebResourceFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPaymentGroupDetailsHeaderQueryVariables = Types.Exact<{
  paymentGroupId: Types.Scalars['ID']
}>

export type GetPaymentGroupDetailsHeaderQuery = {
  node?: Types.Maybe<
    {
      id: string
      gid: string
      number: number
      status: Types.PaymentGroupStatus
      historyLink?: Types.Maybe<{ url?: Types.Maybe<string> }>
      webResource: WebResourceFragment
    } & PaymentGroupOperationsFragment
  >
}

export const GetPaymentGroupDetailsHeaderDocument = gql`
  query GetPaymentGroupDetailsHeader($paymentGroupId: ID!) {
    node(id: $paymentGroupId) {
      ... on PaymentGroup {
        id
        gid
        number
        ...PaymentGroupOperationsFragment
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
  ${PaymentGroupOperationsFragmentDoc}
  ${WebResourceFragmentDoc}
`

/**
 * __useGetPaymentGroupDetailsHeaderQuery__
 *
 * To run a query within a React component, call `useGetPaymentGroupDetailsHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentGroupDetailsHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentGroupDetailsHeaderQuery({
 *   variables: {
 *      paymentGroupId: // value for 'paymentGroupId'
 *   },
 * });
 */
export function useGetPaymentGroupDetailsHeaderQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPaymentGroupDetailsHeaderQuery,
    GetPaymentGroupDetailsHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPaymentGroupDetailsHeaderQuery,
    GetPaymentGroupDetailsHeaderQueryVariables
  >(GetPaymentGroupDetailsHeaderDocument, options)
}
export function useGetPaymentGroupDetailsHeaderLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentGroupDetailsHeaderQuery,
    GetPaymentGroupDetailsHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPaymentGroupDetailsHeaderQuery,
    GetPaymentGroupDetailsHeaderQueryVariables
  >(GetPaymentGroupDetailsHeaderDocument, options)
}
export type GetPaymentGroupDetailsHeaderQueryHookResult = ReturnType<
  typeof useGetPaymentGroupDetailsHeaderQuery
>
export type GetPaymentGroupDetailsHeaderLazyQueryHookResult = ReturnType<
  typeof useGetPaymentGroupDetailsHeaderLazyQuery
>
export type GetPaymentGroupDetailsHeaderQueryResult = Apollo.QueryResult<
  GetPaymentGroupDetailsHeaderQuery,
  GetPaymentGroupDetailsHeaderQueryVariables
>
