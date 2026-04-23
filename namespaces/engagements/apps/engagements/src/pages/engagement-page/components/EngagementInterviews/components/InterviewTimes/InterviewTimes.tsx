import { Container } from '@toptal/picasso'
import React from 'react'
import {
  EngagementStatus,
  InterviewStatus,
  Engagement
} from '@staff-portal/graphql/staff'

import { EngagementInterviewFragment } from '../../data/get-engagement-interviews'
import InterviewTime from '../InterviewTime'

export interface Props {
  interview: Pick<
    EngagementInterviewFragment,
    'scheduledAtTimes' | 'interviewTime' | 'status' | 'timeZone'
  >
  engagement: Pick<Engagement, 'status'>
}

const InterviewDateAndTimeField = ({
  interview: {
    scheduledAtTimes,
    interviewTime,
    status: interviewStatus,
    timeZone
  },
  engagement: { status: engagementStatus }
}: Props) => {
  if (
    engagementStatus === EngagementStatus.REVIEWED &&
    interviewStatus === InterviewStatus.PENDING
  ) {
    return null
  }

  if (
    interviewStatus === InterviewStatus.SCHEDULED &&
    scheduledAtTimes.length > 1
  ) {
    return (
      <>
        {scheduledAtTimes.map((scheduledAt, index) => (
          <Container top={index > 0 ? 'xsmall' : undefined} key={scheduledAt}>
            <InterviewTime interviewTime={scheduledAt} timeZone={timeZone} />
          </Container>
        ))}
      </>
    )
  }

  return interviewTime ? (
    <InterviewTime interviewTime={interviewTime} timeZone={timeZone} />
  ) : null
}

export default InterviewDateAndTimeField
