/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { OperationItemFragment } from '../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { WebResourceFragment } from '../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { OperationItemFragmentDoc } from '../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { WebResourceFragmentDoc } from '../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPaymentGroupsListQueryVariables = Types.Exact<{
  pagination: Types.OffsetPagination
  filter: Types.PaymentGroupsFilter
}>

export type GetPaymentGroupsListQuery = {
  paymentGroupsNullable?: Types.Maybe<{
    totalCount?: Types.Maybe<number>
    nodes: Array<PaymentGroupItemFragment>
  }>
}

export type PaymentGroupItemFragment = {
  amount: string
  createdOn: `${`${number}-${number}-${number}`}` | ''
  id: string
  number: number
  status: Types.PaymentGroupStatus
  operations: { payPaymentGroup: OperationItemFragment }
  subject:
    | { id: string; webResource: WebResourceFragment }
    | { id: string; webResource: WebResourceFragment }
    | { id: string; webResource: WebResourceFragment }
    | { id: string; webResource: WebResourceFragment }
    | { id: string; webResource: WebResourceFragment }
    | { id: string; webResource: WebResourceFragment }
    | { id: string; webResource: WebResourceFragment }
  webResource: WebResourceFragment
  historyLink?: Types.Maybe<{ url?: Types.Maybe<string> }>
}

export const PaymentGroupItemFragmentDoc = gql`
  fragment PaymentGroupItem on PaymentGroup {
    amount
    createdOn
    id
    number
    status
    operations {
      payPaymentGroup {
        ...OperationItem
      }
    }
    subject {
      ... on Client {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      ... on CompanyRepresentative {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      ... on Leader {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      ... on ReferralPartner {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      ... on Talent {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      ... on TalentPartner {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      ... on Staff {
        id
        webResource {
          ...WebResourceFragment
        }
      }
    }
    webResource {
      ...WebResourceFragment
    }
    historyLink {
      url
    }
  }
  ${OperationItemFragmentDoc}
  ${WebResourceFragmentDoc}
`
export const GetPaymentGroupsListDocument = gql`
  query GetPaymentGroupsList(
    $pagination: OffsetPagination!
    $filter: PaymentGroupsFilter!
  ) {
    paymentGroupsNullable(filter: $filter, pagination: $pagination) {
      totalCount
      nodes {
        ...PaymentGroupItem
      }
    }
  }
  ${PaymentGroupItemFragmentDoc}
`

/**
 * __useGetPaymentGroupsListQuery__
 *
 * To run a query within a React component, call `useGetPaymentGroupsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentGroupsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentGroupsListQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetPaymentGroupsListQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPaymentGroupsListQuery,
    GetPaymentGroupsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPaymentGroupsListQuery,
    GetPaymentGroupsListQueryVariables
  >(GetPaymentGroupsListDocument, options)
}
export function useGetPaymentGroupsListLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentGroupsListQuery,
    GetPaymentGroupsListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPaymentGroupsListQuery,
    GetPaymentGroupsListQueryVariables
  >(GetPaymentGroupsListDocument, options)
}
export type GetPaymentGroupsListQueryHookResult = ReturnType<
  typeof useGetPaymentGroupsListQuery
>
export type GetPaymentGroupsListLazyQueryHookResult = ReturnType<
  typeof useGetPaymentGroupsListLazyQuery
>
export type GetPaymentGroupsListQueryResult = Apollo.QueryResult<
  GetPaymentGroupsListQuery,
  GetPaymentGroupsListQueryVariables
>
