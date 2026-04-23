import { gql } from '@staff-portal/data-layer-service'

export const NEW_ENGAGEMENT_WIZARD_STEP_DATA_FRAGMENT = gql`
  fragment NewEngagementWizardStepDataFragment on NewEngagementWizard {
    actualSteps
    steps
    errors {
      code
      key
      message
    }
  }
`
