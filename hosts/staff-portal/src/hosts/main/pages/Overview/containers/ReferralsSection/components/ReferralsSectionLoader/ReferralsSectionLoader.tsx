import { Container, Grid, SkeletonLoader } from '@toptal/picasso'
import React from 'react'

const ReferralsSectionLoader = () => {
  return <Container bordered rounded padded='medium' top='large'>
    <Container
      flex
      justifyContent='space-between'
      alignItems='center'
      bottom='small'
    >
      <SkeletonLoader.Header />
      <SkeletonLoader.Button />
    </Container>

    <Grid>
      <Grid.Item small={3}>
        <SkeletonLoader.Typography rows={3} />
      </Grid.Item>
      <Grid.Item small={3}>
        <SkeletonLoader.Typography rows={3} />
      </Grid.Item>
      <Grid.Item small={3}>
        <SkeletonLoader.Typography rows={3} />
      </Grid.Item>
      <Grid.Item small={3}>
        <SkeletonLoader.Typography rows={3} />
      </Grid.Item>
    </Grid>
  </Container>
}

export default ReferralsSectionLoader
