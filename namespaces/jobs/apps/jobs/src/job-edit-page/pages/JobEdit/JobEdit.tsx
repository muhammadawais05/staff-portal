import React from 'react'
import { useGetJobIdParam } from '@staff-portal/jobs'

import { JobEditPageContent } from '../../components'

const JobEdit = () => {
  const jobId = useGetJobIdParam()

  return <JobEditPageContent jobId={jobId} />
}

export default JobEdit
