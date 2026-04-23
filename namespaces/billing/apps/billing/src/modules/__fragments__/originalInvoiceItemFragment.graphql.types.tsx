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
export type OriginalInvoiceItemFragment = {
  amount: string
  listedAmount: string
  cleanOutstandingAmount?: Types.Maybe<string>
  description?: Types.Maybe<string>
  documentNumber: number
  id: string
  invoiceKind: Types.InvoiceKind
  unconsolidated: boolean
  issueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  webResource: WebResourceFragment
  subjectObject: { id: string; webResource: WebResourceFragment }
  talent?: Types.Maybe<{ id: string; webResource: WebResourceFragment }>
  job?: Types.Maybe<{ id: string; webResource: WebResourceFragment }>
}

export const OriginalInvoiceItemFragmentDoc = gql`
  fragment OriginalInvoiceItemFragment on Invoice {
    amount
    listedAmount
    cleanOutstandingAmount
    description
    documentNumber
    id
    invoiceKind
    unconsolidated
    issueDate
    dueDate
    webResource {
      ...WebResourceFragment
    }
    subjectObject {
      id
      webResource {
        ...WebResourceFragment
      }
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
