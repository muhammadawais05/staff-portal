import { gql } from '@staff-portal/data-layer-service'
import { ROLE_OR_CLIENT_FRAGMENT } from '@staff-portal/facilities'

export default gql`
  fragment GetAddActivityModalJobFragment on Job {
    id
    client {
      id
      representatives {
        nodes {
          ...RoleOrClientFragment
          email
        }
      }
    }
    engagements {
      nodes {
        id
        talent {
          id
          fullName
        }
      }
    }
  }

  query GetAddActivityModalJobData($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        ...GetAddActivityModalJobFragment
      }
    }
  }

  ${ROLE_OR_CLIENT_FRAGMENT}
`
