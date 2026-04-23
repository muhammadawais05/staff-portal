import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import {
  DEFAULT_ROLE_NAME,
  CANDIDATE_SENDING_STEPS_CONFIG
} from '../../../../config'

const getStepNames = (
  steps: NewEngagementWizardStep[],
  roleName?: string | null
) =>
  steps?.map(step => {
    if (step === NewEngagementWizardStep.POSITION) {
      const displayedRoleName = roleName ?? DEFAULT_ROLE_NAME

      return CANDIDATE_SENDING_STEPS_CONFIG[step].stepperLabel.replace(
        /%s/,
        displayedRoleName
      )
    }

    return CANDIDATE_SENDING_STEPS_CONFIG[step].stepperLabel
  })

export default getStepNames
