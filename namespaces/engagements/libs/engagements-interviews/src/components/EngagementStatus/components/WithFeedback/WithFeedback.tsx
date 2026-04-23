import { QuestionMark16, Typography } from '@toptal/picasso'
import React from 'react'
import { Maybe } from '@staff-portal/graphql/staff'
import { ColoredStatus } from '@staff-portal/ui'
import { JobCandidateIntroDraftsFeedbackFragment } from '@staff-portal/jobs'

import { getFeedbackStatusColor } from './utils'
import { EngagementDetailedStatusData } from '../../../../types'
import { getEngagementDetailedStatus } from '../../../../services'

export interface Props {
  engagement: EngagementDetailedStatusData
  feedback?: Maybe<JobCandidateIntroDraftsFeedbackFragment>
}

const WithFeedback = ({ engagement, feedback }: Props) => {
  const detailedStatus = getEngagementDetailedStatus(engagement)

  const tooltipOptions = feedback
    ? {
        tooltipContent: (
          <>
            <Typography weight='semibold' color='inherit'>
              {feedback.reason.name}
            </Typography>

            <Typography color='inherit'>{feedback.comment}</Typography>
          </>
        ),
        tooltipIcon: <QuestionMark16 />
      }
    : {}

  return (
    <ColoredStatus
      data-testid='status'
      status={detailedStatus}
      color={getFeedbackStatusColor(engagement)}
      {...tooltipOptions}
    />
  )
}

export default WithFeedback
