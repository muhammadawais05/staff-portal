/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { OperationItemFragment } from '../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { OperationItemFragmentDoc } from '../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetDownloadExpectedCommissionsOperationQueryVariables =
  Types.Exact<{ [key: string]: never }>

export type GetDownloadExpectedCommissionsOperationQuery = {
  viewer: { operations: { downloadExpectedCommissions: OperationItemFragment } }
}

export const GetDownloadExpectedCommissionsOperationQueryDocument = gql`
  query GetDownloadExpectedCommissionsOperationQuery {
    viewer {
      operations {
        downloadExpectedCommissions {
          ...OperationItem
        }
      }
    }
  }
  ${OperationItemFragmentDoc}
`

/**
 * __useGetDownloadExpectedCommissionsOperationQuery__
 *
 * To run a query within a React component, call `useGetDownloadExpectedCommissionsOperationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDownloadExpectedCommissionsOperationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDownloadExpectedCommissionsOperationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDownloadExpectedCommissionsOperationQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetDownloadExpectedCommissionsOperationQuery,
    GetDownloadExpectedCommissionsOperationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetDownloadExpectedCommissionsOperationQuery,
    GetDownloadExpectedCommissionsOperationQueryVariables
  >(GetDownloadExpectedCommissionsOperationQueryDocument, options)
}
export function useGetDownloadExpectedCommissionsOperationQueryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetDownloadExpectedCommissionsOperationQuery,
    GetDownloadExpectedCommissionsOperationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetDownloadExpectedCommissionsOperationQuery,
    GetDownloadExpectedCommissionsOperationQueryVariables
  >(GetDownloadExpectedCommissionsOperationQueryDocument, options)
}
export type GetDownloadExpectedCommissionsOperationQueryHookResult = ReturnType<
  typeof useGetDownloadExpectedCommissionsOperationQuery
>
export type GetDownloadExpectedCommissionsOperationQueryLazyQueryHookResult =
  ReturnType<typeof useGetDownloadExpectedCommissionsOperationQueryLazyQuery>
export type GetDownloadExpectedCommissionsOperationQueryQueryResult =
  Apollo.QueryResult<
    GetDownloadExpectedCommissionsOperationQuery,
    GetDownloadExpectedCommissionsOperationQueryVariables
  >
