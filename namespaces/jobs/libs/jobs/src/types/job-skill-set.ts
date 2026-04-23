import { Scalars, SkillRating } from '@staff-portal/graphql/staff'

import { SkillFragment } from '../data'

export interface JobSkillSet {
  id?: string
  destroy?: boolean
  rating: SkillRating
  main: boolean
  skill: Omit<SkillFragment, 'id'> & { id?: string }
  niceToHave?: boolean
  addedAt?: Scalars['Time']
  requestId?: string
  totalProfilesCount?: number
}
