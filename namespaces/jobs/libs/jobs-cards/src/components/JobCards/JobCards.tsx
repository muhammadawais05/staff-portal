import React from 'react'
import { Container } from '@toptal/picasso'
import { Job } from '@staff-portal/graphql/staff'

import JobCardsMenu from '../JobCardsMenu/JobCardsMenu'
import JobCardTalentList from '../JobCardTalentList/JobCardTalentList'
import * as S from './styles'

export interface Props {
  job: Job
}

const JobCards = ({ job }: Props) => (
  <Container flex css={S.taskCardsContainer}>
    <Container>
      <JobCardsMenu />
    </Container>
    <Container css={S.taskCardContent}>
      <JobCardTalentList jobId={job.id} jobStatus={job?.status} />
    </Container>
  </Container>
)

export default JobCards
