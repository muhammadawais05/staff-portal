import { gql } from '@staff-portal/data-layer-service'

/**
 * TODO `MutationResult` must be replaced by `RoleStepMutationResult` as soon as it will have been introduced
 *   https://toptal-core.atlassian.net/browse/GOLD-1439
 */
export const ROLE_STEP_NEXT_ACTION_FRAGMENT = gql`
  # fragment RoleStepNextActionFragment on RoleStepMutationResult {
  fragment RoleStepNextActionFragment on MutationResult {
    __typename
    ... on ApproveEnglishRoleStepPayload {
      roleStep {
        id
        emailMessaging {
          id
        }
      }
      nextAction
      emailTemplate {
        id
      }
    }

    ... on ApprovePortfolioRoleStepPayload {
      roleStep {
        id
        emailMessaging {
          id
        }
      }
      nextAction
      emailTemplate {
        id
      }
    }

    ... on ApproveTechnicalOneRoleStepPayload {
      roleStep {
        id
        emailMessaging {
          id
        }
      }
      nextAction
      emailTemplate {
        id
      }
    }

    ... on ApproveTechnicalTwoRoleStepPayload {
      roleStep {
        id
        emailMessaging {
          id
        }
      }
      nextAction
      emailTemplate {
        id
      }
    }

    ... on ApproveOnlineTestRoleStepPayload {
      roleStep {
        id
        emailMessaging {
          id
        }
      }
      nextAction
      emailTemplate {
        id
      }
    }

    ... on ApprovePaymentRoleStepPayload {
      roleStep {
        id
        emailMessaging {
          id
        }
      }
      nextAction
      emailTemplate {
        id
      }
    }

    ... on ApproveWorkHoursRoleStepPayload {
      roleStep {
        id
        emailMessaging {
          id
        }
      }
      nextAction
      emailTemplate {
        id
      }
    }

    ... on ClaimRoleStepPayload {
      roleStep {
        id
        emailMessaging {
          id
        }
      }
      nextAction
      emailTemplate {
        id
      }
    }

    ... on ClaimEnglishRoleStepPayload {
      roleStep {
        id
        emailMessaging {
          id
        }
      }
      nextAction
      emailTemplate {
        id
      }
    }

    ... on ClaimPortfolioRoleStepPayload {
      roleStep {
        id
        emailMessaging {
          id
        }
      }
      nextAction
      emailTemplate {
        id
      }
    }

    ... on ClaimTechnicalOneRoleStepPayload {
      roleStep {
        id
        emailMessaging {
          id
        }
      }
      nextAction
      emailTemplate {
        id
      }
    }

    ... on ClaimTechnicalTwoRoleStepPayload {
      roleStep {
        id
        emailMessaging {
          id
        }
      }
      nextAction
      emailTemplate {
        id
      }
    }

    ... on ClaimOnlineTestRoleStepPayload {
      roleStep {
        id
        emailMessaging {
          id
        }
      }
      nextAction
      emailTemplate {
        id
      }
    }
  }
`
