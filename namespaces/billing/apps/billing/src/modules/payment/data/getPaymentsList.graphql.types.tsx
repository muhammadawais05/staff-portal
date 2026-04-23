/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { PaymentListItemFragment } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentListItemFragment.graphql.types'
import { gql } from '@apollo/client'
import { PaymentListItemFragmentDoc } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentListItemFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPaymentsListQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.PaymentsFilter
}>

export type GetPaymentsListQuery = {
  payments?: Types.Maybe<{
    totalCount?: Types.Maybe<number>
    groups?: Types.Maybe<
      Array<{
        month: number
        year: number
        payments: Array<PaymentListItemFragment>
      }>
    >
  }>
}

export const GetPaymentsListDocument = gql`
  query GetPaymentsList(
    $pagination: OffsetPagination!
    $filter: PaymentsFilter!
  ) {
    payments: paymentsNullable(filter: $filter, pagination: $pagination) {
      totalCount
      groups {
        month
        year
        payments {
          ...PaymentListItemFragment
        }
      }
    }
  }
  ${PaymentListItemFragmentDoc}
`

/**
 * __useGetPaymentsListQuery__
 *
 * To run a query within a React component, call `useGetPaymentsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetPaymentsListQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPaymentsListQuery,
    GetPaymentsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPaymentsListQuery,
    GetPaymentsListQueryVariables
  >(GetPaymentsListDocument, options)
}
export function useGetPaymentsListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentsListQuery,
    GetPaymentsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPaymentsListQuery,
    GetPaymentsListQueryVariables
  >(GetPaymentsListDocument, options)
}
export type GetPaymentsListQueryHookResult = ReturnType<
  typeof useGetPaymentsListQuery
>
export type GetPaymentsListLazyQueryHookResult = ReturnType<
  typeof useGetPaymentsListLazyQuery
>
export type GetPaymentsListQueryResult = Apollo.QueryResult<
  GetPaymentsListQuery,
  GetPaymentsListQueryVariables
>
