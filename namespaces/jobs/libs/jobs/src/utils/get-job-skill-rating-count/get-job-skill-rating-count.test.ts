import { SkillRating } from '@staff-portal/graphql/staff'

import { getJobSkillRatingCount } from './get-job-skill-rating-count'
import { JobSkillSet } from '../../types'

const CONPETENT_COUNT = 111
const STRONG_COUNT = 113
const EXPERT_COUNT = 107

const MOCK_SKILL: JobSkillSet = {
  rating: SkillRating.COMPETENT,
  main: false,
  skill: {
    id: '1',
    name: 'name',
    category: {
      id: '1',
      title: '1'
    },
    competentProfilesCount: CONPETENT_COUNT,
    strongProfilesCount: STRONG_COUNT,
    expertProfilesCount: EXPERT_COUNT,
    totalProfilesCount: CONPETENT_COUNT + STRONG_COUNT + EXPERT_COUNT
  }
}

describe('getJobSkillRatingCount', () => {
  it('returns correct value when rating is COMPETENT', () => {
    expect(
      getJobSkillRatingCount({ ...MOCK_SKILL, rating: SkillRating.COMPETENT })
    ).toEqual(CONPETENT_COUNT + STRONG_COUNT + EXPERT_COUNT)
  })

  it('returns correct value when rating is STRONG', () => {
    expect(
      getJobSkillRatingCount({ ...MOCK_SKILL, rating: SkillRating.STRONG })
    ).toEqual(STRONG_COUNT + EXPERT_COUNT)
  })

  it('returns correct value when rating is EXPERT', () => {
    expect(
      getJobSkillRatingCount({ ...MOCK_SKILL, rating: SkillRating.EXPERT })
    ).toEqual(EXPERT_COUNT)
  })
})
