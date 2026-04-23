import React from 'react'
import Section, { SectionProps } from '@toptal/picasso/Section'
import { useGetNode } from '@staff-portal/data-layer-service'
import { ContainerLoader, TableSkeleton } from '@staff-portal/ui'
import {
  TypedMessage,
  useMessageListener
} from '@toptal/staff-portal-message-bus'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'

import JobsList from './components/JobsList/JobsList'
import { GetClientJobsDocument } from './data/get-client-jobs.staff.gql.types'
import { companyJobFilters } from './config'
import getEngagementIdsFromJobs from './utils/get-engagement-ids-from-jobs/get-engagement-ids-from-jobs'

interface Props {
  clientId: string
  sectionVariant?: SectionProps['variant']
  listenedMessages?: TypedMessage[]
}

const CompanyJobs = ({
  clientId,
  sectionVariant = 'default',
  listenedMessages = []
}: Props) => {
  const {
    data: client,
    loading,
    initialLoading,
    refetch
  } = useGetNode(GetClientJobsDocument)({
    clientId,
    filter: companyJobFilters
  })

  useMessageListener(listenedMessages, refetch)
  const jobs = client?.jobs?.nodes || []
  const engagementIds = getEngagementIdsFromJobs(jobs)

  useMessageListener(
    JOB_UPDATED,
    ({ jobId }) => jobs.find(({ id }) => id === jobId) && refetch()
  )
  useMessageListener(
    ENGAGEMENT_UPDATED,
    ({ engagementId }) =>
      engagementIds.find(id => id === engagementId) && refetch()
  )

  if (jobs?.length === 0 && !loading) {
    return null
  }

  return (
    <Section data-testid='Jobs' title='Jobs' variant={sectionVariant}>
      <ContainerLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <TableSkeleton
            cols={1}
            rows={3}
            dataTestId='company-jobs-loader'
            showHeader={false}
          />
        }
      >
        <JobsList jobs={jobs} />
      </ContainerLoader>
    </Section>
  )
}

export default CompanyJobs
