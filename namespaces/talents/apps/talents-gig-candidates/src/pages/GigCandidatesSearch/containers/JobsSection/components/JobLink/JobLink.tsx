import React from 'react'
import { Job } from '@staff-portal/graphql/staff'
import { LinkWrapper } from '@staff-portal/ui'
import { Typography } from '@toptal/picasso'

interface Props {
  job: Pick<Job, 'webResource'>
}

const JobLink = ({ job }: Props) => {
  const jobLink = job.webResource?.url

  return (
    <LinkWrapper wrapWhen={Boolean(jobLink)} href={jobLink as string}>
      <Typography size='medium' weight='semibold' color='inherit'>
        {job.webResource?.text || ''}
      </Typography>
    </LinkWrapper>
  )
}

export default JobLink
