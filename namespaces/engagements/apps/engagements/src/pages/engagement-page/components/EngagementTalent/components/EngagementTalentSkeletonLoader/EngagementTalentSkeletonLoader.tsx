import React from 'react'
import { Section, Grid, SkeletonLoader } from '@toptal/picasso'

const EngagementTalentSkeletonLoader = () => {
  return (
    <Section variant='withHeaderBar' title={<SkeletonLoader.Header />}>
      <div data-testid='skeleton-loader'>
        <Grid spacing={8}>
          <Grid.Item small={12}>
            <SkeletonLoader.Header />
            <SkeletonLoader.Typography rows={15} />
          </Grid.Item>
        </Grid>
      </div>
    </Section>
  )
}

export default EngagementTalentSkeletonLoader
