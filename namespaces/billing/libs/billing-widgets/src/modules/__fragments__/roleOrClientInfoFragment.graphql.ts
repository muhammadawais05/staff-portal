import { gql } from '@apollo/client'

export const roleOrClientInfoFragment = gql`
  fragment RoleOrClientInfo on RoleOrClient {
    __typename
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
    ... on ReferralPartner {
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
    ... on Talent {
      id
      fullName
      webResource {
        ...WebResourceFragment
      }
    }
    ... on TalentPartner {
      id
      fullName
      webResource {
        ...WebResourceFragment
      }
    }
  }
`
