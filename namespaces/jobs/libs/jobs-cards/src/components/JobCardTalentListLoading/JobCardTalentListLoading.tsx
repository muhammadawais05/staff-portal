import { Container, ContainerProps, SkeletonLoader } from '@toptal/picasso'
import React from 'react'

import * as S from './styles'

export type JobCardTalentListLoadingProps = Omit<ContainerProps, 'children'>

const JobCardTalentListLoading = () => {
  return (
    <Container padded='medium' css={S.container}>
      <Container flex justifyContent='space-between'>
        <Container flex alignItems='center'>
          <Container right='small'>
            <SkeletonLoader.Media variant='avatar' />
          </Container>
          <SkeletonLoader.Typography />
        </Container>
        <SkeletonLoader.Button />
      </Container>
      <Container>
        <SkeletonLoader.Typography />
        <SkeletonLoader.Typography />
      </Container>
    </Container>
  )
}

export default JobCardTalentListLoading
