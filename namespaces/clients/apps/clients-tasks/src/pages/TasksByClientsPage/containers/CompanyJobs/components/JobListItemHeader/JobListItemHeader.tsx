import React from 'react'
import { Container } from '@toptal/picasso'
import { LinkWrapper, TypographyOverflowLink } from '@staff-portal/ui'

import JobActionsButton from '../JobActionsButton/JobActionsButton'
import { ClientJobFragment } from '../../data/get-client-jobs.staff.gql.types'

interface Props {
  job: ClientJobFragment
}

const JobsListItemHeader = ({ job }: Props) => (
  <Container flex justifyContent='space-between'>
    <TypographyOverflowLink variant='heading' size='medium'>
      <LinkWrapper
        data-testid='job-list-item-link'
        wrapWhen={Boolean(job?.webResource?.url)}
        href={job?.webResource?.url as string}
        title={job.title}
      >
        {job.title}
      </LinkWrapper>
    </TypographyOverflowLink>
    <JobActionsButton job={job} />
  </Container>
)

export default JobsListItemHeader
