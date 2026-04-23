/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag'
disableFragmentWarnings()

import { InvoiceMutationFragment } from './invoiceMutationFragment.graphql.types'
import { PaymentMutationFragment } from '../../../../../libs/billing-widgets/src/modules/__fragments__/paymentMutationFragment.graphql.types'
import { gql } from '@apollo/client'
import { InvoiceMutationFragmentDoc } from './invoiceMutationFragment.graphql.types'
import { PaymentMutationFragmentDoc } from '../../../../../libs/billing-widgets/src/modules/__fragments__/paymentMutationFragment.graphql.types'
export type CommercialDocumentMutationFragment_Invoice_ =
  InvoiceMutationFragment

export type CommercialDocumentMutationFragment_Payment_ =
  PaymentMutationFragment

export type CommercialDocumentMutationFragment =
  | CommercialDocumentMutationFragment_Invoice_
  | CommercialDocumentMutationFragment_Payment_

export const CommercialDocumentMutationFragmentDoc = gql`
  fragment CommercialDocumentMutationFragment on CommercialDocument {
    ... on Invoice {
      ...InvoiceMutationFragment
    }
    ... on Payment {
      ...PaymentMutationFragment
    }
  }
  ${InvoiceMutationFragmentDoc}
  ${PaymentMutationFragmentDoc}
`
