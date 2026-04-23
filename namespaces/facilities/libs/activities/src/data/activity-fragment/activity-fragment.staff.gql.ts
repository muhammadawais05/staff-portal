import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import {
  ROLE_OR_CLIENT_FRAGMENT,
  WEB_RESOURCE_FRAGMENT
} from '@staff-portal/facilities'

export const ACTIVITY_FRAGMENT = gql`
  fragment ActivityFragment on Activity {
    id
    type
    subtype
    activityContactRoles {
      nodes {
        ...RoleOrClientFragment
      }
    }
    outcome
    createdAt
    updatedAt
    occurredAt
    details
    duration
    subject {
      ... on Client {
        id
        representatives {
          nodes {
            ...RoleOrClientFragment
          }
        }
      }
    }
    operations {
      updateActivity {
        ...OperationFragment
      }
      removeActivity {
        ...OperationFragment
      }
    }
    role {
      id
      ...WebResourceFragment
    }
    __typename
  }

  ${ROLE_OR_CLIENT_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
`
