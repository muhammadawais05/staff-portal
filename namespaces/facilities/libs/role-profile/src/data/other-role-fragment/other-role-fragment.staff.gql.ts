import { gql } from '@staff-portal/data-layer-service'

export const OTHER_ROLE_FRAGMENT = gql`
  fragment OtherRoleFragment on Role {
    id
    type
    __typename
    ... on WebResource {
      webResource {
        url
      }
    }
    ... on CompanyRepresentative {
      companyRepresentativeCumulativeStatus: cumulativeStatus
      client {
        id
        fullName
      }
    }
    ... on Staff {
      cumulativeStatus
    }
    ... on Leader {
      cumulativeStatus
    }
    ... on ReferralPartner {
      cumulativeStatus
    }
    ... on TalentPartner {
      cumulativeStatus
    }
    ... on Talent {
      talentCumulativeStatus: cumulativeStatus
    }
  }
`
