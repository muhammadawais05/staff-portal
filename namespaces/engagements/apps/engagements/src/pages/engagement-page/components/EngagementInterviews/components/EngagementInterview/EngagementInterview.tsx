import {
  ArrowDownMinor16,
  ArrowUpMinor16,
  Button,
  Table
} from '@toptal/picasso'
import React, { useState } from 'react'
import {
  extractScheduleOperation,
  RateForClientInterviewButton,
  RescheduleInterviewItem
} from '@staff-portal/engagements-interviews'

import {
  EngagementInterviewFragment,
  GetEngagementInterviewsQuery
} from '../../data/get-engagement-interviews'
import InterviewTimes from '../InterviewTimes'
import InterviewStatus from '../InterviewStatus'
import InterviewContent from '../InterviewContent'

export interface Props {
  interview: EngagementInterviewFragment
  engagement: NonNullable<GetEngagementInterviewsQuery['node']>
}

const EngagementInterview = ({ interview, engagement }: Props) => {
  const [expanded, setExpanded] = useState(false)

  const rescheduleInterviewOperation = extractScheduleOperation([
    interview.operations.clearAndRescheduleSingleCommitInterview,
    interview.operations.clearAndChangeInterviewProposedTimeSlots
  ])

  return (
    <Table.ExpandableRow
      data-testid='EngagementInterview-interview-item'
      expanded={expanded}
      content={<InterviewContent interview={interview} />}
    >
      <Table.Cell>
        <InterviewTimes interview={interview} engagement={engagement} />
      </Table.Cell>
      <Table.Cell>
        <InterviewStatus
          talentType={engagement?.talent?.type}
          interview={interview}
        />
      </Table.Cell>
      <Table.Cell align='right'>
        <RateForClientInterviewButton
          operation={interview.operations.rateForClientInterview}
          interviewId={interview.id}
          engagementId={engagement.id}
        />

        <RescheduleInterviewItem
          componentType='button'
          variant='secondary'
          size='small'
          interviewId={interview.id}
          operation={rescheduleInterviewOperation}
        />

        <Button.Circular
          data-testid='EngagementInterview-expand-button'
          variant='flat'
          icon={expanded ? <ArrowUpMinor16 /> : <ArrowDownMinor16 />}
          onClick={() => setExpanded(prevIsExpanded => !prevIsExpanded)}
        />
      </Table.Cell>
    </Table.ExpandableRow>
  )
}

export default EngagementInterview
