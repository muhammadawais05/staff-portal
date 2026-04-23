import { TalentSoftSkillFragment } from '../data/get-talent-soft-skills/get-talent-soft-skills.staff.gql.types'
import { Rating } from './rating'

export type TalentSoftSkills = TalentSoftSkillFragment & {
  cumulativeRating?: number
  ratings: Rating[]
}
