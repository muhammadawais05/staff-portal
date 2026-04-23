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
export type GetPurchaseOrderDetailsAttributesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetPurchaseOrderDetailsAttributesQuery = {
  node?: Types.Maybe<GetPurchaseOrderDetailsAttributesNodeFragment>
}

export type GetPurchaseOrderDetailsAttributesNodeFragment = {
  draftedAmount: string
  expiryDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  id: string
  invoicedAmount: string
  poNumber: string
  threshold?: Types.Maybe<string>
  totalAmount?: Types.Maybe<string>
}

export const GetPurchaseOrderDetailsAttributesNodeFragmentDoc = gql`
  fragment GetPurchaseOrderDetailsAttributesNodeFragment on PurchaseOrder {
    draftedAmount
    expiryDate
    id
    invoicedAmount
    poNumber
    threshold
    totalAmount
  }
`
export const GetPurchaseOrderDetailsAttributesDocument = gql`
  query GetPurchaseOrderDetailsAttributes($id: ID!) {
    node(id: $id) {
      ...GetPurchaseOrderDetailsAttributesNodeFragment
    }
  }
  ${GetPurchaseOrderDetailsAttributesNodeFragmentDoc}
`

/**
 * __useGetPurchaseOrderDetailsAttributesQuery__
 *
 * To run a query within a React component, call `useGetPurchaseOrderDetailsAttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseOrderDetailsAttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseOrderDetailsAttributesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPurchaseOrderDetailsAttributesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPurchaseOrderDetailsAttributesQuery,
    GetPurchaseOrderDetailsAttributesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPurchaseOrderDetailsAttributesQuery,
    GetPurchaseOrderDetailsAttributesQueryVariables
  >(GetPurchaseOrderDetailsAttributesDocument, options)
}
export function useGetPurchaseOrderDetailsAttributesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPurchaseOrderDetailsAttributesQuery,
    GetPurchaseOrderDetailsAttributesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPurchaseOrderDetailsAttributesQuery,
    GetPurchaseOrderDetailsAttributesQueryVariables
  >(GetPurchaseOrderDetailsAttributesDocument, options)
}
export type GetPurchaseOrderDetailsAttributesQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderDetailsAttributesQuery
>
export type GetPurchaseOrderDetailsAttributesLazyQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderDetailsAttributesLazyQuery
>
export type GetPurchaseOrderDetailsAttributesQueryResult = Apollo.QueryResult<
  GetPurchaseOrderDetailsAttributesQuery,
  GetPurchaseOrderDetailsAttributesQueryVariables
>
