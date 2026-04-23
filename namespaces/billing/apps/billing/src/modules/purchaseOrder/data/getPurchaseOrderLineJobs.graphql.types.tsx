/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { GetJobListItemFragment } from '../../job/components/data/getJobListItemFragment.graphql.types'
import { GetEngagementListItemFragment } from '../../job/components/data/getEngagementListItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { GetJobListItemFragmentDoc } from '../../job/components/data/getJobListItemFragment.graphql.types'
import { GetEngagementListItemFragmentDoc } from '../../job/components/data/getEngagementListItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPurchaseOrderLineJobsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetPurchaseOrderLineJobsQuery = {
  node?: Types.Maybe<{
    id: string
    jobs: { nodes: Array<GetJobListItemFragment> }
    engagements: { nodes: Array<GetEngagementListItemFragment> }
  }>
}

export const GetPurchaseOrderLineJobsDocument = gql`
  query GetPurchaseOrderLineJobs($id: ID!) {
    node(id: $id) {
      ... on PurchaseOrderLine {
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
 * __useGetPurchaseOrderLineJobsQuery__
 *
 * To run a query within a React component, call `useGetPurchaseOrderLineJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPurchaseOrderLineJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPurchaseOrderLineJobsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPurchaseOrderLineJobsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPurchaseOrderLineJobsQuery,
    GetPurchaseOrderLineJobsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPurchaseOrderLineJobsQuery,
    GetPurchaseOrderLineJobsQueryVariables
  >(GetPurchaseOrderLineJobsDocument, options)
}
export function useGetPurchaseOrderLineJobsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPurchaseOrderLineJobsQuery,
    GetPurchaseOrderLineJobsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPurchaseOrderLineJobsQuery,
    GetPurchaseOrderLineJobsQueryVariables
  >(GetPurchaseOrderLineJobsDocument, options)
}
export type GetPurchaseOrderLineJobsQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderLineJobsQuery
>
export type GetPurchaseOrderLineJobsLazyQueryHookResult = ReturnType<
  typeof useGetPurchaseOrderLineJobsLazyQuery
>
export type GetPurchaseOrderLineJobsQueryResult = Apollo.QueryResult<
  GetPurchaseOrderLineJobsQuery,
  GetPurchaseOrderLineJobsQueryVariables
>
