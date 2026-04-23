import { gql } from '@staff-portal/data-layer-service'
import { CLAIMER_FRAGMENT } from '@staff-portal/facilities'

export default gql`
  query GetClaimTechnicalGenericStepData($roleStepId: ID!) {
    node(id: $roleStepId) {
      ...ClaimTechnicalGenericStepFragment
    }
  }

  fragment ClaimTechnicalGenericStepFragment on RoleStep {
    id
    step {
      id
      title
    }
    talent {
      id
      fullName
      talentPartner {
        id
        fullName
      }
    }
    mainAction {
      actionName
    }
    claimer {
      ...ClaimerFragment
    }
  }

  ${CLAIMER_FRAGMENT}
`
