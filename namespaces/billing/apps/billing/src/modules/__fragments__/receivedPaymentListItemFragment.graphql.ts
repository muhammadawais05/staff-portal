import { gql } from '@apollo/client'

export const paymentListItemFragment = gql`
  fragment ReceivedPaymentListItemFragment on Payment {
    amount
    amountWithCorrections
    client {
      ...ReasonClient
    }
    createdOn
    debitedAmount
    description
    statusComment
    documentNumber
    downloadHtmlUrl
    downloadPdfUrl
    id
    paymentGroupId
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
`
