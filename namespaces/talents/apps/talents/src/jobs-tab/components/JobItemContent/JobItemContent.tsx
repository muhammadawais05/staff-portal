import React from 'react'
import { Maybe } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import { DetailedList as DL } from '@staff-portal/ui'
import { JobClaimerField } from '@staff-portal/jobs'
import {
  EngagementCommitment,
  TalentProfileJobsEngagementFragment
} from '@staff-portal/engagements'
import { EngagementStatus } from '@staff-portal/engagements-interviews'

import JobLink from '../JobLink'

interface Props {
  engagement: {
    extraHoursEnabled?: Maybe<boolean>
  } & TalentProfileJobsEngagementFragment
}

const JobItemContent = ({ engagement }: Props) => {
  const jobLink = engagement.job && <JobLink job={engagement.job} />

  return (
    <DL defaultValue={NO_VALUE} labelColumnWidth={8}>
      <DL.Row>
        <DL.Item label='Job' value={jobLink} />
        <DL.Item label='Matcher'>
          <JobClaimerField
            claimer={engagement.job?.claimer}
            claimerReplacement={engagement.job?.claimerHandoff?.replacement}
          />
        </DL.Item>
      </DL.Row>
      <DL.Row>
        <DL.Item label='Commitment'>
          <EngagementCommitment
            commitment={engagement.commitment}
            commitmentAvailability={engagement?.currentCommitment?.availability}
          />
        </DL.Item>
        <DL.Item
          label='Extra Hours'
          value={engagement.extraHoursEnabled ? 'Yes' : 'No'}
        />
      </DL.Row>
      <DL.Row>
        <DL.Item label='Status'>
          <EngagementStatus.Detailed
            engagement={engagement}
            tooltipOptions={{ type: 'extended', ...engagement }}
          />
        </DL.Item>
      </DL.Row>
      <DL.Row>
        <DL.Item label='Lock' value={engagement.currentInterviewLock?.type} />
      </DL.Row>
      <DL.Row>
        <DL.Item
          label='Start Date'
          value={parseAndFormatDate(engagement.startDate) || undefined}
        />
        <DL.Item
          label='End Date'
          value={parseAndFormatDate(engagement.endDate) || undefined}
        />
      </DL.Row>
    </DL>
  )
}

export default JobItemContent
