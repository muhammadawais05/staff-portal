/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { WebResourceFragment } from '../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
import { gql } from '@apollo/client'
import { WebResourceFragmentDoc } from '../../../../../libs/billing/src/__fragments__/webResourceFragment.graphql.types'
export type InvoiceToConsolidateListItemFragment = {
  amount: string
  listedAmount: string
  actionDueOn?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  description?: Types.Maybe<string>
  longDescription?: Types.Maybe<Array<string>>
  statusComment?: Types.Maybe<string>
  documentNumber: number
  id: string
  invoiceKind: Types.InvoiceKind
  unconsolidated: boolean
  issueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  creditedAmount: string
  status: Types.DocumentStatus
  paidAt?: Types.Maybe<
    | `${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}`
    | ''
  >
  processingDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  hasPendingCharges: boolean
  range?: Types.Maybe<{
    from: `${`${number}-${number}-${number}`}` | ''
    till: `${`${number}-${number}-${number}`}` | ''
  }>
  reason?: Types.Maybe<{
    id: string
    placementFees?: Types.Maybe<{ totalCount: number }>
  }>
  webResource: WebResourceFragment
  subjectObject: {
    id: string
    webResource: WebResourceFragment
    preferredBillingOption?: Types.Maybe<
      | { discountable: boolean }
      | { discountable: boolean }
      | { discountable: boolean }
      | { discountable: boolean }
      | { discountable: boolean }
    >
  }
  originalBillingCycle?: Types.Maybe<{
    endDate: `${`${number}-${number}-${number}`}` | ''
    startDate: `${`${number}-${number}-${number}`}` | ''
  }>
  talent?: Types.Maybe<{ id: string; webResource: WebResourceFragment }>
  job?: Types.Maybe<{ id: string; webResource: WebResourceFragment }>
}

export const InvoiceToConsolidateListItemFragmentDoc = gql`
  fragment InvoiceToConsolidateListItemFragment on Invoice {
    amount
    listedAmount
    actionDueOn
    description
    longDescription
    statusComment
    documentNumber
    id
    invoiceKind
    unconsolidated
    issueDate
    dueDate
    creditedAmount
    status
    paidAt
    processingDate
    hasPendingCharges
    range {
      from
      till
    }
    reason {
      ... on Engagement {
        id
        placementFees: placementFeesNullable {
          totalCount
        }
      }
    }
    webResource {
      ...WebResourceFragment
    }
    subjectObject {
      id
      webResource {
        ...WebResourceFragment
      }
      preferredBillingOption {
        discountable
      }
    }
    originalBillingCycle {
      endDate
      startDate
    }
    talent {
      id
      webResource {
        ...WebResourceFragment
      }
    }
    job {
      id
      webResource {
        ...WebResourceFragment
      }
    }
  }
  ${WebResourceFragmentDoc}
`
