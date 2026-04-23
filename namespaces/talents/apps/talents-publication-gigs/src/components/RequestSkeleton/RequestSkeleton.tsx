import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'
import { Props as ContainerProps } from '@toptal/picasso/Container'

import * as S from './styles'

type Props = Partial<ContainerProps>

const RequestSkeleton = (props: Props) => {
  return (
    <Container bottom='small' {...props}>
      <Container bottom='small'>
        <SkeletonLoader.Typography css={S.skeletonTitle} />
      </Container>
      <Container bottom='small'>
        <SkeletonLoader.Typography rows={3} />
        <SkeletonLoader.Header />
      </Container>
      <Container>
        <SkeletonLoader.Typography rows={4} />
      </Container>
    </Container>
  )
}

export default RequestSkeleton
