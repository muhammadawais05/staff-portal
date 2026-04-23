/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { OperationItemFragment } from '../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { OperationItemFragmentDoc } from '../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPurchaseOrderLineArchiveStateQueryVariables = Types.Exact<{
  purchaseOrderLineId: Types.Scalars['ID']
}>

export type GetPurchaseOrderLineArchiveStateQuery = {
  node?: Types.Maybe<{
    id: string
    archived: boolean
    operations: {
      archivePurchaseOrderLine: OperationItemFragment
      unarchivePurchaseOrderLine: OperationItemFragment
    }
  }>
}

export const GetPurchaseOrderLineArchiveStateDocument = gql`
  query GetPurchaseOrderLineArchiveState($purchaseOrderLineId: ID!) {
    node(id: $purchaseOrderLineId) {
      ... on PurchaseOrderLine {
        id
        archived
        operations {
          archivePurchaseOrderLine {
            ...OperationItem
          }
          unarchivePurchaseOrderLine {
            ...OperationItem
          }
        }
      }
    }
  }
  ${OperationItemFragmentDoc}
`

/**
 * __useGetPurchaseOrderLineArchiveStateQuery__
 *
 * To run a query within a React component, call `useGetPurchaseOrderLineArchiveStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseOrderLineArchiveStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseOrderLineArchiveStateQuery({
 *   variables: {
 *      purchaseOrderLineId: // value for 'purchaseOrderLineId'
 *   },
 * });
 */
export function useGetPurchaseOrderLineArchiveStateQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPurchaseOrderLineArchiveStateQuery,
    GetPurchaseOrderLineArchiveStateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPurchaseOrderLineArchiveStateQuery,
    GetPurchaseOrderLineArchiveStateQueryVariables
  >(GetPurchaseOrderLineArchiveStateDocument, options)
}
export function useGetPurchaseOrderLineArchiveStateLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPurchaseOrderLineArchiveStateQuery,
    GetPurchaseOrderLineArchiveStateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPurchaseOrderLineArchiveStateQuery,
    GetPurchaseOrderLineArchiveStateQueryVariables
  >(GetPurchaseOrderLineArchiveStateDocument, options)
}
export type GetPurchaseOrderLineArchiveStateQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderLineArchiveStateQuery
>
export type GetPurchaseOrderLineArchiveStateLazyQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderLineArchiveStateLazyQuery
>
export type GetPurchaseOrderLineArchiveStateQueryResult = Apollo.QueryResult<
  GetPurchaseOrderLineArchiveStateQuery,
  GetPurchaseOrderLineArchiveStateQueryVariables
>
