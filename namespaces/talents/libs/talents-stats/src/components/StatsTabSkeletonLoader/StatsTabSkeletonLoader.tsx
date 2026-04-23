import React from 'react'
import { Grid } from '@toptal/picasso'
import { ItemFieldSkeletonLoader } from '@staff-portal/talents'

const StatsTabSkeletonLoader = () => (
  <>
    {[...Array(3)].map((_, index) => (
      // TODO: replaced by a reusable Component
      // Skeleton loader, no unique id
      // eslint-disable-next-line react/no-array-index-key
      <Grid key={index}>
        <Grid.Item small={6}>
          <ItemFieldSkeletonLoader labelWidth={50} valueWidth={55} />
        </Grid.Item>
        <Grid.Item small={6}>
          <ItemFieldSkeletonLoader labelWidth={50} valueWidth={55} />
        </Grid.Item>
      </Grid>
    ))}
  </>
)

export default StatsTabSkeletonLoader
