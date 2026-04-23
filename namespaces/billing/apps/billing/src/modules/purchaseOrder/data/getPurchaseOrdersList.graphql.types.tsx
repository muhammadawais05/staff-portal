/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { OperationItemFragment } from '../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { PurchaseOrderListItemFragment } from '../../__fragments__/purchaseOrderListItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { OperationItemFragmentDoc } from '../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { PurchaseOrderListItemFragmentDoc } from '../../__fragments__/purchaseOrderListItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPurchaseOrdersListQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.PurchaseOrderSearchFilter
}>

export type GetPurchaseOrdersListQuery = {
  purchaseOrders?: Types.Maybe<{
    totalCount: number
    operations: { createPurchaseOrder: OperationItemFragment }
    nodes: Array<PurchaseOrderListItemFragment>
  }>
}

export const GetPurchaseOrdersListDocument = gql`
  query GetPurchaseOrdersList(
    $pagination: OffsetPagination!
    $filter: PurchaseOrderSearchFilter!
  ) {
    purchaseOrders: purchaseOrdersNullable(
      pagination: $pagination
      filter: $filter
    ) {
      totalCount
      operations {
        createPurchaseOrder {
          ...OperationItem
        }
      }
      nodes {
        ...PurchaseOrderListItemFragment
      }
    }
  }
  ${OperationItemFragmentDoc}
  ${PurchaseOrderListItemFragmentDoc}
`

/**
 * __useGetPurchaseOrdersListQuery__
 *
 * To run a query within a React component, call `useGetPurchaseOrdersListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseOrdersListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseOrdersListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetPurchaseOrdersListQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPurchaseOrdersListQuery,
    GetPurchaseOrdersListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPurchaseOrdersListQuery,
    GetPurchaseOrdersListQueryVariables
  >(GetPurchaseOrdersListDocument, options)
}
export function useGetPurchaseOrdersListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPurchaseOrdersListQuery,
    GetPurchaseOrdersListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPurchaseOrdersListQuery,
    GetPurchaseOrdersListQueryVariables
  >(GetPurchaseOrdersListDocument, options)
}
export type GetPurchaseOrdersListQueryHookResult = ReturnType<
  typeof useGetPurchaseOrdersListQuery
>
export type GetPurchaseOrdersListLazyQueryHookResult = ReturnType<
  typeof useGetPurchaseOrdersListLazyQuery
>
export type GetPurchaseOrdersListQueryResult = Apollo.QueryResult<
  GetPurchaseOrdersListQuery,
  GetPurchaseOrdersListQueryVariables
>
