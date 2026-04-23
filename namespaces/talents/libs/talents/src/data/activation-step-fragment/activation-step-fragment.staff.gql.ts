import { gql } from '@staff-portal/data-layer-service'

export const ACTIVATION_STEP_FRAGMENT = gql`
  fragment ActivationStepFragment on ActivationStep {
    id
    type
    status
    staff {
      ...Assignee
    }
    operations {
      assign {
        ...ActivationStepOperation
      }
      approve {
        ...ActivationStepOperation
      }
      reset {
        ...ActivationStepOperation
      }
      reassign {
        ...ActivationStepOperation
      }
      unassign {
        ...ActivationStepOperation
      }
      sendIntroductionEmail {
        ...ActivationStepOperation
      }
      sendRestorationEmail {
        ...ActivationStepOperation
      }
      sendRescheduleEmail {
        ...ActivationStepOperation
      }
    }
  }

  fragment ActivationStepOperation on Operation {
    callable
    messages
  }

  fragment Assignee on Staff {
    id
    fullName
  }
`
