/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import * as Types from '@staff-portal/graphql/staff'

import { TransferOperationsFragment } from './transferOperationsFragment.graphql.types'
import { gql } from '@apollo/client'
import { TransferOperationsFragmentDoc } from './transferOperationsFragment.graphql.types'
export type TransferFragment = {
  amount: string
  amountToRefund: string
  createdAt:
    | `${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}`
    | ''
  description: string
  effectiveDate: `${`${number}-${number}-${number}`}` | ''
  feesTotalAmount: string
  gateway: string
  id: string
  paymentMethod: string
  refund: boolean
  status: Types.TransferStatus
  billingOption?: Types.Maybe<
    | { id: string }
    | {
        id: string
        cardExpired: boolean
        last4Digits: string
        type: string
        verificationStatuses?: Types.Maybe<
          Array<Types.BillingOptionVerificationStatus>
        >
      }
    | { id: string }
    | { id: string }
    | { id: string }
  >
  document?: Types.Maybe<{ id: string } | { id: string }>
} & TransferOperationsFragment

export const TransferFragmentDoc = gql`
  fragment TransferFragment on Transfer {
    amount
    amountToRefund
    billingOption {
      id
      ... on CreditCardBillingOption {
        id
        cardExpired
        last4Digits
        type
        verificationStatuses
      }
    }
    createdAt
    description
    effectiveDate
    feesTotalAmount
    gateway
    id
    document {
      id
    }
    paymentMethod
    refund
    status
    ...TransferOperations
  }
  ${TransferOperationsFragmentDoc}
`
