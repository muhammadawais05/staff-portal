import React from 'react'
import { Section, Container, ProgressBar, Typography } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useGetNode } from '@staff-portal/data-layer-service'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'

import {
  JobSummaryProgressSkeletonLoader,
  JobSummaryProgressTable
} from './components'
import { GetJobSummaryProgressDocument } from './data/get-job-summary-progress'
import { formatMissingFields } from './utils'

interface Props {
  jobId: string
}

const JobSummaryProgress = ({ jobId }: Props) => {
  const { data, loading, refetch } = useGetNode(GetJobSummaryProgressDocument)({
    jobId
  })

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  if (!data && loading) {
    return <JobSummaryProgressSkeletonLoader />
  }

  if (!data?.summaryProgress) {
    return null
  }

  const total = data.summaryProgress.total
  const completeFields = data.summaryProgress.completeFields
  const emptyFields = data.summaryProgress.emptyFields
  const percentage = data.summaryProgress.percentage
  const createdThrough = data?.createdThrough
  const author = data?.createdBy

  return (
    <Section
      variant='withHeaderBar'
      title='Progress'
      data-testid='JobSummaryProgress-section'
    >
      <Container
        flex
        justifyContent='space-between'
        bottom='small'
        data-testid='JobSummaryProgress-fields-filled'
      >
        <Typography size='medium'>Fields filled:</Typography>

        <Typography size='medium'>
          {`${completeFields.length} out of ${total} (${percentage}%)`}
        </Typography>
      </Container>
      <ProgressBar value={percentage} />

      {!!emptyFields.length && (
        <Container
          top='small'
          flex
          data-testid='JobSummaryProgress-empty-fields'
        >
          <Typography size='medium' weight='semibold'>
            {`${emptyFields.length} fields are missing: ${formatMissingFields(
              emptyFields
            )}`}
          </Typography>
        </Container>
      )}

      {(author || createdThrough) && (
        <JobSummaryProgressTable
          author={author}
          createdThrough={createdThrough}
        />
      )}
    </Section>
  )
}

export default JobSummaryProgress
