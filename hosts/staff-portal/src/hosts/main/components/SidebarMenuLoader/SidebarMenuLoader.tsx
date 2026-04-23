import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'

import * as S from './styles'

interface Props {
  rows: number
}

const SidebarMenuLoader = ({ rows }: Props) => {
  return <Container css={S.item} flex>
    <SkeletonLoader.Typography rows={rows} />
    <SkeletonLoader.Media variant='icon' />
  </Container>
}

export default SidebarMenuLoader
