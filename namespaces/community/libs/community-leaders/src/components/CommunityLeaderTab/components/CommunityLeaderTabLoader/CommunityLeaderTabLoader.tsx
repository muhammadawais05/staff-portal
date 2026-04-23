import React from 'react'
import { Section, SkeletonLoader } from '@toptal/picasso'
import {
  ItemFieldSkeletonLoader,
  TalentHeaderSkeleton
} from '@staff-portal/talents'

const CommunityLeaderTabLoader = () => (
  <Section
    variant='withHeaderBar'
    title={<SkeletonLoader.Header />}
    actions={<SkeletonLoader.Button size='small' />}
    data-testid='community-leader-tab-loader'
  >
    <TalentHeaderSkeleton />
    {[...Array(10)].map((__, itemIndex) => (
      <ItemFieldSkeletonLoader
        // eslint-disable-next-line react/no-array-index-key
        key={itemIndex}
        layout='half-row'
        labelWidth={100}
        valueWidth={100}
      />
    ))}
  </Section>
)

export default CommunityLeaderTabLoader
