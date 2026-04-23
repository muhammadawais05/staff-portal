import { SkillRating } from '@staff-portal/graphql/staff'

import { JobSkillSet } from '../../types'
import { SkillFragment } from './skill-fragment.staff.gql.types'

export const createSkillMock = (
  skill?: Partial<SkillFragment>
): SkillFragment => ({
  id: '1',
  name: 'Skill Name',
  category: { id: '1', title: 'Other' },
  competentProfilesCount: 10,
  expertProfilesCount: 12,
  strongProfilesCount: 13,
  totalProfilesCount: 35,
  ...skill
})

export const createSkillSetMock = (
  skillSet?: Partial<JobSkillSet>
): JobSkillSet => ({
  main: true,
  rating: SkillRating.EXPERT,
  niceToHave: true,
  skill: createSkillMock(),
  ...skillSet
})
