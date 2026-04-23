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
export type GetUpdateIssueDateQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID']
}>

export type GetUpdateIssueDateQuery = {
  node?: Types.Maybe<{
    documentNumber: number
    createdOn: `${`${number}-${number}-${number}`}` | ''
    issueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
    id: string
  }>
}

export const GetUpdateIssueDateDocument = gql`
  query GetUpdateIssueDate($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Invoice {
        documentNumber
        createdOn
        issueDate
        id
      }
    }
  }
`

/**
 * __useGetUpdateIssueDateQuery__
 *
 * To run a query within a React component, call `useGetUpdateIssueDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpdateIssueDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpdateIssueDateQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetUpdateIssueDateQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetUpdateIssueDateQuery,
    GetUpdateIssueDateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetUpdateIssueDateQuery,
    GetUpdateIssueDateQueryVariables
  >(GetUpdateIssueDateDocument, options)
}
export function useGetUpdateIssueDateLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUpdateIssueDateQuery,
    GetUpdateIssueDateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetUpdateIssueDateQuery,
    GetUpdateIssueDateQueryVariables
  >(GetUpdateIssueDateDocument, options)
}
export type GetUpdateIssueDateQueryHookResult = ReturnType<
  typeof useGetUpdateIssueDateQuery
>
export type GetUpdateIssueDateLazyQueryHookResult = ReturnType<
  typeof useGetUpdateIssueDateLazyQuery
>
export type GetUpdateIssueDateQueryResult = Apollo.QueryResult<
  GetUpdateIssueDateQuery,
  GetUpdateIssueDateQueryVariables
>
