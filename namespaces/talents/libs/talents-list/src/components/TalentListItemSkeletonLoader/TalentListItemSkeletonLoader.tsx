import React from 'react'
import { Section, Container, Grid, SkeletonLoader } from '@toptal/picasso'
import { ItemFieldSkeletonLoader } from '@staff-portal/talents'

const TalentListItemSkeletonLoader = () => (
  <Section
    variant='withHeaderBar'
    title={<SkeletonLoader.Header />}
    actions={
      <>
        {[...Array(2)].map((__, btnIndex) => (
          // TODO: replaced by a reusable Component
          // Skeleton loader, no unique id
          // eslint-disable-next-line react/no-array-index-key
          <Container left='small' key={btnIndex}>
            <SkeletonLoader.Button size='small' />
          </Container>
        ))}
      </>
    }
  >
    <Container flex justifyContent='space-between'>
      <Container flex alignItems='center' bottom='small'>
        <SkeletonLoader.Media variant='avatar' size='small' />
        <Container left='small'>
          <SkeletonLoader.Typography />
        </Container>
      </Container>
    </Container>

    {[...Array(8)].map((__, itemIndex) => (
      // TODO: replaced by a reusable Component
      // Skeleton loader, no unique id
      // eslint-disable-next-line react/no-array-index-key
      <Grid key={itemIndex}>
        <Grid.Item small={6}>
          <ItemFieldSkeletonLoader
            layout='half-row'
            labelWidth={100}
            valueWidth={100}
          />
        </Grid.Item>
        <Grid.Item small={6}>
          <ItemFieldSkeletonLoader
            layout='half-row'
            labelWidth={100}
            valueWidth={100}
          />
        </Grid.Item>
      </Grid>
    ))}

    <Container top='small'>
      <ItemFieldSkeletonLoader labelWidth={80} valueWidth={50} />
      <ItemFieldSkeletonLoader labelWidth={80} valueWidth={75} />
      <ItemFieldSkeletonLoader labelWidth={80} valueWidth={100} />
    </Container>
  </Section>
)

export default TalentListItemSkeletonLoader
