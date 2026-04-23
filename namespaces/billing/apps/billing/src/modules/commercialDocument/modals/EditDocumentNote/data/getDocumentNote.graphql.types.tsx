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
export type GetDocumentNoteQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID']
}>

export type GetDocumentNoteQuery = {
  node?: Types.Maybe<
    | { id: string; documentNote?: Types.Maybe<string> }
    | { id: string; documentNote?: Types.Maybe<string> }
  >
}

export const GetDocumentNoteDocument = gql`
  query GetDocumentNote($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Invoice {
        id
        documentNote
      }
      ... on Payment {
        id
        documentNote
      }
    }
  }
`

/**
 * __useGetDocumentNoteQuery__
 *
 * To run a query within a React component, call `useGetDocumentNoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDocumentNoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDocumentNoteQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetDocumentNoteQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetDocumentNoteQuery,
    GetDocumentNoteQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetDocumentNoteQuery,
    GetDocumentNoteQueryVariables
  >(GetDocumentNoteDocument, options)
}
export function useGetDocumentNoteLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetDocumentNoteQuery,
    GetDocumentNoteQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetDocumentNoteQuery,
    GetDocumentNoteQueryVariables
  >(GetDocumentNoteDocument, options)
}
export type GetDocumentNoteQueryHookResult = ReturnType<
  typeof useGetDocumentNoteQuery
>
export type GetDocumentNoteLazyQueryHookResult = ReturnType<
  typeof useGetDocumentNoteLazyQuery
>
export type GetDocumentNoteQueryResult = Apollo.QueryResult<
  GetDocumentNoteQuery,
  GetDocumentNoteQueryVariables
>
