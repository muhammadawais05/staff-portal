/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { JobFragment } from '../../../../__fragments__/jobFragment.graphql.types'
import { WebResourceFragment } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { JobFragmentDoc } from '../../../../__fragments__/jobFragment.graphql.types'
import { WebResourceFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetAddMemorandumQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetAddMemorandumQuery = {
  node?: Types.Maybe<
    GetAddMemorandumInvoiceFragment | GetAddMemorandumPaymentFragment
  >
}

export type GetAddMemorandumInvoiceFragment = {
  amount: string
  commissionable: boolean
  documentNumber: number
  gid: string
  id: string
  invoiceKind: Types.InvoiceKind
  status: Types.DocumentStatus
  billingCycle?: Types.Maybe<GetAddMemorandumBillingCycleFragment>
  job?: Types.Maybe<JobFragment>
  originalInvoices?: Types.Maybe<OriginalInvoicesFragment>
  reason?: Types.Maybe<
    | {
        id: string
        endDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
      }
    | { id: string }
  >
  subjectObject: { id: string; fullName: string }
  talent?: Types.Maybe<{ id: string; fullName: string }>
  webResource: WebResourceFragment
}

export type GetAddMemorandumPaymentFragment = {
  amount: string
  documentNumber: number
  gid: string
  id: string
  paymentKind: Types.PaymentKind
  paidAmount: string
  paymentMethod?: Types.Maybe<Types.PaymentOptionPaymentMethod>
  status: Types.DocumentStatus
  client?: Types.Maybe<{ id: string; fullName: string }>
  billingCycle?: Types.Maybe<GetAddMemorandumBillingCycleFragment>
  job?: Types.Maybe<JobFragment>
  reason?: Types.Maybe<{
    id: string
    endDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  }>
  subjectObject:
    | { id: string; fullName: string }
    | { id: string; fullName: string }
    | { id: string; fullName: string }
    | { id: string; fullName: string }
    | { id: string; fullName: string }
    | { id: string; fullName: string }
    | { id: string; fullName: string }
  webResource: WebResourceFragment
}

export type GetAddMemorandumBillingCycleFragment = {
  startDate: `${`${number}-${number}-${number}`}` | ''
  endDate: `${`${number}-${number}-${number}`}` | ''
  hours: string
  originalCommitment: { availability: Types.CommitmentAvailability }
  actualCommitment: { availability: Types.CommitmentAvailability }
}

export type OriginalInvoicesFragment = {
  nodes: Array<{
    id: string
    cleanOutstandingAmount?: Types.Maybe<string>
    documentNumber: number
    associatedMemorandums: {
      nodes: Array<{
        id: string
        amount: string
        balance: Types.MemorandumBalance
      }>
    }
  }>
}

export const GetAddMemorandumBillingCycleFragmentDoc = gql`
  fragment GetAddMemorandumBillingCycle on BillingCycle {
    startDate
    endDate
    hours
    originalCommitment {
      availability
    }
    actualCommitment {
      availability
    }
  }
`
export const OriginalInvoicesFragmentDoc = gql`
  fragment OriginalInvoicesFragment on InvoiceConnection {
    nodes {
      id
      associatedMemorandums {
        nodes {
          id
          amount
          balance
        }
      }
      cleanOutstandingAmount
      documentNumber
    }
  }
`
export const GetAddMemorandumInvoiceFragmentDoc = gql`
  fragment GetAddMemorandumInvoice on Invoice {
    amount
    commissionable
    documentNumber
    billingCycle {
      ...GetAddMemorandumBillingCycle
    }
    gid
    id
    job {
      ...JobFragment
    }
    invoiceKind
    originalInvoices {
      ...OriginalInvoicesFragment
    }
    reason {
      ... on Engagement {
        id
        endDate
      }
      ... on Job {
        id
      }
    }
    status
    subjectObject {
      id
      fullName
    }
    talent {
      id
      fullName
    }
    webResource {
      ...WebResourceFragment
    }
  }
  ${GetAddMemorandumBillingCycleFragmentDoc}
  ${JobFragmentDoc}
  ${OriginalInvoicesFragmentDoc}
  ${WebResourceFragmentDoc}
`
export const GetAddMemorandumPaymentFragmentDoc = gql`
  fragment GetAddMemorandumPayment on Payment {
    amount
    client {
      id
      fullName
    }
    documentNumber
    billingCycle {
      ...GetAddMemorandumBillingCycle
    }
    gid
    id
    job {
      ...JobFragment
    }
    paymentKind
    paidAmount
    paymentMethod
    reason {
      ... on Engagement {
        id
        endDate
      }
    }
    status
    subjectObject {
      ... on Client {
        id
        fullName
      }
      ... on CompanyRepresentative {
        id
        fullName
      }
      ... on Leader {
        id
        fullName
      }
      ... on ReferralPartner {
        id
        fullName
      }
      ... on Staff {
        id
        fullName
      }
      ... on Talent {
        id
        fullName
      }
      ... on TalentPartner {
        id
        fullName
      }
    }
    webResource {
      ...WebResourceFragment
    }
  }
  ${GetAddMemorandumBillingCycleFragmentDoc}
  ${JobFragmentDoc}
  ${WebResourceFragmentDoc}
`
export const GetAddMemorandumDocument = gql`
  query GetAddMemorandum($id: ID!) {
    node(id: $id) {
      ... on Invoice {
        ...GetAddMemorandumInvoice
      }
      ... on Payment {
        ...GetAddMemorandumPayment
      }
    }
  }
  ${GetAddMemorandumInvoiceFragmentDoc}
  ${GetAddMemorandumPaymentFragmentDoc}
`

/**
 * __useGetAddMemorandumQuery__
 *
 * To run a query within a React component, call `useGetAddMemorandumQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAddMemorandumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAddMemorandumQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAddMemorandumQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetAddMemorandumQuery,
    GetAddMemorandumQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetAddMemorandumQuery,
    GetAddMemorandumQueryVariables
  >(GetAddMemorandumDocument, options)
}
export function useGetAddMemorandumLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetAddMemorandumQuery,
    GetAddMemorandumQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetAddMemorandumQuery,
    GetAddMemorandumQueryVariables
  >(GetAddMemorandumDocument, options)
}
export type GetAddMemorandumQueryHookResult = ReturnType<
  typeof useGetAddMemorandumQuery
>
export type GetAddMemorandumLazyQueryHookResult = ReturnType<
  typeof useGetAddMemorandumLazyQuery
>
export type GetAddMemorandumQueryResult = Apollo.QueryResult<
  GetAddMemorandumQuery,
  GetAddMemorandumQueryVariables
>
