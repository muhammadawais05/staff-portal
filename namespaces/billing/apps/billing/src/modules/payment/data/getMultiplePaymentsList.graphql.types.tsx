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
export type GetMultiplePaymentsListQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.PaymentsFilter
}>

export type GetMultiplePaymentsListQuery = {
  payments: {
    totalCount?: Types.Maybe<number>
    nodes: Array<PaymentListItemFragment>
  }
}

export const GetMultiplePaymentsListDocument = gql`
  query GetMultiplePaymentsList(
    $pagination: OffsetPagination!
    $filter: PaymentsFilter!
  ) {
    payments(filter: $filter, pagination: $pagination) {
      totalCount
      nodes {
        ...PaymentListItemFragment
      }
    }
  }
  ${PaymentListItemFragmentDoc}
`

/**
 * __useGetMultiplePaymentsListQuery__
 *
 * To run a query within a React component, call `useGetMultiplePaymentsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMultiplePaymentsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMultiplePaymentsListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetMultiplePaymentsListQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetMultiplePaymentsListQuery,
    GetMultiplePaymentsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetMultiplePaymentsListQuery,
    GetMultiplePaymentsListQueryVariables
  >(GetMultiplePaymentsListDocument, options)
}
export function useGetMultiplePaymentsListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMultiplePaymentsListQuery,
    GetMultiplePaymentsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetMultiplePaymentsListQuery,
    GetMultiplePaymentsListQueryVariables
  >(GetMultiplePaymentsListDocument, options)
}
export type GetMultiplePaymentsListQueryHookResult = ReturnType<
  typeof useGetMultiplePaymentsListQuery
>
export type GetMultiplePaymentsListLazyQueryHookResult = ReturnType<
  typeof useGetMultiplePaymentsListLazyQuery
>
export type GetMultiplePaymentsListQueryResult = Apollo.QueryResult<
  GetMultiplePaymentsListQuery,
  GetMultiplePaymentsListQueryVariables
>
