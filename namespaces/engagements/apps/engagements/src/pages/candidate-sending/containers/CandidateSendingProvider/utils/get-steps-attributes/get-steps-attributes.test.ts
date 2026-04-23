import {
  NewEngagementWizardStep,
  SkillVettingResult
} from '@staff-portal/graphql/staff'

import {
  CandidateSendingDetailsStepAttributes,
  CandidateSendingPitchStepAttributes
} from '../../../../types'
import getStepsAttributes from './get-steps-attributes'

jest.mock('../../../../utils', () => ({
  adjustAvailabilityStepFormValues: (args: any) => args,
  adjustDetailsStepFormValues: (args: any) => args,
  adjustPitchStepFormValues: (args: any) => args,
  adjustSkillsStepFormValues: (args: any) => args
}))

describe('getStepsAttributes', () => {
  it('flats all attributes to the only object', () => {
    expect(
      getStepsAttributes({
        [NewEngagementWizardStep.POSITION]: {
          jobId: 'jobId',
          talentId: 'talentId',
          engagementId: 'engagementId'
        },
        [NewEngagementWizardStep.SKILLS]: {
          skillVettingResult: SkillVettingResult.EXPERT,
          skillVettingComment: 'comment'
        },
        [NewEngagementWizardStep.AVAILABILITY]: {
          availabilityConfirmed: true,
          acceptLowerCommitment: true
        },
        [NewEngagementWizardStep.DETAILS]: {
          billCycleConfirmed: true,
          markup: 'blah'
        } as CandidateSendingDetailsStepAttributes,
        [NewEngagementWizardStep.PITCH]: {
          ccSuggested: ['cc'],
          to: 'to'
        } as CandidateSendingPitchStepAttributes,
        [NewEngagementWizardStep.FEEDBACK]: {}
      })
    ).toStrictEqual({
      jobId: 'jobId',
      talentId: 'talentId',
      engagementId: 'engagementId',
      skillVettingResult: SkillVettingResult.EXPERT,
      skillVettingComment: 'comment',
      availabilityConfirmed: true,
      acceptLowerCommitment: true,
      billCycleConfirmed: true,
      markup: 'blah',
      ccSuggested: ['cc'],
      to: 'to'
    })
  })
})
