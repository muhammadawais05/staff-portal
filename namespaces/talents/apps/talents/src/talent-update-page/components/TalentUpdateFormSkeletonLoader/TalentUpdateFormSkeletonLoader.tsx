import React from 'react'
import { Container, Grid, SkeletonLoader } from '@toptal/picasso'
import { GridItemField } from '@staff-portal/ui'

const TalentUpdateFormSkeletonLoader = () => {
  return (
    <Container data-testid='talent-update-form-skeleton-loader'>
      <GridItemField alignItems='center' label={<SkeletonLoader.Typography />}>
        <SkeletonLoader.Media variant='avatar' size='medium' />
      </GridItemField>

      {Array.from(Array(22).keys()).map((_, itemIndex) => (
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

export default TalentUpdateFormSkeletonLoader
