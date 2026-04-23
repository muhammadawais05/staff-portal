/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { InvoiceOperationsFragment } from '../../../../../../../../libs/billing/src/__fragments__/invoiceOperationsFragment.graphql.types'
import {
  BillingOptionFragment_AchBillingOption_,
  BillingOptionFragment_CreditCardBillingOption_,
  BillingOptionFragment_OtherBillingOption_,
  BillingOptionFragment_PaypalBillingOption_,
  BillingOptionFragment_WireBillingOption_
} from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/billingOptionFragment.graphql.types'
import { UnallocatedMemorandumNodesFragment } from '../../../../__fragments__/unallocatedMemorandumFragment.graphql.types'
import { WebResourceFragment } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { InvoiceOperationsFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/invoiceOperationsFragment.graphql.types'
import { BillingOptionFragmentDoc } from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/billingOptionFragment.graphql.types'
import { UnallocatedMemorandumNodesFragmentDoc } from '../../../../__fragments__/unallocatedMemorandumFragment.graphql.types'
import { WebResourceFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetPayModalInvoiceQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetPayModalInvoiceQuery = {
  node?: Types.Maybe<InvoiceModalFragment>
}

export type InvoiceModalFragment = {
  cleanAmountToPay?: Types.Maybe<string>
  discountApplied: boolean
  discountedAmountToPay: string
  documentNumber: number
  expectedClearanceDateForNewPendingReceipt?: Types.Maybe<
    `${`${number}-${number}-${number}`}` | ''
  >
  id: string
  invoiceKind: Types.InvoiceKind
  status: Types.DocumentStatus
  issueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  subjectObject: {
    availablePrepaymentBalance: string
    billingNotes?: Types.Maybe<string>
    fullName: string
    id: string
    hierarchy?: Types.Maybe<{
      clients: { nodes: Array<ClientWithUnappliedCashFragment> }
    }>
    billingOptions: {
      totalCount: number
      nodes: Array<
        | BillingOptionFragment_AchBillingOption_
        | BillingOptionFragment_CreditCardBillingOption_
        | BillingOptionFragment_OtherBillingOption_
        | BillingOptionFragment_PaypalBillingOption_
        | BillingOptionFragment_WireBillingOption_
      >
    }
    preferredBillingOption?: Types.Maybe<
      | BillingOptionFragment_AchBillingOption_
      | BillingOptionFragment_CreditCardBillingOption_
      | BillingOptionFragment_OtherBillingOption_
      | BillingOptionFragment_PaypalBillingOption_
      | BillingOptionFragment_WireBillingOption_
    >
    unallocatedMemorandums: UnallocatedMemorandumNodesFragment
    webResource: WebResourceFragment
  }
} & InvoiceOperationsFragment

export type ClientWithUnappliedCashFragment = {
  id: string
  _companyId?: Types.Maybe<number>
  fullName: string
  unappliedCashBalance: string
  unappliedCashEntries?: Types.Maybe<{
    nodes: Array<{
      id: string
      effectiveDate: `${`${number}-${number}-${number}`}` | ''
      availableAmount: string
    }>
  }>
}

export const ClientWithUnappliedCashFragmentDoc = gql`
  fragment ClientWithUnappliedCashFragment on Client {
    id
    _companyId
    fullName
    unappliedCashBalance
    unappliedCashEntries {
      nodes {
        id
        effectiveDate
        availableAmount
      }
    }
  }
`
export const InvoiceModalFragmentDoc = gql`
  fragment InvoiceModalFragment on Invoice {
    cleanAmountToPay
    discountApplied
    discountedAmountToPay
    documentNumber
    expectedClearanceDateForNewPendingReceipt
    id
    invoiceKind
    ...InvoiceOperationsFragment
    status
    issueDate
    subjectObject {
      availablePrepaymentBalance
      billingNotes
      hierarchy {
        clients {
          nodes {
            ...ClientWithUnappliedCashFragment
          }
        }
      }
      billingOptions(filter: { scope: VERIFIED }) {
        nodes {
          ...BillingOptionFragment
        }
        totalCount
      }
      fullName
      id
      preferredBillingOption {
        ...BillingOptionFragment
      }
      unallocatedMemorandums {
        ...UnallocatedMemorandumNodesFragment
      }
      webResource {
        ...WebResourceFragment
      }
    }
  }
  ${InvoiceOperationsFragmentDoc}
  ${ClientWithUnappliedCashFragmentDoc}
  ${BillingOptionFragmentDoc}
  ${UnallocatedMemorandumNodesFragmentDoc}
  ${WebResourceFragmentDoc}
`
export const GetPayModalInvoiceDocument = gql`
  query GetPayModalInvoice($id: ID!) {
    node(id: $id) {
      ... on Invoice {
        ...InvoiceModalFragment
      }
    }
  }
  ${InvoiceModalFragmentDoc}
`

/**
 * __useGetPayModalInvoiceQuery__
 *
 * To run a query within a React component, call `useGetPayModalInvoiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPayModalInvoiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPayModalInvoiceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPayModalInvoiceQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetPayModalInvoiceQuery,
    GetPayModalInvoiceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetPayModalInvoiceQuery,
    GetPayModalInvoiceQueryVariables
  >(GetPayModalInvoiceDocument, options)
}
export function useGetPayModalInvoiceLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPayModalInvoiceQuery,
    GetPayModalInvoiceQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetPayModalInvoiceQuery,
    GetPayModalInvoiceQueryVariables
  >(GetPayModalInvoiceDocument, options)
}
export type GetPayModalInvoiceQueryHookResult = ReturnType<
  typeof useGetPayModalInvoiceQuery
>
export type GetPayModalInvoiceLazyQueryHookResult = ReturnType<
  typeof useGetPayModalInvoiceLazyQuery
>
export type GetPayModalInvoiceQueryResult = Apollo.QueryResult<
  GetPayModalInvoiceQuery,
  GetPayModalInvoiceQueryVariables
>
