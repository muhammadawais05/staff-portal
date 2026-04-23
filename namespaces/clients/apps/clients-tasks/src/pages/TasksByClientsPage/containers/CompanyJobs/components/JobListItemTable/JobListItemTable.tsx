import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { Typography } from '@toptal/picasso'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { JobStatus } from '@staff-portal/jobs'

import EngagementsList from '../EngagementsList/EngagementsList'
import { ClientJobFragment } from '../../data/get-client-jobs.staff.gql.types'

interface Props {
  job: ClientJobFragment
}

const JobListItemTable = ({ job }: Props) => (
  <DetailedList>
    <DetailedList.Row>
      {job.postedAt && (
        <DetailedList.Item label='Job Posted'>
          <Typography>{getDateDistanceFromNow(job.postedAt)}</Typography>
        </DetailedList.Item>
      )}
      <DetailedList.Item label='Status'>
        <JobStatus job={job} />
      </DetailedList.Item>
    </DetailedList.Row>
    <EngagementsList engagements={job?.engagements?.nodes || []} />
  </DetailedList>
)

export default JobListItemTable
