/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { gql } from '@apollo/client'
export type BillingCyclesCommercialDocumentFragment_Invoice_ = {
  gid: string
  amount: string
  status: Types.DocumentStatus
  billingCycleGid?: Types.Maybe<string>
  url?: Types.Maybe<string>
  documentNumber: number
  paidAmount: string
  creditedAmount: string
  debitedAmount: string
}

export type BillingCyclesCommercialDocumentFragment_Payment_ = {
  gid: string
  amount: string
  status: Types.DocumentStatus
  billingCycleGid?: Types.Maybe<string>
  url?: Types.Maybe<string>
  documentNumber: number
  paidAmount: string
  creditedAmount: string
  debitedAmount: string
}

export type BillingCyclesCommercialDocumentFragment =
  | BillingCyclesCommercialDocumentFragment_Invoice_
  | BillingCyclesCommercialDocumentFragment_Payment_

export const BillingCyclesCommercialDocumentFragmentDoc = gql`
  fragment BillingCyclesCommercialDocumentFragment on CommercialDocument {
    gid
    amount
    status
    billingCycleGid
    url
    documentNumber
    paidAmount
    creditedAmount
    debitedAmount
  }
`
