import { defineMessage } from '@toptal/staff-portal-message-bus'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import { CandidateSendingStepAttributes } from './types'

export const AVAILABILITY_STEP_FORM_UPDATE =
  defineMessage<
    CandidateSendingStepAttributes<NewEngagementWizardStep.AVAILABILITY>
  >()
