import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'
import { roleTypeFragment } from '@staff-portal/billing/src/__fragments__/roleTypeFragment.graphql'

import { roleOrClientInfoFragment } from './roleOrClientInfoFragment.graphql'
import { reasonFragments } from './reasonFragments.graphql'

export const paymentListItemFragment = gql`
  fragment PaymentListItemFragment on Payment {
    amount
    amountWithCorrections
    debitedAmount
    billingCycle {
      startDate
      endDate
    }
    client {
      ...ReasonClient
    }
    createdOn
    description
    statusComment
    documentNumber
    downloadHtmlUrl
    downloadPdfUrl
    id
    paymentKind
    extraExpenses
    reason {
      __typename
      ... on Talent {
        ...ReasonTalent
        roleType: type
      }
      ... on TalentPartner {
        ...ReasonTalentPartner
        roleType: type
      }
      ... on RoleStep {
        ...ReasonRoleStep
      }
      ... on Client {
        ...ReasonClient
      }
      ... on Engagement {
        ...ReasonEngagement
      }
    }
    dueDate
    creditedAmount
    paymentGroup {
      id
      webResource {
        ...WebResourceFragment
      }
    }
    status
    paidAt
    webResource {
      ...WebResourceFragment
    }
    subjectObject {
      ...RoleType
      ...PaymentSubjectNameFragment
      ...PaymentWebResourceFragment
      ... on Client {
        preferredBillingOption {
          ...BillingOptionFragment
        }
      }
      ... on Talent {
        paymentsHoldDescription
        operations {
          createPaymentHold {
            ...OperationItem
          }
        }
      }
    }
    operations {
      payPayment {
        ...OperationItem
      }
      removePaymentFromPaymentGroup {
        ...OperationItem
      }
    }
    job {
      id
      webResource {
        ...WebResourceFragment
      }
    }
  }

  ${webResourceFragment}
  ${reasonFragments}
  ${roleTypeFragment}
  ${operationItemFragment}
  ${roleOrClientInfoFragment}
`
