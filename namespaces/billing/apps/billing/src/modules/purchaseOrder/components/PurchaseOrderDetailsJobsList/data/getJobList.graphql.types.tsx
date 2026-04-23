/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { GetJobListItemFragment } from '../../../../job/components/data/getJobListItemFragment.graphql.types'
import { GetEngagementListItemFragment } from '../../../../job/components/data/getEngagementListItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { GetJobListItemFragmentDoc } from '../../../../job/components/data/getJobListItemFragment.graphql.types'
import { GetEngagementListItemFragmentDoc } from '../../../../job/components/data/getEngagementListItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetJobListQueryVariables = Types.Exact<{
  ids: Array<Types.Scalars['ID']> | Types.Scalars['ID']
}>

export type GetJobListQuery = {
  nodes: Array<
    Types.Maybe<{
      id: string
      jobs: { nodes: Array<GetJobListItemFragment> }
      engagements: { nodes: Array<GetEngagementListItemFragment> }
    }>
  >
}

export const GetJobListDocument = gql`
  query GetJobList($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on PurchaseOrder {
        id
        jobs {
          nodes {
            ...GetJobListItem
          }
        }
        engagements {
          nodes {
            ...GetEngagementListItem
          }
        }
      }
    }
  }
  ${GetJobListItemFragmentDoc}
  ${GetEngagementListItemFragmentDoc}
`

/**
 * __useGetJobListQuery__
 *
 * To run a query within a React component, call `useGetJobListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJobListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJobListQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useGetJobListQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetJobListQuery,
    GetJobListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<GetJobListQuery, GetJobListQueryVariables>(
    GetJobListDocument,
    options
  )
}
export function useGetJobListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetJobListQuery,
    GetJobListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetJobListQuery,
    GetJobListQueryVariables
  >(GetJobListDocument, options)
}
export type GetJobListQueryHookResult = ReturnType<typeof useGetJobListQuery>
export type GetJobListLazyQueryHookResult = ReturnType<
  typeof useGetJobListLazyQuery
>
export type GetJobListQueryResult = Apollo.QueryResult<
  GetJobListQuery,
  GetJobListQueryVariables
>
