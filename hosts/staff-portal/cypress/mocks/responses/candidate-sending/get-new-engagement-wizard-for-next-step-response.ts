import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

export const getNewEngagementWizardForNextStepResponse = ({
  actualSteps,
  steps
}: {
  actualSteps?: NewEngagementWizardStep[]
  steps?: NewEngagementWizardStep[]
} = {}) => ({
  data: {
    newEngagementWizard: {
      errors: [],
      actualSteps: actualSteps ?? [
        NewEngagementWizardStep.POSITION,
        NewEngagementWizardStep.SKILLS,
        NewEngagementWizardStep.AVAILABILITY,
        NewEngagementWizardStep.DETAILS,
        NewEngagementWizardStep.PITCH,
        NewEngagementWizardStep.FEEDBACK,
        NewEngagementWizardStep.NEXT
      ],
      steps: steps ??
        actualSteps ?? [
          NewEngagementWizardStep.POSITION,
          NewEngagementWizardStep.SKILLS,
          NewEngagementWizardStep.AVAILABILITY,
          NewEngagementWizardStep.DETAILS,
          NewEngagementWizardStep.PITCH,
          NewEngagementWizardStep.FEEDBACK,
          NewEngagementWizardStep.NEXT
        ],
      __typename: 'NewEngagementWizard'
    }
  }
})
