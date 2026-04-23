import { ReviewKind } from '@staff-portal/graphql/staff'

import { ReviewAttemptFragment } from '../data'

export const getIsReviewAttemptsSectionCollapsedByDefault = (
  reviewAttempts: ReviewAttemptFragment[]
) =>
  !reviewAttempts.length ||
  reviewAttempts.some(({ kind }) => kind === ReviewKind.SUCCESS)
