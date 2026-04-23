import { SoftSkillRatingValue } from '@staff-portal/graphql/staff'

export const SOFT_SKILL_RATING_MAPPING: Record<SoftSkillRatingValue, string> = {
  [SoftSkillRatingValue.RATING_1]: '1',
  [SoftSkillRatingValue.RATING_2]: '2',
  [SoftSkillRatingValue.RATING_3]: '3',
  [SoftSkillRatingValue.RATING_4]: '4',
  [SoftSkillRatingValue.RATING_5]: '5'
}
