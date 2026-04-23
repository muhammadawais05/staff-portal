import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import Picasso from '@toptal/picasso-provider'
import {
  JobStatus,
  CumulativeJobStatus,
  Investigation
} from '@staff-portal/graphql/staff'

import { default as JobStatusComponent } from '../JobStatus'
import { JobStatusInput } from '../../../types'

export default {
  title: 'Job Status'
}

const investigation = {
  id: 'Id',
  startedAt: '2020-02-20T00:00:00+00:00'
} as Partial<Investigation>

/* eslint-disable-next-line @typescript-eslint/no-explicit-any  */
const jobObject = (customOptions: any) =>
  ({
    talentCount: 1,
    hiredCount: 3,
    matcherCallScheduled: false,
    status: JobStatus.ACTIVE,
    cumulativeStatus: CumulativeJobStatus.ACTIVE,
    ...customOptions
  } as JobStatusInput)

export const JobStatusesSet = () => {
  const statusOptions = Object.values(JobStatus).map(status => {
    const job = jobObject({ status: status })

    return (
      <Container bottom='medium' key={status}>
        <Container bottom='medium'>
          <Typography size='medium'>
            <b>Job Status:</b> {job.status}, <b>Cumulative Status:</b>{' '}
            {job.cumulativeStatus}
          </Typography>
        </Container>

        <JobStatusComponent job={job} />
      </Container>
    )
  })

  return (
    <Picasso>
      <Container padded='xlarge'>{statusOptions}</Container>
    </Picasso>
  )
}

export const JobStatusesWithInvestigation = () => {
  const statusOptions = Object.values(JobStatus).map(status => {
    const job = jobObject({
      status: status,
      currentInvestigation: investigation
    })

    return (
      <Container bottom='medium' key={status}>
        <Container bottom='medium'>
          <Typography size='medium'>
            <b>Job Status:</b> {job.status}, <b>Cumulative Status:</b>{' '}
            {job.cumulativeStatus}
          </Typography>
        </Container>

        <Container left={3}>
          <JobStatusComponent job={job} />
        </Container>
      </Container>
    )
  })

  return (
    <Picasso>
      <Container padded='xlarge'>
        <Container bottom='medium'>
          <Typography size='large'>All items have an investigation</Typography>
        </Container>

        {statusOptions}
      </Container>
    </Picasso>
  )
}

export const JobStatusesForCumulitiveStatusWithoutInvestigation = () => {
  const cumulitiveStatusOptions = Object.values(CumulativeJobStatus).map(
    cumulitiveStatus => {
      const job = jobObject({
        cumulativeStatus: cumulitiveStatus
      })

      return (
        <Container bottom='medium' key={cumulitiveStatus}>
          <Container bottom='medium'>
            <Typography size='medium'>
              <b>Job Status:</b> {job.status}, <b>Cumulative Status:</b>{' '}
              {job.cumulativeStatus}
            </Typography>
          </Container>

          <JobStatusComponent job={job} />
        </Container>
      )
    }
  )

  return (
    <Picasso>
      <Container padded='xlarge'>
        <Container bottom='medium'>
          <Typography size='large'>
            All items do not have an investigation
          </Typography>
        </Container>

        {cumulitiveStatusOptions}
      </Container>
    </Picasso>
  )
}

export const JobStatusesForCumulitiveStatusWithInvestigation = () => {
  const cumulitiveStatusOptions = Object.values(CumulativeJobStatus).map(
    cumulitiveStatus => {
      const job = jobObject({
        currentInvestigation: investigation,
        cumulativeStatus: cumulitiveStatus
      })

      return (
        <Container bottom='medium' key={cumulitiveStatus}>
          <Container bottom='medium'>
            <Typography size='medium'>
              <b>Job Status:</b> {job.status}, <b>Cumulative Status:</b>{' '}
              {job.cumulativeStatus}
            </Typography>
          </Container>

          <Container left={3}>
            <JobStatusComponent job={job} />
          </Container>
        </Container>
      )
    }
  )

  return (
    <Picasso>
      <Container padded='xlarge'>
        <Container bottom='medium'>
          <Typography size='large'>All items have an investigation</Typography>
        </Container>

        {cumulitiveStatusOptions}
      </Container>
    </Picasso>
  )
}

export const JobStatusesMultipleHires = () => {
  const job = jobObject({
    talentCount: 2,
    cumulativeStatus: CumulativeJobStatus.ACTIVE
  })

  return (
    <Picasso>
      <Container padded='xlarge'>
        <Container bottom='medium'>
          <Typography size='large'>Multiple Hires</Typography>
        </Container>

        <Container bottom='medium'>
          <Container bottom='medium'>
            <Typography size='medium'>Multiple Hires Tooltip</Typography>
          </Container>

          <Container left={3}>
            <JobStatusComponent job={job} />
          </Container>
        </Container>
      </Container>
    </Picasso>
  )
}

export const JobStatusesClosedJobs = () => {
  const job = jobObject({
    talentCount: 1,
    cumulativeStatus: CumulativeJobStatus.END_SCHEDULED
  })

  return (
    <Picasso>
      <Container padded='xlarge'>
        <Container bottom='medium'>
          <Typography size='large'>Closed Job</Typography>
        </Container>

        <Container bottom='medium'>
          <Container bottom='medium'>
            <Typography size='medium'>Closed Job. No a tooltip.</Typography>
          </Container>

          <Container left={3}>
            <JobStatusComponent job={job} />
          </Container>
        </Container>
      </Container>
    </Picasso>
  )
}
