/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPurchaseOrderLinesToUpdateQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID']
}>

export type GetPurchaseOrderLinesToUpdateQuery = {
  node?: Types.Maybe<{
    id: string
    poNumber: string
    client: { id: string; fullName: string }
    purchaseOrderLines: {
      nodes: Array<{
        archived: boolean
        expiryDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
        id: string
        poLineNumber: string
        threshold?: Types.Maybe<string>
        totalAmount?: Types.Maybe<string>
      }>
    }
  }>
}

export const GetPurchaseOrderLinesToUpdateDocument = gql`
  query GetPurchaseOrderLinesToUpdate($nodeId: ID!) {
    node(id: $nodeId) {
      ... on PurchaseOrder {
        id
        poNumber
        client {
          id
          fullName
        }
        purchaseOrderLines {
          nodes {
            archived
            expiryDate
            id
            poLineNumber
            threshold
            totalAmount
          }
        }
      }
    }
  }
`

/**
 * __useGetPurchaseOrderLinesToUpdateQuery__
 *
 * To run a query within a React component, call `useGetPurchaseOrderLinesToUpdateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseOrderLinesToUpdateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseOrderLinesToUpdateQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetPurchaseOrderLinesToUpdateQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPurchaseOrderLinesToUpdateQuery,
    GetPurchaseOrderLinesToUpdateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPurchaseOrderLinesToUpdateQuery,
    GetPurchaseOrderLinesToUpdateQueryVariables
  >(GetPurchaseOrderLinesToUpdateDocument, options)
}
export function useGetPurchaseOrderLinesToUpdateLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPurchaseOrderLinesToUpdateQuery,
    GetPurchaseOrderLinesToUpdateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPurchaseOrderLinesToUpdateQuery,
    GetPurchaseOrderLinesToUpdateQueryVariables
  >(GetPurchaseOrderLinesToUpdateDocument, options)
}
export type GetPurchaseOrderLinesToUpdateQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderLinesToUpdateQuery
>
export type GetPurchaseOrderLinesToUpdateLazyQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderLinesToUpdateLazyQuery
>
export type GetPurchaseOrderLinesToUpdateQueryResult = Apollo.QueryResult<
  GetPurchaseOrderLinesToUpdateQuery,
  GetPurchaseOrderLinesToUpdateQueryVariables
>
