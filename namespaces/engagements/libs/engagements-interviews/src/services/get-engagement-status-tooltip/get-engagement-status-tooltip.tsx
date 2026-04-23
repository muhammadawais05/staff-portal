import React from 'react'
import { Maybe } from '@toptal/picasso/utils'
import {
  Engagement,
  EngagementTooltipStatus
} from '@staff-portal/graphql/staff'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

type EngagementWithStatus = Pick<Engagement, 'cumulativeStatus'>

type DefaultTooltipOptions = {
  type: 'default'
  tooltipStatus: EngagementTooltipStatus
  engagementEndedFeedbackReason: Maybe<{
    name: string
  }>
  postponedPerformedAction: Maybe<{
    comment?: string | null
  }>
}

type ExtendedTooltipOptions = {
  type: 'extended'
  postponedPerformedAction?: {
    comment?: string | null
  } | null
  statusFeedback?: {
    comment: string
    reason: {
      name: string
    }
  } | null
}

export type EngagementTooltipOptions =
  | DefaultTooltipOptions
  | ExtendedTooltipOptions

const getDefaultTooltipContent = ({
  tooltipStatus,
  engagementEndedFeedbackReason,
  postponedPerformedAction
}: DefaultTooltipOptions) => {
  if (
    tooltipStatus ===
    EngagementTooltipStatus.TIMEZONE_AND_FEEDBACK_ENGAGEMENT_ENDED
  ) {
    return engagementEndedFeedbackReason?.name
  } else if (
    tooltipStatus === EngagementTooltipStatus.POSTPONED_PERFORMED_ACTION_COMMENT
  ) {
    return postponedPerformedAction?.comment
  }
}

const getExtendedTooltipContent = (
  engagement: EngagementWithStatus,
  options: ExtendedTooltipOptions
) => {
  if (
    engagement.cumulativeStatus ===
    EngagementCumulativeStatus.EXPIRATION_POSTPONED
  ) {
    return options.postponedPerformedAction?.comment
  }

  if (options.statusFeedback) {
    return (
      <>
        <b>{options.statusFeedback.reason.name}</b>
        <br />
        {options.statusFeedback.comment}
      </>
    )
  }
}

export default (
  engagement: EngagementWithStatus,
  options?: EngagementTooltipOptions
) => {
  if (!options) {
    return
  }

  return options.type === 'default'
    ? getDefaultTooltipContent(options)
    : getExtendedTooltipContent(engagement, options)
}
