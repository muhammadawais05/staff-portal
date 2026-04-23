/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { NoteItemFragment } from '../../__fragments__/noteItemFragment.graphql.types'
import { OperationItemFragment } from '../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { NoteItemFragmentDoc } from '../../__fragments__/noteItemFragment.graphql.types'
import { OperationItemFragmentDoc } from '../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetNotesQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID']
}>

export type GetNotesQuery = {
  node?: Types.Maybe<
    | { id: string; notes?: Types.Maybe<CommercialDocumentNotesFragment> }
    | { id: string; notes?: Types.Maybe<CommercialDocumentNotesFragment> }
    | { id: string; notes?: Types.Maybe<CommercialDocumentNotesFragment> }
    | { id: string; notes?: Types.Maybe<CommercialDocumentNotesFragment> }
  >
}

export type CommercialDocumentNotesFragment = {
  nodes: Array<NoteItemFragment>
  operations: { createNote: OperationItemFragment }
}

export const CommercialDocumentNotesFragmentDoc = gql`
  fragment CommercialDocumentNotes on NoteConnection {
    nodes {
      ...NoteItem
    }
    operations {
      createNote {
        ...OperationItem
      }
    }
  }
  ${NoteItemFragmentDoc}
  ${OperationItemFragmentDoc}
`
export const GetNotesDocument = gql`
  query GetNotes($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Invoice {
        id
        notes(order: { direction: ASC, field: UPDATED_AT }) {
          ...CommercialDocumentNotes
        }
      }
      ... on Payment {
        id
        notes(order: { direction: ASC, field: UPDATED_AT }) {
          ...CommercialDocumentNotes
        }
      }
      ... on PurchaseOrder {
        id
        notes(order: { direction: ASC, field: UPDATED_AT }) {
          ...CommercialDocumentNotes
        }
      }
      ... on PurchaseOrderLine {
        id
        notes(order: { direction: ASC, field: UPDATED_AT }) {
          ...CommercialDocumentNotes
        }
      }
    }
  }
  ${CommercialDocumentNotesFragmentDoc}
`

/**
 * __useGetNotesQuery__
 *
 * To run a query within a React component, call `useGetNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotesQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetNotesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetNotesQuery,
    GetNotesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<GetNotesQuery, GetNotesQueryVariables>(
    GetNotesDocument,
    options
  )
}
export function useGetNotesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetNotesQuery,
    GetNotesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<GetNotesQuery, GetNotesQueryVariables>(
    GetNotesDocument,
    options
  )
}
export type GetNotesQueryHookResult = ReturnType<typeof useGetNotesQuery>
export type GetNotesLazyQueryHookResult = ReturnType<
  typeof useGetNotesLazyQuery
>
export type GetNotesQueryResult = Apollo.QueryResult<
  GetNotesQuery,
  GetNotesQueryVariables
>
