import {
  CommitmentAvailability,
  EngagementCommitmentEnum
} from '@staff-portal/graphql/staff'

import getQuestionText from './get-question-text'

describe('getQuestionText', () => {
  it.each([
    {
      commitment: EngagementCommitmentEnum.HOURLY,
      jobCommitment: CommitmentAvailability.hourly,
      jobExpectedWeeklyHours: 10,
      expectedQuestionText:
        "You're trying to send a talent with 40 hours of availability to a hourly (10 hours) job."
    },
    {
      commitment: EngagementCommitmentEnum.PART_TIME,
      jobCommitment: CommitmentAvailability.part_time,
      jobExpectedWeeklyHours: 10,
      expectedQuestionText:
        "You're trying to send a talent with 40 hours of availability to a part-time job."
    },
    {
      commitment: EngagementCommitmentEnum.FULL_TIME,
      jobCommitment: CommitmentAvailability.full_time,
      jobExpectedWeeklyHours: 10,
      expectedQuestionText:
        "You're trying to send a talent with 40 hours of availability to a full-time job."
    },
    {
      commitment: null,
      jobCommitment: CommitmentAvailability.full_time,
      jobExpectedWeeklyHours: 10,
      expectedQuestionText:
        "You're trying to send a talent with 40 hours of availability to a unknown job."
    }
  ])(
    'returns question text',
    ({
      commitment,
      jobCommitment,
      jobExpectedWeeklyHours,
      expectedQuestionText
    }) => {
      expect(
        getQuestionText({
          commitment,
          jobCommitment,
          jobExpectedWeeklyHours
        })
      ).toBe(expectedQuestionText)
    }
  )
})
