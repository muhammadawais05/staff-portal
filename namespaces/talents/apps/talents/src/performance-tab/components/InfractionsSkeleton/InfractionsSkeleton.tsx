import React from 'react'
import { Container, Grid, SkeletonLoader } from '@toptal/picasso'

const InfractionsSkeleton = () => {
  return <Container top='small' data-testid='skeleton-loader'>
    <Container bottom='xsmall'>
      <SkeletonLoader.Header />
    </Container>

    <Grid spacing={8}>
      <Grid.Item small={6}>
        <SkeletonLoader.Typography />
      </Grid.Item>
      <Grid.Item small={6}>
        <SkeletonLoader.Typography />
      </Grid.Item>
      <Grid.Item small={6}>
        <SkeletonLoader.Typography />
      </Grid.Item>
      <Grid.Item small={6}>
        <SkeletonLoader.Typography />
      </Grid.Item>
      <Grid.Item small={6}>
        <SkeletonLoader.Typography />
      </Grid.Item>
      <Grid.Item small={6}>
        <SkeletonLoader.Typography />
      </Grid.Item>
      <Grid.Item small={6}>
        <SkeletonLoader.Typography />
      </Grid.Item>
      <Grid.Item small={6}>
        <SkeletonLoader.Typography />
      </Grid.Item>
      <Grid.Item small={6}>
        <SkeletonLoader.Typography />
      </Grid.Item>
    </Grid>
  </Container>
}

export default InfractionsSkeleton
