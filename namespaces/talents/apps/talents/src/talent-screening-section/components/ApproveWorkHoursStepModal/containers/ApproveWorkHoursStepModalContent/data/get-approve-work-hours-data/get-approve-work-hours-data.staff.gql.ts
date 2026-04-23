import { gql } from '@staff-portal/data-layer-service'
import { CLAIMER_FRAGMENT } from '@staff-portal/facilities'

export default gql`
  query GetApproveWorkHoursData($roleStepId: ID!) {
    node(id: $roleStepId) {
      ... on RoleStep {
        id
        step {
          id
          title
        }
        claimer {
          ...ClaimerFragment
        }
      }
    }
  }

  ${CLAIMER_FRAGMENT}
`
