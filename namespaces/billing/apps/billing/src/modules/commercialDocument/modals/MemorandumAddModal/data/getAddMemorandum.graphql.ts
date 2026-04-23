import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

import { jobFragment } from '../../../../__fragments__/jobFragment.graphql'

export default gql`
  query GetAddMemorandum($id: ID!) {
    node(id: $id) {
      ... on Invoice {
        ...GetAddMemorandumInvoice
      }
      ... on Payment {
        ...GetAddMemorandumPayment
      }
    }
  }

  fragment GetAddMemorandumInvoice on Invoice {
    amount
    commissionable
    documentNumber
    billingCycle {
      ...GetAddMemorandumBillingCycle
    }
    gid
    id
    job {
      ...JobFragment
    }
    invoiceKind
    originalInvoices {
      ...OriginalInvoicesFragment
    }
    reason {
      ... on Engagement {
        id
        endDate
      }
      ... on Job {
        id
      }
    }
    status
    subjectObject {
      id
      fullName
    }
    talent {
      id
      fullName
    }
    webResource {
      ...WebResourceFragment
    }
  }

  fragment GetAddMemorandumPayment on Payment {
    amount
    client {
      id
      fullName
    }
    documentNumber
    billingCycle {
      ...GetAddMemorandumBillingCycle
    }
    gid
    id
    job {
      ...JobFragment
    }
    paymentKind
    paidAmount
    paymentMethod
    reason {
      ... on Engagement {
        id
        endDate
      }
    }
    status
    subjectObject {
      # Payment.subjectObject is a union of multiple types
      # so we need to specify all of them
      ... on Client {
        id
        fullName
      }
      ... on CompanyRepresentative {
        id
        fullName
      }
      ... on Leader {
        id
        fullName
      }
      ... on ReferralPartner {
        id
        fullName
      }
      ... on Staff {
        id
        fullName
      }
      ... on Talent {
        id
        fullName
      }
      ... on TalentPartner {
        id
        fullName
      }
    }
    webResource {
      ...WebResourceFragment
    }
  }

  fragment GetAddMemorandumBillingCycle on BillingCycle {
    startDate
    endDate
    hours
    originalCommitment {
      availability
    }
    actualCommitment {
      availability
    }
  }

  fragment OriginalInvoicesFragment on InvoiceConnection {
    nodes {
      id
      associatedMemorandums {
        nodes {
          id
          amount
          balance
        }
      }
      cleanOutstandingAmount
      documentNumber
    }
  }

  ${jobFragment}
  ${webResourceFragment}
`
