import React, { memo, FC, ReactElement } from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'

interface Props {
  title: ReactElement
}

const InlineFormSkeleton: FC<Props> = memo<Props>(({ title }) => (
  <Container flex justifyContent='space-between'>
    {title}
    <SkeletonLoader.Button size='small' />
  </Container>
))

export default InlineFormSkeleton
