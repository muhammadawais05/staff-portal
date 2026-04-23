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
export type GetReceivedPaymentsListHeaderQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetReceivedPaymentsListHeaderQuery = {
  viewer: {
    me: {
      operations: {
        downloadRolePaymentHistory: {
          callable: Types.OperationCallableTypes
          messages: Array<string>
        }
      }
    }
    operations: { downloadCommissions: OperationItemFragment }
    projectedCommissions?: Types.Maybe<{ available: boolean }>
  }
}

export const GetReceivedPaymentsListHeaderDocument = gql`
  query GetReceivedPaymentsListHeader {
    viewer {
      me {
        operations {
          downloadRolePaymentHistory {
            callable
            messages
          }
        }
      }
      operations {
        downloadCommissions {
          ...OperationItem
        }
      }
      projectedCommissions {
        available
      }
    }
  }
  ${OperationItemFragmentDoc}
`

/**
 * __useGetReceivedPaymentsListHeaderQuery__
 *
 * To run a query within a React component, call `useGetReceivedPaymentsListHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReceivedPaymentsListHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReceivedPaymentsListHeaderQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReceivedPaymentsListHeaderQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetReceivedPaymentsListHeaderQuery,
    GetReceivedPaymentsListHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetReceivedPaymentsListHeaderQuery,
    GetReceivedPaymentsListHeaderQueryVariables
  >(GetReceivedPaymentsListHeaderDocument, options)
}
export function useGetReceivedPaymentsListHeaderLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetReceivedPaymentsListHeaderQuery,
    GetReceivedPaymentsListHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetReceivedPaymentsListHeaderQuery,
    GetReceivedPaymentsListHeaderQueryVariables
  >(GetReceivedPaymentsListHeaderDocument, options)
}
export type GetReceivedPaymentsListHeaderQueryHookResult = ReturnType<
  typeof useGetReceivedPaymentsListHeaderQuery
>
export type GetReceivedPaymentsListHeaderLazyQueryHookResult = ReturnType<
  typeof useGetReceivedPaymentsListHeaderLazyQuery
>
export type GetReceivedPaymentsListHeaderQueryResult = Apollo.QueryResult<
  GetReceivedPaymentsListHeaderQuery,
  GetReceivedPaymentsListHeaderQueryVariables
>
