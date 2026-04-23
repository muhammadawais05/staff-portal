import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

import adjustAvailabilityStepFormValues from './adjust-availability-step-form-values'

describe('adjustAvailabilityStepFormValues', () => {
  it('returns adjusted attributes', () => {
    const attributes = adjustAvailabilityStepFormValues({
      availabilityConfirmed: true,
      acceptLowerCommitment: true,
      commitment: EngagementCommitmentEnum.FULL_TIME,
      hasPendingAssignment: true,
      highPriorityLockAcquired: true,
      lockOverrideReason: 'reason',
      engagementEndDatesConfirmed: true,
      lockOverrideConfirmed: true,
      sendCandidateConfirmed: true,
      talentCommitmentConfirmed: true,
      trialLength: 5
    })

    expect(attributes).toEqual({
      availabilityConfirmed: true,
      acceptLowerCommitment: true,
      commitment: EngagementCommitmentEnum.FULL_TIME,
      hasPendingAssignment: true,
      highPriorityLockAcquired: true,
      lockOverrideReason: 'reason',
      trialLength: 5
    })
  })

  describe('when `lockOverrideConfirmed` values is `false`', () => {
    it('returns adjusted attributes', () => {
      const attributes = adjustAvailabilityStepFormValues({
        availabilityConfirmed: true,
        acceptLowerCommitment: true,
        commitment: EngagementCommitmentEnum.FULL_TIME,
        hasPendingAssignment: true,
        highPriorityLockAcquired: true,
        lockOverrideReason: 'reason',
        engagementEndDatesConfirmed: true,
        lockOverrideConfirmed: false,
        sendCandidateConfirmed: true,
        talentCommitmentConfirmed: true,
        trialLength: 5
      })

      expect(attributes).toEqual({
        availabilityConfirmed: true,
        acceptLowerCommitment: true,
        commitment: EngagementCommitmentEnum.FULL_TIME,
        hasPendingAssignment: true,
        highPriorityLockAcquired: true,
        trialLength: 5
      })
    })
  })
})
