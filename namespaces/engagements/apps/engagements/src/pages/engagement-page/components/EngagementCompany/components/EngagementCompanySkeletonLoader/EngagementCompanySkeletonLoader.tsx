import React from 'react'
import { Section, Grid, SkeletonLoader } from '@toptal/picasso'

const EngagementCompanySkeletonLoader = () => (
  <Section variant='withHeaderBar' title='Company'>
    <div data-testid='skeleton-loader'>
      <Grid spacing={8}>
        <Grid.Item small={12}>
          <SkeletonLoader.Header />
          <SkeletonLoader.Typography rows={4} />
        </Grid.Item>
      </Grid>
    </div>
  </Section>
)

export default EngagementCompanySkeletonLoader
