import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'

import * as S from './styles'

export const JobApplicantTalentCardSkeletonLoader = () => (
  <Container data-testid='job-applicant-talent-card-loader'>
    <Container flex bottom='medium' alignItems='center'>
      <SkeletonLoader.Media variant='avatar' size='small' />
      <Container left='small' css={S.talentName}>
        <SkeletonLoader.Header />
      </Container>
    </Container>
    <Container bottom='medium'>
      <Container flex>
        {[...Array(6)].map((__, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Container right='xsmall' key={index}>
            <SkeletonLoader.Typography />
          </Container>
        ))}
      </Container>
      <Container flex>
        {[...Array(4)].map((__, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Container right='xsmall' key={index}>
            <SkeletonLoader.Typography />
          </Container>
        ))}
      </Container>
    </Container>
    <Container bottom='medium'>
      <SkeletonLoader.Header />
      <SkeletonLoader.Typography rows={3} />
    </Container>
    <Container bottom='medium'>
      <SkeletonLoader.Header />
      <SkeletonLoader.Typography rows={3} />
    </Container>
    <Container>
      <Container flex alignItems='center' justifyContent='flex-start'>
        <Container right='large'>
          <SkeletonLoader.Media variant='avatar' size='large' />
        </Container>
        <Container right='large'>
          <SkeletonLoader.Media variant='avatar' size='large' />
        </Container>
        <Container>
          <SkeletonLoader.Media variant='avatar' size='large' />
        </Container>
      </Container>
    </Container>
  </Container>
)

export default JobApplicantTalentCardSkeletonLoader
