import { Container, SkeletonLoader } from '@toptal/picasso'
import React from 'react'

import CandidateSendingNextLoader from '../CandidateSendingNextLoader/CandidateSendingNextLoader'

const TalentSentForReviewLoader = () => (
  <>
    <CandidateSendingNextLoader rows={1} />

    <Container bordered rounded padded='small' top='xsmall' bottom='xsmall'>
      <SkeletonLoader.Typography rows={5} />
    </Container>

    <Container align='center'>
      <SkeletonLoader.Button />
    </Container>
  </>
)

export default TalentSentForReviewLoader
