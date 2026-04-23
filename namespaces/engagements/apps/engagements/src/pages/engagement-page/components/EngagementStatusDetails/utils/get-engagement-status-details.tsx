import { EngagementStatus as EngagementStatusType } from '@staff-portal/graphql/staff'
import { getRoleTypeText } from '@staff-portal/facilities'

import { EngagementStatusFragment } from '../../EngagementStatusSection/data'
import { getPerformer } from './get-performer'
import { getStatusMessageMapping } from './get-status-message-mapping'
import { getStatusWithCommentMessageMapping } from './get-status-with-comment-message-mapping'

export type EngagementStatusDetailsParam = EngagementStatusFragment & {
  status: EngagementStatusType
}

export const getEngagementStatusDetails = (
  data: EngagementStatusDetailsParam
) => {
  const {
    status,
    lastRelevantPerformedAction,
    postponedPerformedAction,
    talent,
    expiresOn
  } = data

  const formattedTalentType = getRoleTypeText(talent?.type).toLowerCase()

  if (
    (status === EngagementStatusType.CANCELLED ||
      status === EngagementStatusType.REJECTED_INTERVIEW ||
      status === EngagementStatusType.REJECTED_TRIAL) &&
    lastRelevantPerformedAction
  ) {
    const { performer, comment, occurredAt } = lastRelevantPerformedAction

    return {
      message: getStatusWithCommentMessageMapping({
        talentType: formattedTalentType,
        performer: getPerformer(performer)
      })[status],
      comment,
      occurredAt
    }
  }

  if (
    postponedPerformedAction &&
    status === EngagementStatusType.EXPIRATION_POSTPONED
  ) {
    const { performer, comment, occurredAt } = postponedPerformedAction

    return {
      message: getStatusWithCommentMessageMapping({
        talentType: formattedTalentType,
        performer: getPerformer(performer),
        date: expiresOn
      })[status],
      comment,
      occurredAt
    }
  }

  return {
    message: getStatusMessageMapping({
      talentType: formattedTalentType
    })[status]
  }
}
