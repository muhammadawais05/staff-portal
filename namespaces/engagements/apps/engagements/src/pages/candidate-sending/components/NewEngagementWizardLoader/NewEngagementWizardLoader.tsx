import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'

import * as S from './styles'

const NewEngagementWizardLoader = () => (
  <>
    <Container bottom='medium'>
      <SkeletonLoader.Typography />
    </Container>

    <Container flex alignItems='center'>
      {[...Array(5)].map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          <SkeletonLoader.Media css={S.stepIconSkeleton} />
          <SkeletonLoader.Typography css={S.stepNameSkeleton} />
        </React.Fragment>
      ))}
    </Container>
  </>
)

export default NewEngagementWizardLoader
