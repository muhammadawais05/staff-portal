import React, { useState } from 'react'
import { Container, Section } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import {
  AvailabilityRequestStatus,
  JobStatus
} from '@staff-portal/graphql/staff'
import { TableSkeleton } from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import {
  JOB_UPDATED,
  JOB_AVAILABILITY_REQUEST_UPDATED
} from '@staff-portal/jobs'
import { Pagination, getPaginationOffset } from '@staff-portal/filters'

import { useGetAvailabilityRequests } from '../../data/get-availability-requests'
import AvailabilityRequestsTable from '../AvailabilityRequestsTable'
import AvailabilityRequestsFilter from './components/AvailabilityRequestsFilter'

export interface Props {
  jobId: string
}

const LIMIT = 30

const AvailabilityRequestsSection = ({ jobId }: Props) => {
  const [filters, setFilters] = useState<{
    status?: AvailabilityRequestStatus
    page: number
  }>({ page: 1 })

  const {
    data: job,
    loading,
    refetch
  } = useGetAvailabilityRequests({
    jobId,
    status: filters.status,
    limit: LIMIT,
    offset: getPaginationOffset(filters.page, LIMIT)
  })

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(JOB_AVAILABILITY_REQUEST_UPDATED, () => refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  const canDisplaySection =
    !!job?.totalAvailabilityRequests?.totalCount &&
    job?.status === JobStatus.PENDING_ENGINEER

  if (!loading && !canDisplaySection) {
    return null
  }

  const totalCount = job?.availabilityRequests?.totalCount ?? 0

  return (
    <Container top='medium'>
      <Section
        data-testid='JobAvailabilityRequest-section'
        variant='withHeaderBar'
        title='Availability Requests'
      >
        <AvailabilityRequestsFilter
          values={filters.status}
          onChange={status => setFilters(() => ({ page: 1, status }))}
        />
        {loading && !job ? (
          <TableSkeleton
            cols={7}
            rows={5}
            data-testid='JobAvailabilityRequest-section-loader'
          />
        ) : (
          <AvailabilityRequestsTable
            availabilityRequests={job?.availabilityRequests?.nodes}
            totalCount={job?.totalAvailabilityRequests?.totalCount || 0}
            jobType={job?.jobType}
            jobId={jobId}
          />
        )}

        {totalCount > LIMIT && (
          <Container top='medium' flex>
            <Pagination
              activePage={filters.page}
              onPageChange={page =>
                setFilters(filtersState => ({ ...filtersState, page }))
              }
              limit={LIMIT}
              itemCount={totalCount}
            />
          </Container>
        )}
      </Section>
    </Container>
  )
}

export default AvailabilityRequestsSection
