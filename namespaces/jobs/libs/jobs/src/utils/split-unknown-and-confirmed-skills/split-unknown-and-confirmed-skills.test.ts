import { SkillRating } from '@staff-portal/graphql/staff'

import { splitUnknownAndConfirmedSkills } from './split-unknown-and-confirmed-skills'
import { JobSkillSet } from '../../types'

const createSkill = (count: number, index: number): JobSkillSet => ({
  rating: SkillRating.COMPETENT,
  main: false,
  skill: {
    id: `${index}`,
    name: `${index}`,
    category: {
      id: '1',
      title: '1'
    },
    competentProfilesCount: count,
    strongProfilesCount: count,
    expertProfilesCount: count,
    totalProfilesCount: count
  }
})

describe('splitUnknownAndConfirmedSkills', () => {
  it('should split correctly', () => {
    const skills = [1, 0, 1, 0, 0, 1, 0].map(createSkill)

    const [confirmedSkills, unknownSkills] =
      splitUnknownAndConfirmedSkills(skills)

    expect(confirmedSkills).toHaveLength(3)
    expect(unknownSkills).toHaveLength(4)
  })
})
