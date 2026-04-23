import React from 'react'
import { Container, Grid, SkeletonLoader } from '@toptal/picasso'

interface Props {
  count?: number
}

const CommunityLeaderProfileSkeletonLoader = ({ count = 20 }: Props) => {
  return (
    <Container top='medium' data-testid='communityLeaderProfileLoader'>
      {[...Array(count)].map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Grid key={index}>
          <Grid.Item small={12}>
            <SkeletonLoader.Typography />
          </Grid.Item>
        </Grid>
      ))}
    </Container>
  )
}

export default CommunityLeaderProfileSkeletonLoader
