import { gql } from '@staff-portal/data-layer-service'

import { NEW_ENGAGEMENT_WIZARD_STEP_DATA_FRAGMENT } from '../new-engagement-wizard-step-data-fragment'

export default gql`
  query GetInitialNewEngagementWizard(
    $attributes: NewEngagementWizardAttributes!
  ) {
    newEngagementWizard(attributes: $attributes) {
      stepToSubmit
      job {
        id
        client {
          id
        }
      }
      talent {
        id
      }
      ...NewEngagementWizardStepDataFragment
    }
  }

  ${NEW_ENGAGEMENT_WIZARD_STEP_DATA_FRAGMENT}
`
