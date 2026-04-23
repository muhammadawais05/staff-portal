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
export type GetPurchaseOrderLineDetailsAttributesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetPurchaseOrderLineDetailsAttributesQuery = {
  node?: Types.Maybe<{
    draftedAmount: string
    expiryDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
    id: string
    invoicedAmount: string
    poLineNumber: string
    threshold?: Types.Maybe<string>
    totalAmount?: Types.Maybe<string>
  }>
}

export const GetPurchaseOrderLineDetailsAttributesDocument = gql`
  query GetPurchaseOrderLineDetailsAttributes($id: ID!) {
    node(id: $id) {
      ... on PurchaseOrderLine {
        draftedAmount
        expiryDate
        id
        invoicedAmount
        poLineNumber
        threshold
        totalAmount
      }
    }
  }
`

/**
 * __useGetPurchaseOrderLineDetailsAttributesQuery__
 *
 * To run a query within a React component, call `useGetPurchaseOrderLineDetailsAttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseOrderLineDetailsAttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseOrderLineDetailsAttributesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPurchaseOrderLineDetailsAttributesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPurchaseOrderLineDetailsAttributesQuery,
    GetPurchaseOrderLineDetailsAttributesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPurchaseOrderLineDetailsAttributesQuery,
    GetPurchaseOrderLineDetailsAttributesQueryVariables
  >(GetPurchaseOrderLineDetailsAttributesDocument, options)
}
export function useGetPurchaseOrderLineDetailsAttributesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPurchaseOrderLineDetailsAttributesQuery,
    GetPurchaseOrderLineDetailsAttributesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPurchaseOrderLineDetailsAttributesQuery,
    GetPurchaseOrderLineDetailsAttributesQueryVariables
  >(GetPurchaseOrderLineDetailsAttributesDocument, options)
}
export type GetPurchaseOrderLineDetailsAttributesQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderLineDetailsAttributesQuery
>
export type GetPurchaseOrderLineDetailsAttributesLazyQueryHookResult =
  ReturnType<typeof useGetPurchaseOrderLineDetailsAttributesLazyQuery>
export type GetPurchaseOrderLineDetailsAttributesQueryResult =
  Apollo.QueryResult<
    GetPurchaseOrderLineDetailsAttributesQuery,
    GetPurchaseOrderLineDetailsAttributesQueryVariables
  >
