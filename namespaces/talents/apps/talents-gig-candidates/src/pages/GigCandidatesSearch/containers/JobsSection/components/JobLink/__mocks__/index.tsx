import React from 'react'
import { Job } from '@staff-portal/graphql/staff'

interface Props {
  job: Pick<Job, 'webResource'>
}

const JobLink = ({ job }: Props) => {
  return (
    <div data-testid={`candidate-job-link-${job.webResource.url}`}>
      {job.webResource.text}
    </div>
  )
}

export default JobLink
