import React from 'react'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { DetailedList as DL } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'
import {
  JobStatus,
  JobTimeZoneField,
  ClientLinkField
} from '@staff-portal/jobs'

import { getWorkTypeOption } from '../../../../utils/get-work-type-option'
import { getCurrentEngagementCommitment } from '../../../../utils/get-current-engagement-commitment'
import { EngagementJobDetailsFragment } from '../../data/get-engagement-job-details.staff.gql.types'
import { JobNameValue } from '../../../JobNameValue'
import { DesiredCommitment } from '../../../DesiredCommitment'

interface Props {
  job: EngagementJobDetailsFragment
  labelColumnWidth?: number
}

const EngagementJobDetailsDetailedList = ({ job, labelColumnWidth }: Props) => (
  <DL
    labelColumnWidth={labelColumnWidth}
    defaultValue={NO_VALUE}
    data-testid='engagement-job-details-detailed-list-items'
  >
    <DL.Row>
      <DL.Item label='Job Name'>
        <JobNameValue job={job} />
      </DL.Item>
    </DL.Row>

    <DL.Row>
      <DL.Item
        label='Job Posted'
        value={job.postedAt && getDateDistanceFromNow(job.postedAt)}
      />
    </DL.Row>

    <DL.Row>
      <DL.Item label='Desired Commitment'>
        <DesiredCommitment
          jobCommitment={job.commitment}
          engagementCommitment={getCurrentEngagementCommitment(job.engagements)}
          talentCount={job.talentCount}
        />
      </DL.Item>
    </DL.Row>

    <DL.Row>
      <DL.Item label='Company'>
        <ClientLinkField client={job.client} />
      </DL.Item>
    </DL.Row>

    <DL.Row>
      <DL.Item label='Job Time Zone'>
        <JobTimeZoneField
          timeZonePreference={job.timeZonePreference}
          hasPreferredHours={job.hasPreferredHours}
          hoursOverlap={job.hoursOverlapEnum}
        />
      </DL.Item>
    </DL.Row>

    <DL.Row>
      <DL.Item label='Work Type' value={getWorkTypeOption(job.workType)} />
    </DL.Row>

    <DL.Row>
      <DL.Item label='Status'>
        <JobStatus job={job} size='medium' />
      </DL.Item>
    </DL.Row>
  </DL>
)

export default EngagementJobDetailsDetailedList
