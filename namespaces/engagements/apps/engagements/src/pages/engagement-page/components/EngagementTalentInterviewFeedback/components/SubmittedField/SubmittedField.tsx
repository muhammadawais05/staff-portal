import { Typography } from '@toptal/picasso'
import { Maybe } from '@toptal/picasso/utils'
import React from 'react'
import { WrapWithTooltip } from '@staff-portal/ui'
import {
  DEFAULT_FULL_DATE_FORMAT_WITH_TIMEZONE,
  getDateDistanceFromNow,
  getDifferenceInDaysFromNow
} from '@staff-portal/date-time-utils'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'

interface Props {
  answeredAt: Maybe<string>
}

const SubmittedField = ({ answeredAt }: Props) => {
  const formatDateTime = useUserDateTimeFormatter()

  if (!answeredAt) {
    return null
  }
  const daysDiff = getDifferenceInDaysFromNow(answeredAt)

  const enableTooltip = daysDiff < 30
  const content = formatDateTime(
    answeredAt,
    DEFAULT_FULL_DATE_FORMAT_WITH_TIMEZONE
  )

  return (
    <WrapWithTooltip enableTooltip={enableTooltip} content={content}>
      <Typography as='span' data-testid='talent-interview-feedback-submitted'>
        {enableTooltip ? getDateDistanceFromNow(answeredAt) : content}
      </Typography>
    </WrapWithTooltip>
  )
}

export default SubmittedField
