import React from 'react'
import { Container } from '@toptal/picasso'

import JobListItemHeader from '../JobListItemHeader/JobListItemHeader'
import JobListItemTable from '../JobListItemTable/JobListItemTable'
import { ClientJobFragment } from '../../data/get-client-jobs.staff.gql.types'

interface Props {
  job: ClientJobFragment
  index: number
}

const JobListItem = ({ job, index }: Props) => (
  <Container top={index === 0 ? 0 : 'medium'}>
    <JobListItemHeader job={job} />
    <Container top='small'>
      <JobListItemTable job={job} />
    </Container>
  </Container>
)

export default JobListItem
