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
export type GetProjectedCommissionsQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetProjectedCommissionsQuery = {
  viewer: {
    projectedCommissions?: Types.Maybe<{
      monthly: string
      weekly: string
      yearly: string
      rules: Array<{ commission: string; description: string }>
    }>
  }
}

export const GetProjectedCommissionsDocument = gql`
  query GetProjectedCommissions {
    viewer {
      projectedCommissions {
        rules {
          commission
          description
        }
        monthly
        weekly
        yearly
      }
    }
  }
`

/**
 * __useGetProjectedCommissionsQuery__
 *
 * To run a query within a React component, call `useGetProjectedCommissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectedCommissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectedCommissionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectedCommissionsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetProjectedCommissionsQuery,
    GetProjectedCommissionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetProjectedCommissionsQuery,
    GetProjectedCommissionsQueryVariables
  >(GetProjectedCommissionsDocument, options)
}
export function useGetProjectedCommissionsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetProjectedCommissionsQuery,
    GetProjectedCommissionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetProjectedCommissionsQuery,
    GetProjectedCommissionsQueryVariables
  >(GetProjectedCommissionsDocument, options)
}
export type GetProjectedCommissionsQueryHookResult = ReturnType<
  typeof useGetProjectedCommissionsQuery
>
export type GetProjectedCommissionsLazyQueryHookResult = ReturnType<
  typeof useGetProjectedCommissionsLazyQuery
>
export type GetProjectedCommissionsQueryResult = Apollo.QueryResult<
  GetProjectedCommissionsQuery,
  GetProjectedCommissionsQueryVariables
>
