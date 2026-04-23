import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

const getPreviousStep = (
  steps: NewEngagementWizardStep[] | undefined,
  currentStep: NewEngagementWizardStep | null
): NewEngagementWizardStep | null => {
  if (!currentStep || !steps?.length) {
    return null
  }

  const indexOfCurrentStep = steps.findIndex(step => step === currentStep)
  const previousStepIndex = indexOfCurrentStep - 1

  return previousStepIndex >= 0 ? steps[previousStepIndex] ?? null : null
}

export default getPreviousStep
