import { gql } from '@staff-portal/data-layer-service'
import { CLAIMER_FRAGMENT } from '@staff-portal/facilities'

export default gql`
  query GetApproveGenericRoleStepData($roleStepId: ID!) {
    node(id: $roleStepId) {
      ...ApproveGenericRoleStepFragment
    }
  }

  fragment ApproveGenericRoleStepFragment on RoleStep {
    id
    claimer {
      ...ClaimerFragment
    }
    step {
      id
      title
    }
    mainAction {
      actionName
    }
  }

  ${CLAIMER_FRAGMENT}
`
