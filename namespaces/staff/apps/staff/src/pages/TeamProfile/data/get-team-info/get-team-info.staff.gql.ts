import { gql } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export default gql`
  fragment TeamInformationFragment on Team {
    name
    coreTeam
    emailTracking

    manager {
      id
      name
      role {
        fullName
        webResource {
          url
        }
      }
    }

    ability {
      id
      name
      operations {
        editAbility {
          ...OperationFragment
        }
      }
    }

    roles {
      totalCount
    }

    escalationPath {
      nodes {
        ... on StaffManager {
          id
          role {
            ...WebResourceFragment
          }
        }
      }
    }
  }

  query GetTeamInfo($teamId: ID!) {
    node(id: $teamId) {
      ... on Team {
        id
        ...TeamInformationFragment
      }
    }
  }

  ${WEB_RESOURCE_FRAGMENT}
  ${OPERATION_FRAGMENT}
`
