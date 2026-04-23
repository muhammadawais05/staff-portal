import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

export const commissionsRoleFragment = gql`
  fragment CommissionsRole on RoleOrClient {
    ... on Client {
      id
      fullName
      ... on WebResource {
        webResource {
          ...WebResourceFragment
        }
      }
    }
    ... on CompanyRepresentative {
      id
      fullName
      ... on WebResource {
        webResource {
          ...WebResourceFragment
        }
      }
    }
    ... on Leader {
      id
      fullName
      ... on WebResource {
        webResource {
          ...WebResourceFragment
        }
      }
    }
    ... on ReferralPartner {
      id
      fullName
      ... on WebResource {
        webResource {
          ...WebResourceFragment
        }
      }
    }
    ... on Staff {
      id
      fullName
      ... on WebResource {
        webResource {
          ...WebResourceFragment
        }
      }
    }
    ... on Talent {
      id
      fullName
      ... on WebResource {
        webResource {
          ...WebResourceFragment
        }
      }
    }
    ... on TalentPartner {
      id
      fullName
      ... on WebResource {
        webResource {
          ...WebResourceFragment
        }
      }
    }
  }

  ${webResourceFragment}
`
