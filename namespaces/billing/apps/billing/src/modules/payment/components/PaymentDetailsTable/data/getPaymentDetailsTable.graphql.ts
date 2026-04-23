import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

export default gql`
  query GetPaymentDetailsTable($id: ID!) {
    node(id: $id) {
      ... on Payment {
        amount
        balanceDue
        billingCycleGid
        documentNote
        client {
          id
          webResource {
            ...WebResourceFragment
          }
        }
        createdOn
        description
        dueDate
        id
        job {
          id
          webResource {
            ...WebResourceFragment
          }
        }
        paymentKind
        paymentGroup {
          id
          number
          webResource {
            ...WebResourceFragment
          }
        }
        paymentMethod
        status
        subjectObject {
          ... on Client {
            id
            fullName
            webResource {
              ...WebResourceFragment
            }
          }
          ... on CompanyRepresentative {
            id
            fullName
            webResource {
              ...WebResourceFragment
            }
          }
          ... on Leader {
            id
            fullName
            webResource {
              ...WebResourceFragment
            }
          }
          ... on Staff {
            id
            fullName
            webResource {
              ...WebResourceFragment
            }
          }
          ... on ReferralPartner {
            id
            fullName
            webResource {
              ...WebResourceFragment
            }
          }
          ... on Talent {
            id
            fullName
            webResource {
              ...WebResourceFragment
            }
            ...GetPaymentDetailsTableSubjectObjectTalent
          }
          ... on TalentPartner {
            id
            fullName
            webResource {
              ...WebResourceFragment
            }
          }
        }
      }
    }
  }

  fragment GetPaymentDetailsTableSubjectObjectTalent on Talent {
    activePaymentHold {
      creationReason
      dateThreshold
    }
  }

  ${webResourceFragment}
`
