import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

import { getCommitmentOptions } from './getCommitmentOptions'

describe('#getCommitmentOptions', () => {
  describe('when no argument is passed', () => {
    it('returns all commitment options', () => {
      expect(getCommitmentOptions()).toEqual([
        {
          text: 'Full-time (40+ hours/week)',
          value: 'FULL_TIME'
        },
        {
          text: 'Hourly',
          value: 'HOURLY'
        },
        {
          text: 'Part-time (20+ hours/week)',
          value: 'PART_TIME'
        }
      ])
    })
  })

  describe('when commitment enum values are passed', () => {
    it('returns commitment options for passed values', () => {
      expect(
        getCommitmentOptions([EngagementCommitmentEnum.FULL_TIME])
      ).toEqual([
        {
          text: 'Full-time (40+ hours/week)',
          value: 'FULL_TIME'
        }
      ])
    })
  })
})
