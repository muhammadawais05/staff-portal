import { Container, Grid, SkeletonLoader } from '@toptal/picasso'
import React from 'react'

const SkeletonSubHeader = () => (
  <Container top='small' bottom='small'>
    <SkeletonLoader.Header />
  </Container>
)

const SkeletonRow = () => (
  <Grid>
    <Grid.Item small={9}>
      <SkeletonLoader.Typography />
    </Grid.Item>
    <Grid.Item small={3}>
      <SkeletonLoader.Typography />
    </Grid.Item>
  </Grid>
)

const SkeletonTable = () => (
  <>
    {[...Array(2)].map((_, index) => (
      // TODO: replaced by a reusable Component
      // Skeleton loader, no unique id
      // eslint-disable-next-line react/no-array-index-key
      <Grid key={index}>
        <Grid.Item small={6}>
          <SkeletonRow />
        </Grid.Item>
        <Grid.Item small={6}>
          <SkeletonRow />
        </Grid.Item>
      </Grid>
    ))}
  </>
)

const MatchQualitySkeletonLoader = () => (
  <>
    <SkeletonSubHeader />
    <SkeletonTable />
    <SkeletonSubHeader />
    <SkeletonTable />
  </>
)

export default MatchQualitySkeletonLoader
