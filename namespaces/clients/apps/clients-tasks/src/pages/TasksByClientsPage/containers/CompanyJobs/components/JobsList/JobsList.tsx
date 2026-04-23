import React from 'react'
import { Container } from '@toptal/picasso'

import { ClientJobFragment } from '../../data/get-client-jobs.staff.gql.types'
import JobListItem from '../JobListItem/JobListItem'

interface Props {
  jobs: ClientJobFragment[]
}

const JobsList = ({ jobs }: Props) => (
  <Container>
    {jobs.map((job, index) => (
      <JobListItem key={job.id} job={job} index={index} />
    ))}
  </Container>
)

export default JobsList
