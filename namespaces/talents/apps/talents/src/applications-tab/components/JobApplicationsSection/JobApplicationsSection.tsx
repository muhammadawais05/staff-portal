import { Typography } from '@toptal/picasso'
import React from 'react'

import JobApplicationSkeletonLoader from '../JobApplicationSkeletonLoader'
import JobApplicationsTable from '../JobApplicationsTable'
import { useGetPendingJobApplications } from './data'

type Props = {
  talentId: string
}

const getRoleName = (roleName: string | null | undefined) => {
  if (!roleName) {
    return ''
  }

  return roleName
    .split(/(?=[A-Z])/)
    .join(' ')
    .toLowerCase();
}

const hasMore = (pendingApplicationsCount = 0, totalApplicationsCount = 0) =>
  totalApplicationsCount > pendingApplicationsCount

const JobApplicationsSection = ({ talentId }: Props) => {
  const { data, networkLoading } = useGetPendingJobApplications(talentId)

  if (networkLoading) {
    return <JobApplicationSkeletonLoader />
  }

  if (!data) {
    return null
  }

  const { talentType, jobApplications, allJobApplications } = data

  return (
    <>
      {!allJobApplications?.totalCount ? (
        <Typography size='medium'>
          This {getRoleName(talentType)} has never applied to jobs.
        </Typography>
      ) : (
        <JobApplicationsTable
          talentId={talentId}
          hasMore={hasMore(
            jobApplications?.nodes?.length,
            allJobApplications?.totalCount
          )}
          talentType={getRoleName(talentType)}
          pendingJobApplications={jobApplications?.nodes}
        />
      )}
    </>
  )
}

export default JobApplicationsSection
