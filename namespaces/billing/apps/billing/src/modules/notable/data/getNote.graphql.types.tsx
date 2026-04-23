/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { NoteItemFragment } from '../../__fragments__/noteItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { NoteItemFragmentDoc } from '../../__fragments__/noteItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetNoteQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID']
}>

export type GetNoteQuery = { node?: Types.Maybe<NoteItemFragment> }

export const GetNoteDocument = gql`
  query GetNote($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Note {
        ...NoteItem
      }
    }
  }
  ${NoteItemFragmentDoc}
`

/**
 * __useGetNoteQuery__
 *
 * To run a query within a React component, call `useGetNoteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoteQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetNoteQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetNoteQuery,
    GetNoteQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<GetNoteQuery, GetNoteQueryVariables>(
    GetNoteDocument,
    options
  )
}
export function useGetNoteLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetNoteQuery,
    GetNoteQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<GetNoteQuery, GetNoteQueryVariables>(
    GetNoteDocument,
    options
  )
}
export type GetNoteQueryHookResult = ReturnType<typeof useGetNoteQuery>
export type GetNoteLazyQueryHookResult = ReturnType<typeof useGetNoteLazyQuery>
export type GetNoteQueryResult = Apollo.QueryResult<
  GetNoteQuery,
  GetNoteQueryVariables
>
