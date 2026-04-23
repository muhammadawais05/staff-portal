import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

import { paymentSubjectNameFragment } from './paymentSubjectNameFragment.graphql'

export const extraExpensePlacementFeeItemInvoiceFragment = gql`
  fragment ExtraExpensePlacementFeeItemInvoiceFragment on Invoice {
    ... on Invoice {
      amount
      creditedAmount
      debitedAmount
      description
      documentNumber
      dueDate
      id
      billingCycleGid
      gid
      paidAmount
      status
      url
      subjectObject {
        id
        fullName
      }
      ... on WebResource {
        webResource {
          ...WebResourceFragment
        }
      }
    }
  }

  ${webResourceFragment}
  ${paymentSubjectNameFragment}
`

export const extraExpensePlacementFeeItemCommissionFragment = gql`
  fragment ExtraExpensePlacementFeeItemCommissionFragment on CommercialDocument {
    ... on Invoice {
      ...ExtraExpensePlacementFeeItemInvoiceFragment
    }
    ... on Payment {
      ...ExtraExpensePlacementFeeItemPaymentFragment
    }
  }
`

export const extraExpensePlacementFeeItemPaymentFragment = gql`
  fragment ExtraExpensePlacementFeeItemPaymentFragment on Payment {
    ... on Payment {
      amount
      creditedAmount
      debitedAmount
      description
      documentNumber
      dueDate
      id
      billingCycleGid
      gid
      paidAmount
      status
      url
      subjectObject {
        ... on Role {
          id
        }
        ... on Client {
          id
        }
        ... on CompanyRepresentative {
          id
        }
        ... on Leader {
          id
        }
        ...PaymentSubjectNameFragment
      }
      ... on WebResource {
        webResource {
          ...WebResourceFragment
        }
      }
    }
  }

  ${webResourceFragment}
  ${paymentSubjectNameFragment}
`
