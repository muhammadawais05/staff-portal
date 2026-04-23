import { gql } from '@staff-portal/data-layer-service'

export const COMMUNITY_LEADER_ROLE_FRAGMENT = gql`
  fragment CommunityLeaderRole on CommunityLeaderAccount {
    appliedStaffRole {
      id
      fullName
      email
      photo {
        default
      }
      location: locationV2 {
        country {
          id
          name
        }
        cityName
        stateName
      }
      webResource {
        text
        url
      }
      roleFlags {
        nodes {
          flag {
            id
            title
          }
        }
      }
    }
    appliedTalentRole {
      id
      fullName
      email
      photo {
        default
      }
      location: locationV2 {
        country {
          id
          name
        }
        cityName
        stateName
      }
      webResource {
        text
        url
      }
      roleFlags {
        nodes {
          flag {
            id
            title
          }
        }
      }
    }
  }
`

export const COMMUNITY_LEADER_ROLE_WEB_RESOURCE_FRAGMENT = gql`
  fragment CommunityLeaderRoleWebResource on CommunityLeaderAccount {
    appliedStaffRole {
      webResource {
        text
        url
      }
    }
    appliedTalentRole {
      webResource {
        text
        url
      }
    }
  }
`
