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
export type GetPaymentGroupsListHeaderQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.PaymentGroupsFilter
}>

export type GetPaymentGroupsListHeaderQuery = {
  paymentGroups: { operations: { payPaymentGroups: OperationItemFragment } }
}

export const GetPaymentGroupsListHeaderDocument = gql`
  query GetPaymentGroupsListHeader(
    $pagination: OffsetPagination!
    $filter: PaymentGroupsFilter!
  ) {
    paymentGroups(pagination: $pagination, filter: $filter) {
      operations {
        payPaymentGroups {
          ...OperationItem
        }
      }
    }
  }
  ${OperationItemFragmentDoc}
`

/**
 * __useGetPaymentGroupsListHeaderQuery__
 *
 * To run a query within a React component, call `useGetPaymentGroupsListHeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentGroupsListHeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentGroupsListHeaderQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetPaymentGroupsListHeaderQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPaymentGroupsListHeaderQuery,
    GetPaymentGroupsListHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPaymentGroupsListHeaderQuery,
    GetPaymentGroupsListHeaderQueryVariables
  >(GetPaymentGroupsListHeaderDocument, options)
}
export function useGetPaymentGroupsListHeaderLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentGroupsListHeaderQuery,
    GetPaymentGroupsListHeaderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPaymentGroupsListHeaderQuery,
    GetPaymentGroupsListHeaderQueryVariables
  >(GetPaymentGroupsListHeaderDocument, options)
}
export type GetPaymentGroupsListHeaderQueryHookResult = ReturnType<
  typeof useGetPaymentGroupsListHeaderQuery
>
export type GetPaymentGroupsListHeaderLazyQueryHookResult = ReturnType<
  typeof useGetPaymentGroupsListHeaderLazyQuery
>
export type GetPaymentGroupsListHeaderQueryResult = Apollo.QueryResult<
  GetPaymentGroupsListHeaderQuery,
  GetPaymentGroupsListHeaderQueryVariables
>
