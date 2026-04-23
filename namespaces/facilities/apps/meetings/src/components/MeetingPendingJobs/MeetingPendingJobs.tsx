import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { JobStatus } from '@staff-portal/jobs'
import { MeetingPendingJobsFragment } from '@staff-portal/meetings'

export type Props = MeetingPendingJobsFragment

const MeetingPendingJobs = ({ pendingJobs }: Props) => {
  if (!pendingJobs?.nodes.length) {
    return null
  }

  return (
    <Container top='small'>
      {pendingJobs.nodes.map(({ id, webResource: { url, text }, ...job }) => (
        <Typography key={id} as='div' size='medium'>
          <Container
            flex
            alignItems='center'
            top='xsmall'
            data-testid='meeting-job'
          >
            <LinkWrapper wrapWhen={Boolean(url)} href={url as string}>
              {text}
            </LinkWrapper>
            <Container left='xsmall' right='xsmall'>
              —
            </Container>
            <JobStatus job={job} />
          </Container>
        </Typography>
      ))}
    </Container>
  )
}

export default MeetingPendingJobs
