/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { gql } from '@apollo/client'
export type CommercialDocumentItem_Invoice_Fragment = {
  amount: string
  billingCycleGid?: Types.Maybe<string>
  createdOn: `${`${number}-${number}-${number}`}` | ''
  creditedAmount: string
  debitedAmount: string
  description?: Types.Maybe<string>
  documentNumber: number
  dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  id: string
  paidAmount: string
  status: Types.DocumentStatus
  transfers: {
    nodes: Array<{
      id: string
      paymentMethod: string
      refund: boolean
      status: Types.TransferStatus
    }>
  }
}

export type CommercialDocumentItem_Payment_Fragment = {
  amount: string
  billingCycleGid?: Types.Maybe<string>
  createdOn: `${`${number}-${number}-${number}`}` | ''
  creditedAmount: string
  debitedAmount: string
  description?: Types.Maybe<string>
  documentNumber: number
  dueDate?: Types.Maybe<`${`${number}-${number}-${number}`}` | ''>
  id: string
  paidAmount: string
  status: Types.DocumentStatus
  transfers: {
    nodes: Array<{
      id: string
      paymentMethod: string
      refund: boolean
      status: Types.TransferStatus
    }>
  }
}

export type CommercialDocumentItemFragment =
  | CommercialDocumentItem_Invoice_Fragment
  | CommercialDocumentItem_Payment_Fragment

export const CommercialDocumentItemFragmentDoc = gql`
  fragment CommercialDocumentItem on CommercialDocument {
    amount
    billingCycleGid
    createdOn
    creditedAmount
    debitedAmount
    description
    documentNumber
    dueDate
    id
    paidAmount
    status
    transfers {
      nodes {
        id
        paymentMethod
        refund
        status
      }
    }
  }
`
