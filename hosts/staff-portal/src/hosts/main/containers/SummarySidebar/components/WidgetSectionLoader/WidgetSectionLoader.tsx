import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'

interface Props {
  rows: number
  hasButton?: boolean
}

const WidgetSectionLoader = ({ rows, hasButton }: Props) => {
  return <Container padded='small'>
    <SkeletonLoader.Header />
    <SkeletonLoader.Typography rows={rows} />
    {hasButton && <SkeletonLoader.Button />}
  </Container>
}

export default WidgetSectionLoader
