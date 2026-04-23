import React from 'react'
import { Container, Grid, SkeletonLoader } from '@toptal/picasso'

export const RepresentativeEditFormSkeletonLoader = () => {
  return (
    <Container>
      {Array.from(Array(25).keys()).map((_, itemIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <Grid key={itemIndex} spacing={16}>
          <Grid.Item small={4}>
            <SkeletonLoader.Typography />
          </Grid.Item>
          <Grid.Item small={8}>
            <SkeletonLoader.Typography />
          </Grid.Item>
        </Grid>
      ))}
      <Container top='small'>
        <Grid alignItems='baseline' spacing={16}>
          <Grid.Item small={4} />
          <Grid.Item small={8}>
            <Container gap='xsmall'>
              <Container right='medium' inline>
                <SkeletonLoader.Button />
              </Container>
              <SkeletonLoader.Button />
            </Container>
          </Grid.Item>
        </Grid>
      </Container>
    </Container>
  )
}
