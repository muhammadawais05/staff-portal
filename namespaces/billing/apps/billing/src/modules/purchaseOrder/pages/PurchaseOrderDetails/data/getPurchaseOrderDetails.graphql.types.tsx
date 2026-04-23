/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { WebResourceFragment } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { PurchaseOrderOperationsFragment } from '../../../../__fragments__/purchaseOrderOperationsFragment.graphql.types'
import { gql } from '@apollo/client'
import { WebResourceFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { PurchaseOrderOperationsFragmentDoc } from '../../../../__fragments__/purchaseOrderOperationsFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPurchaseOrderDetailsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetPurchaseOrderDetailsQuery = {
  node?: Types.Maybe<GetPurchaseOrderDetailsNodeFragment>
}

export type GetPurchaseOrderDetailsNodeFragment = {
  draftedAmount: string
  expiryDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  id: string
  invoicedAmount: string
  poNumber: string
  shared: boolean
  threshold?: Types.Maybe<string>
  totalAmount?: Types.Maybe<string>
  client: { id: string; webResource: WebResourceFragment }
  operations: PurchaseOrderOperationsFragment
  webResource: WebResourceFragment
}

export const GetPurchaseOrderDetailsNodeFragmentDoc = gql`
  fragment GetPurchaseOrderDetailsNodeFragment on PurchaseOrder {
    client {
      id
      webResource {
        ...WebResourceFragment
      }
    }
    draftedAmount
    expiryDate
    id
    invoicedAmount
    operations {
      ...PurchaseOrderOperationsFragment
    }
    poNumber
    shared
    threshold
    totalAmount
    webResource {
      ...WebResourceFragment
    }
  }
  ${WebResourceFragmentDoc}
  ${PurchaseOrderOperationsFragmentDoc}
`
export const GetPurchaseOrderDetailsDocument = gql`
  query GetPurchaseOrderDetails($id: ID!) {
    node(id: $id) {
      ...GetPurchaseOrderDetailsNodeFragment
    }
  }
  ${GetPurchaseOrderDetailsNodeFragmentDoc}
`

/**
 * __useGetPurchaseOrderDetailsQuery__
 *
 * To run a query within a React component, call `useGetPurchaseOrderDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseOrderDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseOrderDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPurchaseOrderDetailsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPurchaseOrderDetailsQuery,
    GetPurchaseOrderDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPurchaseOrderDetailsQuery,
    GetPurchaseOrderDetailsQueryVariables
  >(GetPurchaseOrderDetailsDocument, options)
}
export function useGetPurchaseOrderDetailsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPurchaseOrderDetailsQuery,
    GetPurchaseOrderDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPurchaseOrderDetailsQuery,
    GetPurchaseOrderDetailsQueryVariables
  >(GetPurchaseOrderDetailsDocument, options)
}
export type GetPurchaseOrderDetailsQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderDetailsQuery
>
export type GetPurchaseOrderDetailsLazyQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderDetailsLazyQuery
>
export type GetPurchaseOrderDetailsQueryResult = Apollo.QueryResult<
  GetPurchaseOrderDetailsQuery,
  GetPurchaseOrderDetailsQueryVariables
>
