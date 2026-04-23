import {
  RoleStepSoftSkillRating,
  SoftSkillRatingInput,
  SoftSkillRatingValue
} from '@staff-portal/graphql/staff'

import { NoteFormSoftSkill } from '../../types'

export const formatSoftSkillRatings = (
  softSkillRatings: NoteFormSoftSkill[]
): SoftSkillRatingInput[] =>
  softSkillRatings.map(
    ({
      softSkill: { id: softSkillId },
      comment,
      value = SoftSkillRatingValue.RATING_1
    }) => ({
      softSkillId,
      value,
      comment: comment ?? ''
    })
  )

export const formatSoftSkillRatingsWithId = (
  softSkillRatings: NoteFormSoftSkill[]
): RoleStepSoftSkillRating[] =>
  softSkillRatings.map(
    ({
      id: softSkillRatingId,
      softSkill: { id: softSkillId },
      comment,
      value = SoftSkillRatingValue.RATING_1
    }) => ({
      softSkillRatingId: softSkillRatingId as string,
      softSkillId,
      value,
      comment: comment ?? ''
    })
  )
