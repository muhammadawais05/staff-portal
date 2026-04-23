/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { WebResourceFragment } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { WebResourceFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPaymentDetailsTableQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetPaymentDetailsTableQuery = {
  node?: Types.Maybe<{
    amount: string
    balanceDue: string
    billingCycleGid?: Types.Maybe<string>
    documentNote?: Types.Maybe<string>
    createdOn: `${`${number}-${number}-${number}`}` | ''
    description?: Types.Maybe<string>
    dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
    id: string
    paymentKind: Types.PaymentKind
    paymentMethod?: Types.Maybe<Types.PaymentOptionPaymentMethod>
    status: Types.DocumentStatus
    client?: Types.Maybe<{ id: string; webResource: WebResourceFragment }>
    job?: Types.Maybe<{ id: string; webResource: WebResourceFragment }>
    paymentGroup?: Types.Maybe<{
      id: string
      number: number
      webResource: WebResourceFragment
    }>
    subjectObject:
      | { id: string; fullName: string; webResource: WebResourceFragment }
      | { id: string; fullName: string; webResource: WebResourceFragment }
      | { id: string; fullName: string; webResource: WebResourceFragment }
      | { id: string; fullName: string; webResource: WebResourceFragment }
      | { id: string; fullName: string; webResource: WebResourceFragment }
      | ({
          id: string
          fullName: string
          webResource: WebResourceFragment
        } & GetPaymentDetailsTableSubjectObjectTalentFragment)
      | { id: string; fullName: string; webResource: WebResourceFragment }
  }>
}

export type GetPaymentDetailsTableSubjectObjectTalentFragment = {
  activePaymentHold?: Types.Maybe<{
    creationReason?: Types.Maybe<string>
    dateThreshold?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  }>
}

export const GetPaymentDetailsTableSubjectObjectTalentFragmentDoc = gql`
  fragment GetPaymentDetailsTableSubjectObjectTalent on Talent {
    activePaymentHold {
      creationReason
      dateThreshold
    }
  }
`
export const GetPaymentDetailsTableDocument = gql`
  query GetPaymentDetailsTable($id: ID!) {
    node(id: $id) {
      ... on Payment {
        amount
        balanceDue
        billingCycleGid
        documentNote
        client {
          id
          webResource {
            ...WebResourceFragment
          }
        }
        createdOn
        description
        dueDate
        id
        job {
          id
          webResource {
            ...WebResourceFragment
          }
        }
        paymentKind
        paymentGroup {
          id
          number
          webResource {
            ...WebResourceFragment
          }
        }
        paymentMethod
        status
        subjectObject {
          ... on Client {
            id
            fullName
            webResource {
              ...WebResourceFragment
            }
          }
          ... on CompanyRepresentative {
            id
            fullName
            webResource {
              ...WebResourceFragment
            }
          }
          ... on Leader {
            id
            fullName
            webResource {
              ...WebResourceFragment
            }
          }
          ... on Staff {
            id
            fullName
            webResource {
              ...WebResourceFragment
            }
          }
          ... on ReferralPartner {
            id
            fullName
            webResource {
              ...WebResourceFragment
            }
          }
          ... on Talent {
            id
            fullName
            webResource {
              ...WebResourceFragment
            }
            ...GetPaymentDetailsTableSubjectObjectTalent
          }
          ... on TalentPartner {
            id
            fullName
            webResource {
              ...WebResourceFragment
            }
          }
        }
      }
    }
  }
  ${WebResourceFragmentDoc}
  ${GetPaymentDetailsTableSubjectObjectTalentFragmentDoc}
`

/**
 * __useGetPaymentDetailsTableQuery__
 *
 * To run a query within a React component, call `useGetPaymentDetailsTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentDetailsTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentDetailsTableQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPaymentDetailsTableQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPaymentDetailsTableQuery,
    GetPaymentDetailsTableQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPaymentDetailsTableQuery,
    GetPaymentDetailsTableQueryVariables
  >(GetPaymentDetailsTableDocument, options)
}
export function useGetPaymentDetailsTableLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentDetailsTableQuery,
    GetPaymentDetailsTableQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPaymentDetailsTableQuery,
    GetPaymentDetailsTableQueryVariables
  >(GetPaymentDetailsTableDocument, options)
}
export type GetPaymentDetailsTableQueryHookResult = ReturnType<
  typeof useGetPaymentDetailsTableQuery
>
export type GetPaymentDetailsTableLazyQueryHookResult = ReturnType<
  typeof useGetPaymentDetailsTableLazyQuery
>
export type GetPaymentDetailsTableQueryResult = Apollo.QueryResult<
  GetPaymentDetailsTableQuery,
  GetPaymentDetailsTableQueryVariables
>
