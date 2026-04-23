import React, { useMemo } from 'react'
import { useGetJobIdParam } from '@staff-portal/jobs'
import { Redirect } from '@staff-portal/navigation'
import { getJobPath, getDashboardPath } from '@staff-portal/routes'
import { PageLoader } from '@staff-portal/ui'
import { decodeEntityId } from '@staff-portal/data-layer-service'

import JobPageContent from './JobPageContent'
import { useGetJobWebResource } from './data/get-job-web-resources'

const JobPage = () => {
  const jobId = useGetJobIdParam()
  const decodedJobId = useMemo(() => decodeEntityId(jobId).id, [jobId])

  const { data, loading } = useGetJobWebResource(jobId)

  const webResourceUrl = data?.webResource?.url

  if (!loading && !webResourceUrl) {
    return <Redirect to={getDashboardPath()} />
  }

  if (
    !loading &&
    webResourceUrl &&
    webResourceUrl.includes(getJobPath(decodedJobId))
  ) {
    return <JobPageContent jobId={jobId} />
  }

  return <PageLoader />
}

export default JobPage
