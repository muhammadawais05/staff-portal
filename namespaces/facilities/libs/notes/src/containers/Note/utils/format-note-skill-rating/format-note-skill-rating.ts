import { SoftSkillRatingValue } from '@staff-portal/graphql/staff'

import { SOFT_SKILL_RATING_MAPPING } from '../../../../config'

export const formatNoteSkillRating = (
  value: SoftSkillRatingValue,
  comment?: string
) => [SOFT_SKILL_RATING_MAPPING[value], comment].filter(Boolean).join('. ')
