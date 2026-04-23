import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

export const getInitialNewEngagementWizardResponse = () => ({
  data: {
    newEngagementWizard: {
      actualSteps: [
        NewEngagementWizardStep.POSITION,
        NewEngagementWizardStep.SKILLS,
        NewEngagementWizardStep.AVAILABILITY,
        NewEngagementWizardStep.DETAILS,
        NewEngagementWizardStep.PITCH,
        NewEngagementWizardStep.FEEDBACK,
        NewEngagementWizardStep.NEXT
      ],
      errors: [],
      job: null,
      stepToSubmit: NewEngagementWizardStep.POSITION,
      steps: [
        NewEngagementWizardStep.POSITION,
        NewEngagementWizardStep.SKILLS,
        NewEngagementWizardStep.AVAILABILITY,
        NewEngagementWizardStep.DETAILS,
        NewEngagementWizardStep.PITCH,
        NewEngagementWizardStep.FEEDBACK,
        NewEngagementWizardStep.NEXT
      ],
      talent: null,
      __typename: 'NewEngagementWizard'
    }
  }
})
