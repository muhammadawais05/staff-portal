/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { OperationItemFragment } from '../../../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { OperationItemFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPaymentsListHeaderQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.PaymentsFilter
}>

export type GetPaymentsListHeaderQuery = {
  payments: {
    alreadyDownloadedCount?: Types.Maybe<number>
    totalCount?: Types.Maybe<number>
    operations?: Types.Maybe<{
      createPaymentGroup: OperationItemFragment
      downloadPaymentsFromSearch: OperationItemFragment
      payMultiplePayments: OperationItemFragment
    }>
  }
}

export const GetPaymentsListHeaderDocument = gql`
  query GetPaymentsListHeader(
    $pagination: OffsetPagination!
    $filter: PaymentsFilter!
  ) {
    payments(pagination: $pagination, filter: $filter) {
      alreadyDownloadedCount
      totalCount
      operations {
        createPaymentGroup {
          ...OperationItem
        }
        downloadPaymentsFromSearch {
          ...OperationItem
        }
        payMultiplePayments {
          ...OperationItem
        }
      }
    }
  }
  ${OperationItemFragmentDoc}
`

/**
 * __useGetPaymentsListHeaderQuery__
 *
 * To run a query within a React component, call `useGetPaymentsListHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsListHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsListHeaderQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetPaymentsListHeaderQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPaymentsListHeaderQuery,
    GetPaymentsListHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPaymentsListHeaderQuery,
    GetPaymentsListHeaderQueryVariables
  >(GetPaymentsListHeaderDocument, options)
}
export function useGetPaymentsListHeaderLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentsListHeaderQuery,
    GetPaymentsListHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPaymentsListHeaderQuery,
    GetPaymentsListHeaderQueryVariables
  >(GetPaymentsListHeaderDocument, options)
}
export type GetPaymentsListHeaderQueryHookResult = ReturnType<
  typeof useGetPaymentsListHeaderQuery
>
export type GetPaymentsListHeaderLazyQueryHookResult = ReturnType<
  typeof useGetPaymentsListHeaderLazyQuery
>
export type GetPaymentsListHeaderQueryResult = Apollo.QueryResult<
  GetPaymentsListHeaderQuery,
  GetPaymentsListHeaderQueryVariables
>
