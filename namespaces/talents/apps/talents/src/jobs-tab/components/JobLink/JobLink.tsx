import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { Job } from '@staff-portal/graphql/staff'
import { LinkWrapper } from '@staff-portal/ui'

interface Props {
  job: Pick<Job, 'webResource'>
}

const JobLink = ({ job }: Props) => {
  const jobLink = job.webResource?.url

  return (
    <LinkWrapper wrapWhen={Boolean(jobLink)} href={jobLink as string}>
      <TypographyOverflow size='medium' weight='semibold' color='inherit'>
        {job.webResource?.text || ''}
      </TypographyOverflow>
    </LinkWrapper>
  )
}

export default JobLink
