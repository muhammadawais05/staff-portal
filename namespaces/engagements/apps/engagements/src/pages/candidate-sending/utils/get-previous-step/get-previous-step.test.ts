import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import getPreviousStep from './get-previous-step'

describe('getPreviousStep', () => {
  describe('cases when it returns null', () => {
    it('when steps and currentStep are not defined', () => {
      expect(getPreviousStep(undefined, null)).toBeNull()
    })

    it('when steps are not defined', () => {
      expect(
        getPreviousStep(undefined, NewEngagementWizardStep.AVAILABILITY)
      ).toBeNull()
    })

    it('when steps array is blank', () => {
      expect(
        getPreviousStep([], NewEngagementWizardStep.AVAILABILITY)
      ).toBeNull()
    })

    it('when currentStep is not defined', () => {
      expect(
        getPreviousStep([NewEngagementWizardStep.AVAILABILITY], null)
      ).toBeNull()
    })

    it('when the last step is chosen', () => {
      expect(
        getPreviousStep(
          [NewEngagementWizardStep.AVAILABILITY],
          NewEngagementWizardStep.AVAILABILITY
        )
      ).toBeNull()
    })
  })

  describe('cases when it returns a previous step', () => {
    it('simply returns a previous step', () => {
      expect(
        getPreviousStep(
          [
            NewEngagementWizardStep.AVAILABILITY,
            NewEngagementWizardStep.DETAILS,
            NewEngagementWizardStep.PITCH
          ],
          NewEngagementWizardStep.DETAILS
        )
      ).toEqual(NewEngagementWizardStep.AVAILABILITY)
    })
  })
})
