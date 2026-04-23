import { Maybe } from '@toptal/picasso/utils'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { JobType } from '@staff-portal/jobs'

import { isMinCommitmentVisible } from './is-min-commitment-hidden'

type CaseType = [
  EngagementCommitmentEnum,
  JobType,
  Maybe<{
    id: string
    minimumHours: number
  }>
]

const falsyCases: CaseType[] = [
  [EngagementCommitmentEnum.FULL_TIME, JobType.DESIGNER, null],
  [EngagementCommitmentEnum.PART_TIME, JobType.DEVELOPER, null],
  [EngagementCommitmentEnum.HOURLY, JobType.DESIGNER, null],
  [EngagementCommitmentEnum.HOURLY, JobType.DEVELOPER, null]
]

const truthyCases: CaseType[] = [
  [
    EngagementCommitmentEnum.HOURLY,
    JobType.DEVELOPER,
    {
      id: '11',
      minimumHours: 4
    }
  ]
]

describe('#isMinCommitmentVisible', () => {
  describe('returns true', () => {
    it.each(truthyCases)('%s', (commitment, talentType, commitmentSettings) => {
      expect(
        isMinCommitmentVisible({ commitment, talentType, commitmentSettings })
      ).toBe(true)
    })
  })

  describe('returns false', () => {
    it.each(falsyCases)('%s', (commitment, talentType, commitmentSettings) => {
      expect(
        isMinCommitmentVisible({ commitment, talentType, commitmentSettings })
      ).toBe(false)
    })
  })
})
