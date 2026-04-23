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
export type GetJobTitleByEngagementQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetJobTitleByEngagementQuery = {
  node?: Types.Maybe<{
    __typename: 'Engagement'
    id: string
    job?: Types.Maybe<{ __typename: 'Job'; id: string; title: string }>
  }>
}

export const GetJobTitleByEngagementDocument = gql`
  query GetJobTitleByEngagement($id: ID!) {
    node(id: $id) {
      ... on Engagement {
        __typename
        id
        job {
          __typename
          id
          title
        }
      }
    }
  }
`

/**
 * __useGetJobTitleByEngagementQuery__
 *
 * To run a query within a React component, call `useGetJobTitleByEngagementQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobTitleByEngagementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobTitleByEngagementQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetJobTitleByEngagementQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetJobTitleByEngagementQuery,
    GetJobTitleByEngagementQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetJobTitleByEngagementQuery,
    GetJobTitleByEngagementQueryVariables
  >(GetJobTitleByEngagementDocument, options)
}
export function useGetJobTitleByEngagementLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetJobTitleByEngagementQuery,
    GetJobTitleByEngagementQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetJobTitleByEngagementQuery,
    GetJobTitleByEngagementQueryVariables
  >(GetJobTitleByEngagementDocument, options)
}
export type GetJobTitleByEngagementQueryHookResult = ReturnType<
  typeof useGetJobTitleByEngagementQuery
>
export type GetJobTitleByEngagementLazyQueryHookResult = ReturnType<
  typeof useGetJobTitleByEngagementLazyQuery
>
export type GetJobTitleByEngagementQueryResult = Apollo.QueryResult<
  GetJobTitleByEngagementQuery,
  GetJobTitleByEngagementQueryVariables
>
