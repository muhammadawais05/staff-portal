import { Container } from '@toptal/picasso'
import React from 'react'
import { Engagement } from '@staff-portal/graphql/staff'

import JobCardTalentItemContent from '../JobCardTalentItemContent/JobCardTalentItemContent'
import JobCardTalentItemHeader from '../JobCardTalentItemHeader/JobCardTalentItemHeader'
import JobCardTalentItemInterview from '../JobCardTalentItemInterview/JobCardTalentItemInterview'
import * as S from './styles'

export interface Props {
  engagement: Engagement
}

const JobCardTalentItem = ({ engagement }: Props) => {
  return (
    <Container padded='medium' css={S.container}>
      <JobCardTalentItemHeader engagement={engagement} />
      <JobCardTalentItemInterview engagement={engagement} />
      <JobCardTalentItemContent engagement={engagement} />
    </Container>
  )
}

export default JobCardTalentItem
