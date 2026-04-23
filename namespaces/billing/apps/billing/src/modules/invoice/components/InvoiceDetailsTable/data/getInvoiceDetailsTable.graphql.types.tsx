/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { WebResourceFragment } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { OperationItemFragment } from '../../../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { PurchaseOrderFragment } from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/purchaseOrderFragment.graphql.types'
import {
  BillingOptionFragment_AchBillingOption_,
  BillingOptionFragment_CreditCardBillingOption_,
  BillingOptionFragment_OtherBillingOption_,
  BillingOptionFragment_PaypalBillingOption_,
  BillingOptionFragment_WireBillingOption_
} from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/billingOptionFragment.graphql.types'
import { gql } from '@apollo/client'
import { WebResourceFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { OperationItemFragmentDoc } from '../../../../../../../../libs/billing/src/__fragments__/operationItemFragment.graphql.types'
import { PurchaseOrderFragmentDoc } from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/purchaseOrderFragment.graphql.types'
import { BillingOptionFragmentDoc } from '../../../../../../../../libs/billing-widgets/src/modules/__fragments__/billingOptionFragment.graphql.types'
import * as Apollo from '@apollo/client'
import * as ApolloReactHooks from '@staff-portal/data-layer-service/src/hooks'
const defaultOptions = { throwOnError: true }
export type GetInvoiceDetailsTableQueryVariables = Types.Exact<{
  invoiceId: Types.Scalars['ID']
}>

export type GetInvoiceDetailsTableQuery = {
  node?: Types.Maybe<
    {
      actionDueOn?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
      cleanOutstandingAmount?: Types.Maybe<string>
      createdOn: `${`${number}-${number}-${number}`}` | ''
      description?: Types.Maybe<string>
      discountApplied: boolean
      discountedAmount: string
      documentNote?: Types.Maybe<string>
      documentNumber: number
      downloadHtmlUrl?: Types.Maybe<string>
      downloadPdfUrl?: Types.Maybe<string>
      dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
      duePeriod: number
      issueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
      gid: string
      originalAmount?: Types.Maybe<string>
      partiallyPaid: boolean
      status: Types.DocumentStatus
      consolidatedInvoice?: Types.Maybe<{
        id: string
        webResource: WebResourceFragment
      }>
      consolidatedDocument?: Types.Maybe<{ id: string } | { id: string }>
      talent?: Types.Maybe<{ id: string; webResource: WebResourceFragment }>
      webResource: WebResourceFragment
    } & InvoiceDetailsPurchaseOrderFragment
  >
}

export type InvoiceDetailsPurchaseOrderFragment = {
  amountWithCorrections: string
  balanceDue: string
  exceedsPurchaseOrderBalance: boolean
  id: string
  invoiceKind: Types.InvoiceKind
  job?: Types.Maybe<{
    id: string
    hiredCount?: Types.Maybe<number>
    cumulativeStatus?: Types.Maybe<Types.CumulativeJobStatus>
    matcherCallScheduled?: Types.Maybe<boolean>
    talentCount?: Types.Maybe<number>
    status?: Types.Maybe<Types.JobStatus>
    currentInvestigation?: Types.Maybe<{
      startedAt:
        | `${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}`
        | ''
    }>
    nextPurchaseOrder?: Types.Maybe<NextPurchaseOrderFragment>
    purchaseOrder?: Types.Maybe<NextPurchaseOrderFragment>
    webResource: WebResourceFragment
  }>
  operations: {
    assignPurchaseOrder: OperationItemFragment
    assignPurchaseOrderLine: OperationItemFragment
  }
  purchaseOrder?: Types.Maybe<PurchaseOrderFragment>
  purchaseOrderLine?: Types.Maybe<PurchaseOrderLineFragmentForInvoiceFragment>
  reason?: Types.Maybe<EngagementReasonFragment | JobReasonFragment>
  subjectObject: {
    id: string
    preferredBillingOption?: Types.Maybe<
      | BillingOptionFragment_AchBillingOption_
      | BillingOptionFragment_CreditCardBillingOption_
      | BillingOptionFragment_OtherBillingOption_
      | BillingOptionFragment_PaypalBillingOption_
      | BillingOptionFragment_WireBillingOption_
    >
    financeTeamMember?: Types.Maybe<{ webResource: WebResourceFragment }>
    purchaseOrdersNullable?: Types.Maybe<{
      nodes: Array<PurchaseOrderFragment>
    }>
    webResource: WebResourceFragment
  }
}

export type NextPurchaseOrderFragment = { id: string; poNumber: string }

export type PurchaseOrderLineFragmentForInvoiceFragment = {
  id: string
  poLineNumber: string
  budgetLeft?: Types.Maybe<string>
  client: { fullName: string }
  webResource: WebResourceFragment
  purchaseOrder: {
    id: string
    poNumber: string
    budgetLeft?: Types.Maybe<string>
    webResource: WebResourceFragment
  }
}

export type EngagementReasonFragment = {
  id: string
  purchaseOrder?: Types.Maybe<NextPurchaseOrderFragment>
}

export type JobReasonFragment = {
  id: string
  nextPurchaseOrder?: Types.Maybe<NextPurchaseOrderFragment>
  purchaseOrder?: Types.Maybe<NextPurchaseOrderFragment>
}

export const NextPurchaseOrderFragmentDoc = gql`
  fragment NextPurchaseOrderFragment on PurchaseOrder {
    id
    poNumber
  }
`
export const PurchaseOrderLineFragmentForInvoiceFragmentDoc = gql`
  fragment PurchaseOrderLineFragmentForInvoice on PurchaseOrderLine {
    id
    poLineNumber
    budgetLeft
    client {
      fullName
    }
    webResource {
      ...WebResourceFragment
    }
    purchaseOrder {
      id
      poNumber
      budgetLeft
      webResource {
        ...WebResourceFragment
      }
    }
  }
  ${WebResourceFragmentDoc}
`
export const EngagementReasonFragmentDoc = gql`
  fragment EngagementReasonFragment on Engagement {
    id
    purchaseOrder {
      ...NextPurchaseOrderFragment
    }
  }
  ${NextPurchaseOrderFragmentDoc}
`
export const JobReasonFragmentDoc = gql`
  fragment JobReasonFragment on Job {
    id
    nextPurchaseOrder {
      ...NextPurchaseOrderFragment
    }
    purchaseOrder {
      ...NextPurchaseOrderFragment
    }
  }
  ${NextPurchaseOrderFragmentDoc}
`
export const InvoiceDetailsPurchaseOrderFragmentDoc = gql`
  fragment InvoiceDetailsPurchaseOrderFragment on Invoice {
    amountWithCorrections
    balanceDue
    exceedsPurchaseOrderBalance
    id
    invoiceKind
    job {
      id
      currentInvestigation {
        startedAt
      }
      hiredCount
      cumulativeStatus
      matcherCallScheduled
      nextPurchaseOrder {
        ...NextPurchaseOrderFragment
      }
      purchaseOrder {
        ...NextPurchaseOrderFragment
      }
      talentCount
      status
      webResource {
        ...WebResourceFragment
      }
    }
    operations {
      assignPurchaseOrder {
        ...OperationItem
      }
      assignPurchaseOrderLine {
        ...OperationItem
      }
    }
    purchaseOrder {
      ...PurchaseOrderFragment
    }
    purchaseOrderLine {
      ...PurchaseOrderLineFragmentForInvoice
    }
    reason {
      ... on Engagement {
        ...EngagementReasonFragment
      }
      ... on Job {
        ...JobReasonFragment
      }
    }
    subjectObject {
      id
      preferredBillingOption {
        ...BillingOptionFragment
      }
      financeTeamMember {
        webResource {
          ...WebResourceFragment
        }
      }
      purchaseOrdersNullable {
        nodes {
          ...PurchaseOrderFragment
        }
      }
      webResource {
        ...WebResourceFragment
      }
    }
  }
  ${NextPurchaseOrderFragmentDoc}
  ${WebResourceFragmentDoc}
  ${OperationItemFragmentDoc}
  ${PurchaseOrderFragmentDoc}
  ${PurchaseOrderLineFragmentForInvoiceFragmentDoc}
  ${EngagementReasonFragmentDoc}
  ${JobReasonFragmentDoc}
  ${BillingOptionFragmentDoc}
`
export const GetInvoiceDetailsTableDocument = gql`
  query GetInvoiceDetailsTable($invoiceId: ID!) {
    node(id: $invoiceId) {
      ... on Invoice {
        ...InvoiceDetailsPurchaseOrderFragment
        actionDueOn
        cleanOutstandingAmount
        consolidatedInvoice {
          id
          webResource {
            ...WebResourceFragment
          }
        }
        consolidatedDocument {
          id
        }
        createdOn
        description
        discountApplied
        discountedAmount
        documentNote
        documentNumber
        downloadHtmlUrl
        downloadPdfUrl
        dueDate
        duePeriod
        issueDate
        gid
        originalAmount
        partiallyPaid
        status
        talent {
          id
          webResource {
            ...WebResourceFragment
          }
        }
        webResource {
          ...WebResourceFragment
        }
      }
    }
  }
  ${InvoiceDetailsPurchaseOrderFragmentDoc}
  ${WebResourceFragmentDoc}
`

/**
 * __useGetInvoiceDetailsTableQuery__
 *
 * To run a query within a React component, call `useGetInvoiceDetailsTableQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceDetailsTableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceDetailsTableQuery({
 *   variables: {
 *      invoiceId: // value for 'invoiceId'
 *   },
 * });
 */
export function useGetInvoiceDetailsTableQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetInvoiceDetailsTableQuery,
    GetInvoiceDetailsTableQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<
    GetInvoiceDetailsTableQuery,
    GetInvoiceDetailsTableQueryVariables
  >(GetInvoiceDetailsTableDocument, options)
}
export function useGetInvoiceDetailsTableLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetInvoiceDetailsTableQuery,
    GetInvoiceDetailsTableQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<
    GetInvoiceDetailsTableQuery,
    GetInvoiceDetailsTableQueryVariables
  >(GetInvoiceDetailsTableDocument, options)
}
export type GetInvoiceDetailsTableQueryHookResult = ReturnType<
  typeof useGetInvoiceDetailsTableQuery
>
export type GetInvoiceDetailsTableLazyQueryHookResult = ReturnType<
  typeof useGetInvoiceDetailsTableLazyQuery
>
export type GetInvoiceDetailsTableQueryResult = Apollo.QueryResult<
  GetInvoiceDetailsTableQuery,
  GetInvoiceDetailsTableQueryVariables
>
