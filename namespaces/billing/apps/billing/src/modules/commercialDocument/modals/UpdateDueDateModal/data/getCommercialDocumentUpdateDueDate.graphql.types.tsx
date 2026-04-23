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
export type GetCommercialDocumentUpdateDueDateQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID']
}>

export type GetCommercialDocumentUpdateDueDateQuery = {
  node?: Types.Maybe<
    | {
        documentNumber: number
        dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
        id: string
      }
    | {
        documentNumber: number
        dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
        id: string
      }
  >
}

export const GetCommercialDocumentUpdateDueDateDocument = gql`
  query GetCommercialDocumentUpdateDueDate($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Invoice {
        documentNumber
        dueDate
        id
      }
      ... on Payment {
        documentNumber
        dueDate
        id
      }
    }
  }
`

/**
 * __useGetCommercialDocumentUpdateDueDateQuery__
 *
 * To run a query within a React component, call `useGetCommercialDocumentUpdateDueDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommercialDocumentUpdateDueDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommercialDocumentUpdateDueDateQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetCommercialDocumentUpdateDueDateQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetCommercialDocumentUpdateDueDateQuery,
    GetCommercialDocumentUpdateDueDateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetCommercialDocumentUpdateDueDateQuery,
    GetCommercialDocumentUpdateDueDateQueryVariables
  >(GetCommercialDocumentUpdateDueDateDocument, options)
}
export function useGetCommercialDocumentUpdateDueDateLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCommercialDocumentUpdateDueDateQuery,
    GetCommercialDocumentUpdateDueDateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetCommercialDocumentUpdateDueDateQuery,
    GetCommercialDocumentUpdateDueDateQueryVariables
  >(GetCommercialDocumentUpdateDueDateDocument, options)
}
export type GetCommercialDocumentUpdateDueDateQueryHookResult = ReturnType<
  typeof useGetCommercialDocumentUpdateDueDateQuery
>
export type GetCommercialDocumentUpdateDueDateLazyQueryHookResult = ReturnType<
  typeof useGetCommercialDocumentUpdateDueDateLazyQuery
>
export type GetCommercialDocumentUpdateDueDateQueryResult = Apollo.QueryResult<
  GetCommercialDocumentUpdateDueDateQuery,
  GetCommercialDocumentUpdateDueDateQueryVariables
>
