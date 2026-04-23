import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'
import { ItemFieldSkeletonLoader } from '@staff-portal/talents'

import * as S from './styles'

const ItemSkeletonLoader = () => (
  <Container css={S.container}>
    <Container flex alignItems='center' bottom='small'>
      <Container>
        <SkeletonLoader.Header />
      </Container>
    </Container>
    <Container>
      <ItemFieldSkeletonLoader labelWidth={80} valueWidth={100} />
    </Container>
  </Container>
)

export default ItemSkeletonLoader
