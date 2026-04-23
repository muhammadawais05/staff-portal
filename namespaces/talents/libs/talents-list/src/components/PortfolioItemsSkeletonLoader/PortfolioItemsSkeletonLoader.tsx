import React from 'react'
import { Grid, Container, SkeletonLoader } from '@toptal/picasso'

import * as S from './styles'

const PortfolioItemsSkeletonLoader = () => (
  <Grid wrap='wrap' css={S.skeletonLoaderContainer}>
    {[...Array(3)].map((_, index) => (
      // TODO: replaced by a reusable Component
      // Skeleton loader, no unique id
      // eslint-disable-next-line react/no-array-index-key
      <Grid.Item small={3} key={index} css={S.skeletonLoaderItem}>
        <Container flex justifyContent='center'>
          <SkeletonLoader.Media size='large' />
        </Container>
        <SkeletonLoader.Typography rows={2} />
      </Grid.Item>
    ))}
  </Grid>
)

export default PortfolioItemsSkeletonLoader
