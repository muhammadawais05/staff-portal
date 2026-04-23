/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { MemorandumItemFragment } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/memorandumFragment.graphql.types'
import { gql } from '@apollo/client'
import { MemorandumItemFragmentDoc } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/memorandumFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetCommercialDocumentMemorandumsQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID']
}>

export type GetCommercialDocumentMemorandumsQuery = {
  node?: Types.Maybe<
    | {
        id: string
        memorandums: { nodes: Array<MemorandumItemFragment> }
        associatedMemorandums: { nodes: Array<MemorandumItemFragment> }
      }
    | {
        id: string
        memorandums: { nodes: Array<MemorandumItemFragment> }
        associatedMemorandums: { nodes: Array<MemorandumItemFragment> }
      }
  >
}

export const GetCommercialDocumentMemorandumsDocument = gql`
  query GetCommercialDocumentMemorandums($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Invoice {
        id
        memorandums {
          nodes {
            ...MemorandumItem
          }
        }
        associatedMemorandums {
          nodes {
            ...MemorandumItem
          }
        }
      }
      ... on Payment {
        id
        memorandums {
          nodes {
            ...MemorandumItem
          }
        }
        associatedMemorandums {
          nodes {
            ...MemorandumItem
          }
        }
      }
    }
  }
  ${MemorandumItemFragmentDoc}
`

/**
 * __useGetCommercialDocumentMemorandumsQuery__
 *
 * To run a query within a React component, call `useGetCommercialDocumentMemorandumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommercialDocumentMemorandumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommercialDocumentMemorandumsQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetCommercialDocumentMemorandumsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetCommercialDocumentMemorandumsQuery,
    GetCommercialDocumentMemorandumsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetCommercialDocumentMemorandumsQuery,
    GetCommercialDocumentMemorandumsQueryVariables
  >(GetCommercialDocumentMemorandumsDocument, options)
}
export function useGetCommercialDocumentMemorandumsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCommercialDocumentMemorandumsQuery,
    GetCommercialDocumentMemorandumsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetCommercialDocumentMemorandumsQuery,
    GetCommercialDocumentMemorandumsQueryVariables
  >(GetCommercialDocumentMemorandumsDocument, options)
}
export type GetCommercialDocumentMemorandumsQueryHookResult = ReturnType<
  typeof useGetCommercialDocumentMemorandumsQuery
>
export type GetCommercialDocumentMemorandumsLazyQueryHookResult = ReturnType<
  typeof useGetCommercialDocumentMemorandumsLazyQuery
>
export type GetCommercialDocumentMemorandumsQueryResult = Apollo.QueryResult<
  GetCommercialDocumentMemorandumsQuery,
  GetCommercialDocumentMemorandumsQueryVariables
>
