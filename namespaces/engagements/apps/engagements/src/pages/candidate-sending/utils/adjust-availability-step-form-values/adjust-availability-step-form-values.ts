import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import { CandidateSendingStepAttributes } from '../../types'

const adjustAvailabilityStepFormValues = ({
  lockOverrideConfirmed,
  lockOverrideReason,
  trialLength,
  ...restStepAttributes
}: NonNullable<
  CandidateSendingStepAttributes<NewEngagementWizardStep.AVAILABILITY>
>) => {
  const sanitizedStepAttributes = {
    ...restStepAttributes,
    ...(lockOverrideConfirmed && { lockOverrideReason }),
    trialLength: trialLength ?? null
  }

  // We have to remove internal fields of the Availability step form.
  // These fields are used for confirmation questions and are used for form validation.
  // But we do not need to store values of these fields as attributes
  delete sanitizedStepAttributes.engagementEndDatesConfirmed
  delete sanitizedStepAttributes.sendCandidateConfirmed
  delete sanitizedStepAttributes.talentCommitmentConfirmed

  return sanitizedStepAttributes
}

export default adjustAvailabilityStepFormValues
