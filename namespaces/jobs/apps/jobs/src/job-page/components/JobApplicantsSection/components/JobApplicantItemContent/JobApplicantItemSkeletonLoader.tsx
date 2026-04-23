import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'
import { SkillSetSkeletonLoader } from '@staff-portal/talents'
import { MatchQualitySkeletonLoader } from '@staff-portal/talents-quality'

import * as S from './styles'

export const JobApplicantItemSkeletonLoader = () => (
  <Container padded='small' data-testid='job-applicant-loader'>
    <Container flex bottom='small' alignItems='center'>
      <SkeletonLoader.Media variant='avatar' size='small' />
      <Container left='small' css={S.talentName}>
        <SkeletonLoader.Header />
      </Container>
      <Container flex alignItems='center' left='small'>
        <SkeletonLoader.Button size='small' />
      </Container>
    </Container>
    <Container bottom='small'>
      <MatchQualitySkeletonLoader />
    </Container>
    <SkillSetSkeletonLoader />
  </Container>
)

export default JobApplicantItemSkeletonLoader
