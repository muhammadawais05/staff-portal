import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

export const paymentWebResourceFragment = gql`
  fragment PaymentWebResourceFragment on PaymentSubject {
    ... on Client {
      id
      webResource {
        ...WebResourceFragment
      }
    }
    ... on CompanyRepresentative {
      id
      webResource {
        ...WebResourceFragment
      }
    }
    ... on Leader {
      id
      webResource {
        ...WebResourceFragment
      }
    }
    ... on ReferralPartner {
      id
      webResource {
        ...WebResourceFragment
      }
    }
    ... on Staff {
      id
      webResource {
        ...WebResourceFragment
      }
    }
    ... on Talent {
      id
      webResource {
        ...WebResourceFragment
      }
    }
    ... on TalentPartner {
      id
      webResource {
        ...WebResourceFragment
      }
    }
  }

  ${webResourceFragment}
`
