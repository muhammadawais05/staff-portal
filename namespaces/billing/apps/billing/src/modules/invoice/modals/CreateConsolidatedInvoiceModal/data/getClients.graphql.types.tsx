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
export type GetClientsToConsolidateQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetClientsToConsolidateQuery = {
  node?: Types.Maybe<{
    hierarchy?: Types.Maybe<{
      clients: {
        nodes: Array<{
          id: string
          fullName: string
          invoices?: Types.Maybe<{ totalCount: number }>
        }>
      }
    }>
  }>
}

export const GetClientsToConsolidateDocument = gql`
  query GetClientsToConsolidate($id: ID!) {
    node(id: $id) {
      ... on Client {
        hierarchy {
          clients {
            nodes {
              id
              fullName
              invoices(filter: { consolidatable: true }) {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`

/**
 * __useGetClientsToConsolidateQuery__
 *
 * To run a query within a React component, call `useGetClientsToConsolidateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientsToConsolidateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientsToConsolidateQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetClientsToConsolidateQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetClientsToConsolidateQuery,
    GetClientsToConsolidateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetClientsToConsolidateQuery,
    GetClientsToConsolidateQueryVariables
  >(GetClientsToConsolidateDocument, options)
}
export function useGetClientsToConsolidateLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetClientsToConsolidateQuery,
    GetClientsToConsolidateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetClientsToConsolidateQuery,
    GetClientsToConsolidateQueryVariables
  >(GetClientsToConsolidateDocument, options)
}
export type GetClientsToConsolidateQueryHookResult = ReturnType<
  typeof useGetClientsToConsolidateQuery
>
export type GetClientsToConsolidateLazyQueryHookResult = ReturnType<
  typeof useGetClientsToConsolidateLazyQuery
>
export type GetClientsToConsolidateQueryResult = Apollo.QueryResult<
  GetClientsToConsolidateQuery,
  GetClientsToConsolidateQueryVariables
>
