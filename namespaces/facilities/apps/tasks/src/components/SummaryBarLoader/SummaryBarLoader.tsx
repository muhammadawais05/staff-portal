import { Container, SkeletonLoader } from '@toptal/picasso'
import React from 'react'

import * as S from './styles'

const SummaryBarLoader = () => {
  return (
    <Container flex css={S.overviewBlocks} bottom='medium' padded='xsmall'>
      <Container padded='small'>
        <SkeletonLoader.Typography />
        <Container css={S.paragraphSmall}>
          <SkeletonLoader.Typography />
        </Container>
      </Container>
      <Container padded='small'>
        <SkeletonLoader.Typography />
        <Container css={S.paragraphSmall}>
          <SkeletonLoader.Typography />
        </Container>
      </Container>
      <Container padded='small'>
        <SkeletonLoader.Typography />
        <Container css={S.paragraphSmall}>
          <SkeletonLoader.Typography />
        </Container>
      </Container>
      <Container padded='small'>
        <SkeletonLoader.Typography />
        <Container css={S.paragraphSmall}>
          <SkeletonLoader.Typography />
        </Container>
      </Container>
      <Container padded='small'>
        <SkeletonLoader.Typography />
        <Container css={S.paragraphSmall}>
          <SkeletonLoader.Typography />
        </Container>
      </Container>
    </Container>
  )
}

export default SummaryBarLoader
