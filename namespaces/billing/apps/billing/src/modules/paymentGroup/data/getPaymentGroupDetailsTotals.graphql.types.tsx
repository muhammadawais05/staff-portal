/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { PaymentsTotalsFragment } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentsTotalsFragment.graphql.types'
import { gql } from '@apollo/client'
import { PaymentsTotalsFragmentDoc } from '../../../../../../libs/billing-widgets/src/modules/__fragments__/paymentsTotalsFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPaymentGroupDetailsTotalsQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID']
  pagination: Types.OffsetPagination
}>

export type GetPaymentGroupDetailsTotalsQuery = {
  node?: Types.Maybe<{
    id: string
    payments: {
      totalCount?: Types.Maybe<number>
      totals?: Types.Maybe<PaymentsTotalsFragment>
    }
  }>
}

export const GetPaymentGroupDetailsTotalsDocument = gql`
  query GetPaymentGroupDetailsTotals(
    $nodeId: ID!
    $pagination: OffsetPagination!
  ) {
    node(id: $nodeId) {
      ... on PaymentGroup {
        id
        payments(pagination: $pagination) {
          totalCount
          totals {
            ...PaymentsTotalsFragment
          }
        }
      }
    }
  }
  ${PaymentsTotalsFragmentDoc}
`

/**
 * __useGetPaymentGroupDetailsTotalsQuery__
 *
 * To run a query within a React component, call `useGetPaymentGroupDetailsTotalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentGroupDetailsTotalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentGroupDetailsTotalsQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetPaymentGroupDetailsTotalsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPaymentGroupDetailsTotalsQuery,
    GetPaymentGroupDetailsTotalsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPaymentGroupDetailsTotalsQuery,
    GetPaymentGroupDetailsTotalsQueryVariables
  >(GetPaymentGroupDetailsTotalsDocument, options)
}
export function useGetPaymentGroupDetailsTotalsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentGroupDetailsTotalsQuery,
    GetPaymentGroupDetailsTotalsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPaymentGroupDetailsTotalsQuery,
    GetPaymentGroupDetailsTotalsQueryVariables
  >(GetPaymentGroupDetailsTotalsDocument, options)
}
export type GetPaymentGroupDetailsTotalsQueryHookResult = ReturnType<
  typeof useGetPaymentGroupDetailsTotalsQuery
>
export type GetPaymentGroupDetailsTotalsLazyQueryHookResult = ReturnType<
  typeof useGetPaymentGroupDetailsTotalsLazyQuery
>
export type GetPaymentGroupDetailsTotalsQueryResult = Apollo.QueryResult<
  GetPaymentGroupDetailsTotalsQuery,
  GetPaymentGroupDetailsTotalsQueryVariables
>
