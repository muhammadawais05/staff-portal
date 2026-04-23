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
export type GetPurchaseOrderArchiveStateQueryVariables = Types.Exact<{
  purchaseOrderId: Types.Scalars['ID']
}>

export type GetPurchaseOrderArchiveStateQuery = {
  node?: Types.Maybe<{
    id: string
    archived: boolean
    operations: {
      archivePurchaseOrder: OperationItemFragment
      unarchivePurchaseOrder: OperationItemFragment
    }
  }>
}

export const GetPurchaseOrderArchiveStateDocument = gql`
  query GetPurchaseOrderArchiveState($purchaseOrderId: ID!) {
    node(id: $purchaseOrderId) {
      ... on PurchaseOrder {
        id
        archived
        operations {
          archivePurchaseOrder {
            ...OperationItem
          }
          unarchivePurchaseOrder {
            ...OperationItem
          }
        }
      }
    }
  }
  ${OperationItemFragmentDoc}
`

/**
 * __useGetPurchaseOrderArchiveStateQuery__
 *
 * To run a query within a React component, call `useGetPurchaseOrderArchiveStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseOrderArchiveStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseOrderArchiveStateQuery({
 *   variables: {
 *      purchaseOrderId: // value for 'purchaseOrderId'
 *   },
 * });
 */
export function useGetPurchaseOrderArchiveStateQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPurchaseOrderArchiveStateQuery,
    GetPurchaseOrderArchiveStateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPurchaseOrderArchiveStateQuery,
    GetPurchaseOrderArchiveStateQueryVariables
  >(GetPurchaseOrderArchiveStateDocument, options)
}
export function useGetPurchaseOrderArchiveStateLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPurchaseOrderArchiveStateQuery,
    GetPurchaseOrderArchiveStateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPurchaseOrderArchiveStateQuery,
    GetPurchaseOrderArchiveStateQueryVariables
  >(GetPurchaseOrderArchiveStateDocument, options)
}
export type GetPurchaseOrderArchiveStateQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderArchiveStateQuery
>
export type GetPurchaseOrderArchiveStateLazyQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderArchiveStateLazyQuery
>
export type GetPurchaseOrderArchiveStateQueryResult = Apollo.QueryResult<
  GetPurchaseOrderArchiveStateQuery,
  GetPurchaseOrderArchiveStateQueryVariables
>
