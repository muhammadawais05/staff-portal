/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { InvoiceOperationsFragment } from '../../../../../libs/billing/src/__fragments__/invoiceOperationsFragment.graphql.types'
import { gql } from '@apollo/client'
import { InvoiceOperationsFragmentDoc } from '../../../../../libs/billing/src/__fragments__/invoiceOperationsFragment.graphql.types'
export type InvoiceMutationFragment = {
  actionDueOn?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  cleanOutstandingAmount?: Types.Maybe<string>
  dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  issueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  duePeriod: number
  id: string
  invoiceKind: Types.InvoiceKind
  paidAt?: Types.Maybe<
    | `${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}`
    | ''
  >
  processingDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  status: Types.DocumentStatus
} & InvoiceOperationsFragment

export const InvoiceMutationFragmentDoc = gql`
  fragment InvoiceMutationFragment on Invoice {
    actionDueOn
    cleanOutstandingAmount
    dueDate
    issueDate
    duePeriod
    id
    invoiceKind
    paidAt
    processingDate
    status
    ...InvoiceOperationsFragment
  }
  ${InvoiceOperationsFragmentDoc}
`
