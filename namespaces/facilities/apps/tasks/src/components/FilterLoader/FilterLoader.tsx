import { Container, Grid, SkeletonLoader } from '@toptal/picasso'
import React from 'react'

const FilterLoader = () => {
  return (
    <Container bottom='medium'>
      <Grid>
        <Grid.Item small={9}>
          <SkeletonLoader.Typography />
        </Grid.Item>

        <Grid.Item small={2}>
          <SkeletonLoader.Typography />
        </Grid.Item>
        <Grid.Item small={1}>
          <SkeletonLoader.Typography />
        </Grid.Item>
      </Grid>

      <Grid>
        <Grid.Item small={3}>
          <SkeletonLoader.Typography />
        </Grid.Item>

        <Grid.Item small={2}>
          <SkeletonLoader.Typography />
        </Grid.Item>
        <Grid.Item small={3}>
          <SkeletonLoader.Typography />
        </Grid.Item>
        <Grid.Item small={4} />
      </Grid>
    </Container>
  )
}

export default FilterLoader
