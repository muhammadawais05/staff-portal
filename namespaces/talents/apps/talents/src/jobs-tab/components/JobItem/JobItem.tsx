import { TalentProfileJobsEngagementFragment } from '@staff-portal/engagements'
import { Container } from '@toptal/picasso'
import React from 'react'

import JobItemContent from '../JobItemContent'
import JobItemTitle from '../JobItemTitle'
import * as S from './styles'

interface Props {
  engagement: TalentProfileJobsEngagementFragment
}

const JobItem = ({ engagement }: Props) => {
  return (
    <Container css={S.container}>
      <JobItemTitle engagement={engagement} />
      <JobItemContent engagement={engagement} />
    </Container>
  )
}

export default JobItem
