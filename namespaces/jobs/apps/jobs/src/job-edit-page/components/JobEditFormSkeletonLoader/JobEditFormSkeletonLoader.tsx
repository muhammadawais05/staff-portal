import React from 'react'
import { Container, Grid, SkeletonLoader } from '@toptal/picasso'
import { GridItemField } from '@staff-portal/ui'

const JobEditFormSkeletonLoader = () => {
  return (
    <Container data-testid='job-edit-form-skeleton-loader'>
      {Array.from(Array(25).keys()).map((_, itemIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <GridItemField key={itemIndex} label={<SkeletonLoader.Typography />}>
          <SkeletonLoader.Typography />
        </GridItemField>
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

export default JobEditFormSkeletonLoader
