import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import getNextStep from './get-next-step'

describe('getNextStep', () => {
  describe('cases when it returns null', () => {
    it('when steps and currentStep are not defined', () => {
      expect(getNextStep(undefined, null)).toBeNull()
    })

    it('when steps are not defined', () => {
      expect(
        getNextStep(undefined, NewEngagementWizardStep.AVAILABILITY)
      ).toBeNull()
    })

    it('when steps array is blank', () => {
      expect(getNextStep([], NewEngagementWizardStep.AVAILABILITY)).toBeNull()
    })

    it('when currentStep is not defined', () => {
      expect(
        getNextStep([NewEngagementWizardStep.AVAILABILITY], null)
      ).toBeNull()
    })

    it('when the last step is chosen', () => {
      expect(
        getNextStep(
          [NewEngagementWizardStep.AVAILABILITY],
          NewEngagementWizardStep.AVAILABILITY
        )
      ).toBeNull()
    })
  })

  describe('cases when it returns a next step', () => {
    it('simply returns a next step', () => {
      expect(
        getNextStep(
          [
            NewEngagementWizardStep.AVAILABILITY,
            NewEngagementWizardStep.DETAILS,
            NewEngagementWizardStep.PITCH
          ],
          NewEngagementWizardStep.DETAILS
        )
      ).toEqual(NewEngagementWizardStep.PITCH)
    })

    it('returns a first step if currentStep is not in the steps list', () => {
      expect(
        getNextStep(
          [NewEngagementWizardStep.AVAILABILITY],
          NewEngagementWizardStep.PITCH
        )
      ).toEqual(NewEngagementWizardStep.AVAILABILITY)
    })
  })
})
