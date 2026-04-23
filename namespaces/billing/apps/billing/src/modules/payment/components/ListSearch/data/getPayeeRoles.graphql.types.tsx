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
export type GetRolesQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetRolesQuery = { payeeRoles: Array<string> }

export const GetRolesDocument = gql`
  query GetRoles {
    payeeRoles
  }
`

/**
 * __useGetRolesQuery__
 *
 * To run a query within a React component, call `useGetRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRolesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetRolesQuery,
    GetRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<GetRolesQuery, GetRolesQueryVariables>(
    GetRolesDocument,
    options
  )
}
export function useGetRolesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetRolesQuery,
    GetRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<GetRolesQuery, GetRolesQueryVariables>(
    GetRolesDocument,
    options
  )
}
export type GetRolesQueryHookResult = ReturnType<typeof useGetRolesQuery>
export type GetRolesLazyQueryHookResult = ReturnType<
  typeof useGetRolesLazyQuery
>
export type GetRolesQueryResult = Apollo.QueryResult<
  GetRolesQuery,
  GetRolesQueryVariables
>
