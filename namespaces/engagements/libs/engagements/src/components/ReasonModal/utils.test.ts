import { FeedbackReasonActions } from '@staff-portal/graphql/staff'

import { EngagementReasonMutations, getReasonAction } from './utils'

describe('getReasonAction', () => {
  describe('returns proper mutation name for specific reason action', () => {
    it.each([
      ['rejectEngagementTrial', FeedbackReasonActions.TRIAL_REJECTED],
      ['rejectApprovedEngagementTrial', FeedbackReasonActions.TRIAL_REJECTED],
      [
        'cancelEngagementInInterview',
        FeedbackReasonActions.INTERVIEW_CANCELLED
      ],
      [
        'cancelEngagementDraftInInterview',
        FeedbackReasonActions.INTERVIEW_CANCELLED
      ],
      ['cancelEngagementTrial', FeedbackReasonActions.INTERVIEW_CANCELLED],
      ['rejectApprovedEngagementTrial', FeedbackReasonActions.TRIAL_REJECTED],
      ['rejectEngagementOnInterview', FeedbackReasonActions.CANDIDATE_REJECTED],
      ['rejectDraftEngagement', FeedbackReasonActions.ENGAGEMENT_DRAFT_REJECTED]
    ])('%s', (input, expected) => {
      expect(getReasonAction(input as EngagementReasonMutations)).toStrictEqual(
        expected
      )
    })
  })
})
