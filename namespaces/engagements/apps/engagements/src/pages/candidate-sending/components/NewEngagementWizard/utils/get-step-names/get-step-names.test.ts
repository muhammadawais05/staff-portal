import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import getStepNames from './get-step-names'

describe('#getStepNames', () => {
  it('returns base step names', () => {
    expect(
      getStepNames([
        NewEngagementWizardStep.AVAILABILITY,
        NewEngagementWizardStep.DETAILS,
        NewEngagementWizardStep.FEEDBACK,
        NewEngagementWizardStep.NEXT,
        NewEngagementWizardStep.PITCH,
        NewEngagementWizardStep.POSITION,
        NewEngagementWizardStep.SKILLS
      ])
    ).toEqual([
      'Availability',
      'Details',
      'Feedback',
      "What's next?",
      'Pitch',
      "Talent's Position",
      'Skills'
    ])
  })

  describe("when talent's role is known", () => {
    it('returns valid step names', () => {
      expect(
        getStepNames(
          [
            NewEngagementWizardStep.AVAILABILITY,
            NewEngagementWizardStep.DETAILS,
            NewEngagementWizardStep.FEEDBACK,
            NewEngagementWizardStep.NEXT,
            NewEngagementWizardStep.PITCH,
            NewEngagementWizardStep.POSITION,
            NewEngagementWizardStep.SKILLS
          ],
          'Developer'
        )
      ).toEqual([
        'Availability',
        'Details',
        'Feedback',
        "What's next?",
        'Pitch',
        "Developer's Position",
        'Skills'
      ])
    })
  })
})
