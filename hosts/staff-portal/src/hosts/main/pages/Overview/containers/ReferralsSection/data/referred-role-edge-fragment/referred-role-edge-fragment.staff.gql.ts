import { gql } from '@staff-portal/data-layer-service'

const REFERRAL_FRAGMENT = gql`
  fragment ReferralFragment on RoleOrClient {
    ... on Node {
      id
    }
    ... on WebResource {
      webResource {
        text
        url
      }
    }
    ... on Role {
      id
      type
      photo {
        thumb
      }
    }

    ... on Client {
      id
      photo {
        thumb
      }
    }
  }
`

export const REFERRED_ROLE_EDGE_FRAGMENT = gql`
  fragment ReferredRoleEdgeFragment on ReferredRoleEdge {
    createdAt
    statusCategory
    statusText
    statusTooltip
    node {
      ...ReferralFragment
    }
  }

  ${REFERRAL_FRAGMENT}
`
