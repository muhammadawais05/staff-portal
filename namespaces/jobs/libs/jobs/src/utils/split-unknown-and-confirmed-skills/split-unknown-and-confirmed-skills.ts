import { SkillRating } from '@staff-portal/graphql/staff'

import { JobSkillSet } from '../../types'
import { getJobSkillRatingCount } from '../get-job-skill-rating-count'

export const splitUnknownAndConfirmedSkills = (skills: JobSkillSet[]) =>
  skills.reduce<[JobSkillSet[], JobSkillSet[]]>(
    (result, skill) => {
      const ratingCount = getJobSkillRatingCount({
        ...skill,
        rating: SkillRating.COMPETENT
      })

      if (ratingCount > 0) {
        result[0].push(skill)
      } else {
        result[1].push(skill)
      }

      return result
    },
    [[], []]
  )
