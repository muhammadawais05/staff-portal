import { SkillRating } from '@staff-portal/graphql/staff'

import { JobSkillSet } from '../../types'

export const getJobSkillRatingCount = ({
  rating,
  skill: { competentProfilesCount, expertProfilesCount, strongProfilesCount }
}: JobSkillSet) => {
  switch (rating) {
    case SkillRating.COMPETENT:
      return competentProfilesCount + strongProfilesCount + expertProfilesCount
    case SkillRating.STRONG:
      return strongProfilesCount + expertProfilesCount
    case SkillRating.EXPERT:
      return expertProfilesCount
    default:
      // This case is not reachable, so there is no need to test it
      return 0
  }
}
