import { Container, Grid, SkeletonLoader } from '@toptal/picasso'
import React from 'react'

const OperationalIssuesSkeletonLoader = () => {
  return <>
    {[...new Array(3)].map((_, index) => (
      // Skeleton loader, no unique identifier
      // eslint-disable-next-line react/no-array-index-key
      <Container padded='small' key={index}>
        <SkeletonLoader.Typography rows={2} />
        <Container top='small'>
          <Grid justifyContent='space-between'>
            <Grid.Item small={5}>
              <SkeletonLoader.Typography />
            </Grid.Item>
            <Grid.Item small={3}>
              <SkeletonLoader.Button size='small' />
            </Grid.Item>
          </Grid>
        </Container>
      </Container>
    ))}

    <Container padded='small' flex justifyContent='center'>
      <SkeletonLoader.Button />
    </Container>
  </>
}

export default OperationalIssuesSkeletonLoader
