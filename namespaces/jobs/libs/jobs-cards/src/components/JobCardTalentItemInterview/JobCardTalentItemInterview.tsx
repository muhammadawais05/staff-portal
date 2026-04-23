import { Container } from '@toptal/picasso'
import React from 'react'
import { Engagement } from '@staff-portal/graphql/staff'
import { NoteCard } from '@staff-portal/ui'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'
import { getEngagementDetailedStatus } from '@staff-portal/engagements-interviews'

const isInterviewTimeAccepted = (engagement: Engagement) =>
  engagement.cumulativeStatus ===
  EngagementCumulativeStatus.INTERVIEW_TIME_ACCEPTED

interface Props {
  engagement: Engagement
}

const JobCardTalentItemInterview = ({ engagement }: Props) => {
  return (
    <Container top='small'>
      {isInterviewTimeAccepted(engagement) && (
        <NoteCard data-testid='interview-scheduled-time'>
          {getEngagementDetailedStatus(engagement)}
        </NoteCard>
      )}
    </Container>
  )
}

export default JobCardTalentItemInterview
