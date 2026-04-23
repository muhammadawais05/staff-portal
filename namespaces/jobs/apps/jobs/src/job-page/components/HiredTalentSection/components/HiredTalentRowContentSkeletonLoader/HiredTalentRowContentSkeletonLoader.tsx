import { Container } from '@toptal/picasso'
import React from 'react'
import { EngagementFeedbacksSkeletonLoader } from '@staff-portal/engagements'

import { LABEL_COLUMN_WIDTH } from '../../constants'
import { JobContractsSkeletonLoader } from '../JobContracts/components'
import { JobCommissionsSkeletonLoader } from '../JobCommissions/components'
import { TalentDetailsSkeletonLoader } from '../HiredTalentRowContentTalentDetails/components'

const HiredTalentRowContentSkeletonLoader = () => {
  return (
    <Container variant='white'>
      <TalentDetailsSkeletonLoader />

      {[...Array(2)].map((_, index) => (
        <EngagementFeedbacksSkeletonLoader
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          labelColumnWidth={LABEL_COLUMN_WIDTH}
        />
      ))}

      <JobContractsSkeletonLoader />

      <JobCommissionsSkeletonLoader />
    </Container>
  )
}

export default HiredTalentRowContentSkeletonLoader
