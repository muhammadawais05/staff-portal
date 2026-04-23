/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { WebResourceFragment } from '../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { WebResourceFragmentDoc } from '../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPurchaseOrderLinesDetailsQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID']
}>

export type GetPurchaseOrderLinesDetailsQuery = {
  node?: Types.Maybe<{
    id: string
    purchaseOrderLines: {
      nodes: Array<{
        archived: boolean
        id: string
        poLineNumber: string
        totalAmount?: Types.Maybe<string>
        draftedAmount: string
        invoicedAmount: string
        webResource: WebResourceFragment
      }>
    }
  }>
}

export const GetPurchaseOrderLinesDetailsDocument = gql`
  query GetPurchaseOrderLinesDetails($nodeId: ID!) {
    node(id: $nodeId) {
      ... on PurchaseOrder {
        id
        purchaseOrderLines {
          nodes {
            archived
            id
            poLineNumber
            totalAmount
            draftedAmount
            invoicedAmount
            webResource {
              ...WebResourceFragment
            }
          }
        }
      }
    }
  }
  ${WebResourceFragmentDoc}
`

/**
 * __useGetPurchaseOrderLinesDetailsQuery__
 *
 * To run a query within a React component, call `useGetPurchaseOrderLinesDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseOrderLinesDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseOrderLinesDetailsQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetPurchaseOrderLinesDetailsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPurchaseOrderLinesDetailsQuery,
    GetPurchaseOrderLinesDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPurchaseOrderLinesDetailsQuery,
    GetPurchaseOrderLinesDetailsQueryVariables
  >(GetPurchaseOrderLinesDetailsDocument, options)
}
export function useGetPurchaseOrderLinesDetailsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPurchaseOrderLinesDetailsQuery,
    GetPurchaseOrderLinesDetailsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPurchaseOrderLinesDetailsQuery,
    GetPurchaseOrderLinesDetailsQueryVariables
  >(GetPurchaseOrderLinesDetailsDocument, options)
}
export type GetPurchaseOrderLinesDetailsQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderLinesDetailsQuery
>
export type GetPurchaseOrderLinesDetailsLazyQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderLinesDetailsLazyQuery
>
export type GetPurchaseOrderLinesDetailsQueryResult = Apollo.QueryResult<
  GetPurchaseOrderLinesDetailsQuery,
  GetPurchaseOrderLinesDetailsQueryVariables
>
