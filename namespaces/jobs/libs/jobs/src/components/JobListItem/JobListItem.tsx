import React from 'react'
import { LinkWrapper } from '@staff-portal/ui'
import { useGetNode } from '@staff-portal/data-layer-service'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import {
  Container,
  Section,
  SectionProps,
  TypographyOverflow
} from '@toptal/picasso'

import { JOB_UPDATED } from '../../messages'
import JobListItemSkeletonLoader from '../JobListItemSkeletonLoader'
import JobBadges from '../JobBadges'
import ProbabilityToConvert from '../ProbabilityToConvert'
import { GetJobListItemDocument } from './data/get-job-list-item/get-job-list-item.staff.gql.types'
import {
  JobItemListHeaderActions,
  JobDescriptionField,
  JobItemDetails
} from './components'

interface Props extends Omit<SectionProps, 'title' | 'actions'> {
  jobId: string
}

const JobListItem = ({ jobId, ...props }: Props) => {
  const {
    data: job,
    loading,
    refetch
  } = useGetNode(GetJobListItemDocument)({ jobId })

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())

  if (loading && !job) {
    return <JobListItemSkeletonLoader {...props} />
  }

  if (!job) {
    return null
  }

  return (
    <Section
      {...props}
      title={
        <>
          <TypographyOverflow weight='inherit' tooltipContent={job.title}>
            <LinkWrapper
              wrapWhen={Boolean(job.webResource.url)}
              href={job.webResource.url as string}
              data-testid='job-list-item-title'
            >
              {job.title}
            </LinkWrapper>
          </TypographyOverflow>

          <JobBadges
            enterprise={job.client.enterprise}
            rehire={job.rehire}
            automatedAvailabilityRequests={job.automatedAvailabilityRequests}
          />
        </>
      }
      actions={
        <>
          <ProbabilityToConvert
            probabilityToConvertData={job.probabilityToConvert}
            estimatedRevenue={job.estimatedRevenue}
            estimatedValue={job.estimatedValue}
          />

          <JobItemListHeaderActions job={job} />
        </>
      }
      data-testid='job-list-item'
    >
      <JobItemDetails job={job} />
      {job.description && (
        <Container right='small' left='small' top='medium'>
          <JobDescriptionField text={job.description} />
        </Container>
      )}
    </Section>
  )
}

export default JobListItem
