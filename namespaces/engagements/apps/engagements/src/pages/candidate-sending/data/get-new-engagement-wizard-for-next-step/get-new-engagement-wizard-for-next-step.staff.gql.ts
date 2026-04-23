import { gql } from '@staff-portal/data-layer-service'

import { NEW_ENGAGEMENT_WIZARD_STEP_DATA_FRAGMENT } from '../new-engagement-wizard-step-data-fragment'

export default gql`
  query GetNewEngagementWizardForNextStep(
    $step: NewEngagementWizardStep!
    $attributes: NewEngagementWizardAttributes!
  ) {
    newEngagementWizard(step: $step, attributes: $attributes) {
      ...NewEngagementWizardStepDataFragment
    }
  }

  ${NEW_ENGAGEMENT_WIZARD_STEP_DATA_FRAGMENT}
`
