/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { ExpectedCommissionFragment } from '../../__fragments__/expectedCommissionFragment.graphql.types'
import { WebResourceFragment } from '../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { ExpectedCommissionFragmentDoc } from '../../__fragments__/expectedCommissionFragment.graphql.types'
import { WebResourceFragmentDoc } from '../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetMyExpectedCommissionsQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
}>

export type GetMyExpectedCommissionsQuery = {
  viewer: {
    expectedCommissions?: Types.Maybe<{
      totalCount: number
      groups: Array<{
        month: number
        year: number
        expectedCommissions: Array<MyExpectedCommissionFragment>
      }>
    }>
  }
}

export type MyExpectedCommissionFragment = {
  client?: Types.Maybe<{ id: string; webResource: WebResourceFragment }>
  invoiceReasonEngagement?: Types.Maybe<{
    id: string
    job?: Types.Maybe<{
      id: string
      title: string
      webResource: WebResourceFragment
    }>
  }>
  invoiceReasonJob?: Types.Maybe<{
    id: string
    title: string
    webResource: WebResourceFragment
  }>
} & ExpectedCommissionFragment

export const MyExpectedCommissionFragmentDoc = gql`
  fragment MyExpectedCommissionFragment on ExpectedCommission {
    ...ExpectedCommissionFragment
    client {
      id
      webResource {
        ...WebResourceFragment
      }
    }
    invoiceReasonEngagement: invoiceReason {
      ... on Engagement {
        id
        job {
          id
          title
          webResource {
            ...WebResourceFragment
          }
        }
      }
    }
    invoiceReasonJob: invoiceReason {
      ... on Job {
        id
        title
        webResource {
          ...WebResourceFragment
        }
      }
    }
  }
  ${ExpectedCommissionFragmentDoc}
  ${WebResourceFragmentDoc}
`
export const GetMyExpectedCommissionsDocument = gql`
  query GetMyExpectedCommissions($pagination: OffsetPagination!) {
    viewer {
      expectedCommissions(pagination: $pagination) {
        totalCount
        groups {
          month
          year
          expectedCommissions {
            ...MyExpectedCommissionFragment
          }
        }
      }
    }
  }
  ${MyExpectedCommissionFragmentDoc}
`

/**
 * __useGetMyExpectedCommissionsQuery__
 *
 * To run a query within a React component, call `useGetMyExpectedCommissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyExpectedCommissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyExpectedCommissionsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetMyExpectedCommissionsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetMyExpectedCommissionsQuery,
    GetMyExpectedCommissionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetMyExpectedCommissionsQuery,
    GetMyExpectedCommissionsQueryVariables
  >(GetMyExpectedCommissionsDocument, options)
}
export function useGetMyExpectedCommissionsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMyExpectedCommissionsQuery,
    GetMyExpectedCommissionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetMyExpectedCommissionsQuery,
    GetMyExpectedCommissionsQueryVariables
  >(GetMyExpectedCommissionsDocument, options)
}
export type GetMyExpectedCommissionsQueryHookResult = ReturnType<
  typeof useGetMyExpectedCommissionsQuery
>
export type GetMyExpectedCommissionsLazyQueryHookResult = ReturnType<
  typeof useGetMyExpectedCommissionsLazyQuery
>
export type GetMyExpectedCommissionsQueryResult = Apollo.QueryResult<
  GetMyExpectedCommissionsQuery,
  GetMyExpectedCommissionsQueryVariables
>
