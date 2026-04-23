/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { ReceivedPaymentListItemFragment } from '../../__fragments__/receivedPaymentListItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { ReceivedPaymentListItemFragmentDoc } from '../../__fragments__/receivedPaymentListItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetReceivedPaymentsListQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.PaymentsFilter
}>

export type GetReceivedPaymentsListQuery = {
  payments?: Types.Maybe<{
    totalCount?: Types.Maybe<number>
    groups?: Types.Maybe<
      Array<{
        month: number
        year: number
        payments: Array<ReceivedPaymentListItemFragment>
      }>
    >
  }>
}

export const GetReceivedPaymentsListDocument = gql`
  query GetReceivedPaymentsList(
    $pagination: OffsetPagination!
    $filter: PaymentsFilter!
  ) {
    payments: paymentsNullable(filter: $filter, pagination: $pagination) {
      totalCount
      groups {
        month
        year
        payments {
          ...ReceivedPaymentListItemFragment
        }
      }
    }
  }
  ${ReceivedPaymentListItemFragmentDoc}
`

/**
 * __useGetReceivedPaymentsListQuery__
 *
 * To run a query within a React component, call `useGetReceivedPaymentsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReceivedPaymentsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReceivedPaymentsListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetReceivedPaymentsListQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetReceivedPaymentsListQuery,
    GetReceivedPaymentsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetReceivedPaymentsListQuery,
    GetReceivedPaymentsListQueryVariables
  >(GetReceivedPaymentsListDocument, options)
}
export function useGetReceivedPaymentsListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetReceivedPaymentsListQuery,
    GetReceivedPaymentsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetReceivedPaymentsListQuery,
    GetReceivedPaymentsListQueryVariables
  >(GetReceivedPaymentsListDocument, options)
}
export type GetReceivedPaymentsListQueryHookResult = ReturnType<
  typeof useGetReceivedPaymentsListQuery
>
export type GetReceivedPaymentsListLazyQueryHookResult = ReturnType<
  typeof useGetReceivedPaymentsListLazyQuery
>
export type GetReceivedPaymentsListQueryResult = Apollo.QueryResult<
  GetReceivedPaymentsListQuery,
  GetReceivedPaymentsListQueryVariables
>
