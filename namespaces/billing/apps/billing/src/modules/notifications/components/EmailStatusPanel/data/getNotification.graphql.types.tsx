/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type InvoiceNotificationFragment = {
  email: string
  status: Types.EmailDeliveryStatus
  description?: Types.Maybe<string>
}

export type PaymentNotificationFragment = {
  email: string
  status: Types.EmailDeliveryStatus
  description?: Types.Maybe<string>
}

export type GetNotificationQueryVariables = Types.Exact<{
  nodeId: Types.Scalars['ID']
}>

export type GetNotificationQuery = {
  node?: Types.Maybe<
    | {
        id: string
        monitoringStartDate?: Types.Maybe<
          `${`${number}-${number}-${number}`}` | ''
        >
        notificationSentAt?: Types.Maybe<
          `${`${number}-${number}-${number}`}` | ''
        >
        notifications: {
          unsentReasonKey?: Types.Maybe<Types.InvoiceNotificationUnsentReason>
          sentAt?: Types.Maybe<
            | `${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}`
            | ''
          >
          nodes: Array<InvoiceNotificationFragment>
        }
      }
    | {
        id: string
        monitoringStartDate?: Types.Maybe<
          `${`${number}-${number}-${number}`}` | ''
        >
        notificationSentAt?: Types.Maybe<
          `${`${number}-${number}-${number}`}` | ''
        >
        notifications: {
          sentAt?: Types.Maybe<
            | `${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}`
            | ''
          >
          nodes: Array<PaymentNotificationFragment>
        }
      }
  >
}

export const InvoiceNotificationFragmentDoc = gql`
  fragment InvoiceNotificationFragment on InvoiceNotificationStatus {
    email
    status
    description
  }
`
export const PaymentNotificationFragmentDoc = gql`
  fragment PaymentNotificationFragment on PaymentNotificationStatus {
    email
    status
    description
  }
`
export const GetNotificationDocument = gql`
  query GetNotification($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Invoice {
        id
        monitoringStartDate
        notificationSentAt
        notifications {
          nodes {
            ...InvoiceNotificationFragment
          }
          unsentReasonKey
          sentAt
        }
      }
      ... on Payment {
        id
        monitoringStartDate
        notificationSentAt
        notifications {
          nodes {
            ...PaymentNotificationFragment
          }
          sentAt
        }
      }
    }
  }
  ${InvoiceNotificationFragmentDoc}
  ${PaymentNotificationFragmentDoc}
`

/**
 * __useGetNotificationQuery__
 *
 * To run a query within a React component, call `useGetNotificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationQuery({
 *   variables: {
 *      nodeId: // value for 'nodeId'
 *   },
 * });
 */
export function useGetNotificationQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetNotificationQuery,
    GetNotificationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetNotificationQuery,
    GetNotificationQueryVariables
  >(GetNotificationDocument, options)
}
export function useGetNotificationLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetNotificationQuery,
    GetNotificationQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetNotificationQuery,
    GetNotificationQueryVariables
  >(GetNotificationDocument, options)
}
export type GetNotificationQueryHookResult = ReturnType<
  typeof useGetNotificationQuery
>
export type GetNotificationLazyQueryHookResult = ReturnType<
  typeof useGetNotificationLazyQuery
>
export type GetNotificationQueryResult = Apollo.QueryResult<
  GetNotificationQuery,
  GetNotificationQueryVariables
>
