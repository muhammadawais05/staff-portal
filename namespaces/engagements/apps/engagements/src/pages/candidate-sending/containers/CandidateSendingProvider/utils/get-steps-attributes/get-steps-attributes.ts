import {
  NewEngagementWizardAttributes,
  NewEngagementWizardStep
} from '@staff-portal/graphql/staff'

import { CANDIDATE_SENDING_STEPS_CONFIG } from '../../../../config'
import { CandidateSendingStepsAttributesByStep } from '../../../../types'

const getStepsAttributes = (
  stepsAttributesByStep: CandidateSendingStepsAttributesByStep
): NewEngagementWizardAttributes =>
  Object.entries(stepsAttributesByStep).reduce<NewEngagementWizardAttributes>(
    (acc, [stepName, stepAttributes]) => {
      if (!stepAttributes) {
        return acc
      }

      const adjustFormValuesToAttributesFunc =
        CANDIDATE_SENDING_STEPS_CONFIG[stepName as NewEngagementWizardStep]
          ?.adjustFormValuesToAttributes
      const adjustedStepAttributesForStep = adjustFormValuesToAttributesFunc
        ? adjustFormValuesToAttributesFunc(stepAttributes)
        : stepAttributes

      return {
        ...acc,
        ...adjustedStepAttributesForStep
      }
    },
    {}
  )

export default getStepsAttributes
