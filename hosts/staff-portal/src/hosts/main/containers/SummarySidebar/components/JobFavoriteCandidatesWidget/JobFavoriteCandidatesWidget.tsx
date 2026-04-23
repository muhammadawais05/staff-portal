import React from 'react'

import JobFavoriteCandidatesWidgetContent from '../JobFavoriteCandidatesWidgetContent'
import { useGetMatchedJobId } from './hooks/use-get-matched-job-id'

const JobFavoriteCandidatesWidget = () => {
  const jobId = useGetMatchedJobId()

  if (!jobId) {
    return null
  }

  return <JobFavoriteCandidatesWidgetContent jobId={jobId} />
}

export default JobFavoriteCandidatesWidget
