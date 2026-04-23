import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

const getNextStep = (
  steps: NewEngagementWizardStep[] | undefined,
  currentStep: NewEngagementWizardStep | null
): NewEngagementWizardStep | null => {
  const stepsCount = steps?.length

  if (!currentStep || !stepsCount) {
    return null
  }

  const indexOfCurrentStep = steps.findIndex(step => step === currentStep)
  const nextStepIndex = indexOfCurrentStep + 1

  return nextStepIndex <= stepsCount - 1 ? steps[nextStepIndex] ?? null : null
}

export default getNextStep
