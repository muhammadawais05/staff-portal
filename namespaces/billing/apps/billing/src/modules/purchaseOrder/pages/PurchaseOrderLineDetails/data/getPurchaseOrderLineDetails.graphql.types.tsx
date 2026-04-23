/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { WebResourceFragment } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { OperationItemFragment } from '../../../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { WebResourceFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { OperationItemFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPurchaseOrderLineDetailsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetPurchaseOrderLineDetailsQuery = {
  node?: Types.Maybe<GetPurchaseOrderLineDetailsNodeFragment>
}

export type GetPurchaseOrderLineDetailsNodeFragment = {
  archived: boolean
  draftedAmount: string
  expiryDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  id: string
  invoicedAmount: string
  poLineNumber: string
  shared: boolean
  threshold?: Types.Maybe<string>
  totalAmount?: Types.Maybe<string>
  client: { id: string; webResource: WebResourceFragment }
  operations: PurchaseOrderLineOperationsFragment
  purchaseOrder: {
    id: string
    poNumber: string
    webResource: WebResourceFragment
  }
  webResource: WebResourceFragment
}

export type PurchaseOrderLineOperationsFragment = {
  archivePurchaseOrderLine: OperationItemFragment
  unarchivePurchaseOrderLine: OperationItemFragment
  updatePurchaseOrderLine: OperationItemFragment
}

export const PurchaseOrderLineOperationsFragmentDoc = gql`
  fragment PurchaseOrderLineOperationsFragment on PurchaseOrderLineOperations {
    archivePurchaseOrderLine {
      ...OperationItem
    }
    unarchivePurchaseOrderLine {
      ...OperationItem
    }
    updatePurchaseOrderLine {
      ...OperationItem
    }
  }
  ${OperationItemFragmentDoc}
`
export const GetPurchaseOrderLineDetailsNodeFragmentDoc = gql`
  fragment GetPurchaseOrderLineDetailsNodeFragment on PurchaseOrderLine {
    archived
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
      ...PurchaseOrderLineOperationsFragment
    }
    poLineNumber
    purchaseOrder {
      id
      poNumber
      webResource {
        ...WebResourceFragment
      }
    }
    shared
    threshold
    totalAmount
    webResource {
      ...WebResourceFragment
    }
  }
  ${WebResourceFragmentDoc}
  ${PurchaseOrderLineOperationsFragmentDoc}
`
export const GetPurchaseOrderLineDetailsDocument = gql`
  query GetPurchaseOrderLineDetails($id: ID!) {
    node(id: $id) {
      ...GetPurchaseOrderLineDetailsNodeFragment
    }
  }
  ${GetPurchaseOrderLineDetailsNodeFragmentDoc}
`

/**
 * __useGetPurchaseOrderLineDetailsQuery__
 *
 * To run a query within a React component, call `useGetPurchaseOrderLineDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseOrderLineDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseOrderLineDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPurchaseOrderLineDetailsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPurchaseOrderLineDetailsQuery,
    GetPurchaseOrderLineDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPurchaseOrderLineDetailsQuery,
    GetPurchaseOrderLineDetailsQueryVariables
  >(GetPurchaseOrderLineDetailsDocument, options)
}
export function useGetPurchaseOrderLineDetailsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPurchaseOrderLineDetailsQuery,
    GetPurchaseOrderLineDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPurchaseOrderLineDetailsQuery,
    GetPurchaseOrderLineDetailsQueryVariables
  >(GetPurchaseOrderLineDetailsDocument, options)
}
export type GetPurchaseOrderLineDetailsQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderLineDetailsQuery
>
export type GetPurchaseOrderLineDetailsLazyQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderLineDetailsLazyQuery
>
export type GetPurchaseOrderLineDetailsQueryResult = Apollo.QueryResult<
  GetPurchaseOrderLineDetailsQuery,
  GetPurchaseOrderLineDetailsQueryVariables
>
