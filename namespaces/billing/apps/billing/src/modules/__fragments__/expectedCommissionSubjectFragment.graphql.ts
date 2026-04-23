import { gql } from '@apollo/client'

export const expectedCommissionSubjectFragment = gql`
  fragment ExpectedCommissionSubjectFragment on RoleOrClient {
    ... on Client {
      webResource {
        text
        url
      }
    }
    ... on CompanyRepresentative {
      webResource {
        text
        url
      }
    }
    ... on Leader {
      webResource {
        text
        url
      }
    }
    ... on ReferralPartner {
      webResource {
        text
        url
      }
    }
    ... on Staff {
      webResource {
        text
        url
      }
    }
    ... on Talent {
      webResource {
        text
        url
      }
    }
    ... on TalentPartner {
      webResource {
        text
        url
      }
    }
  }
`
