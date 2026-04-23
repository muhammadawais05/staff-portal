import React from 'react'
import { Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { JobStatus, JobEditFragment } from '@staff-portal/jobs'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { GridItemField } from '@staff-portal/ui'
import { isNotNullish } from '@staff-portal/utils'

import {
  JobTypeSelect,
  JobSpecializationSelect,
  JobDesiredStartDateSelect
} from './components'

interface Props {
  job: JobEditFragment
}

const JobBasicInfoFormContent = ({ job }: Props) => (
  <>
    <GridItemField label='Job Title' labelFor='title' required>
      <Form.Input
        id='title'
        name='title'
        required
        data-lpignore='true'
        width='full'
      />
    </GridItemField>

    <GridItemField label='Status'>
      <JobStatus size='medium' job={job} />
    </GridItemField>

    <GridItemField label='Job Posted'>
      {job.postedAt && (
        <Typography size='medium' weight='semibold'>
          {getDateDistanceFromNow(job.postedAt)}
        </Typography>
      )}
    </GridItemField>

    <JobDesiredStartDateSelect required={isNotNullish(job.startDate)} />

    <JobTypeSelect
      originalJobVerticalId={job.vertical?.id}
      disabled={!!job.engagements?.totalCount}
    />

    {job.claimer && (
      <JobSpecializationSelect
        originalJobVerticalId={job.vertical?.id}
        originalSpecializationId={job.specialization?.id}
        disabled={!!job.engagements?.totalCount}
      />
    )}
  </>
)

export default JobBasicInfoFormContent
