import { SkeletonLoader } from '@toptal/picasso'
import React from 'react'
import { DetailedListSkeleton } from '@staff-portal/ui'

import { LABEL_COLUMN_WIDTH } from '../../../../constants'
import HiredTalentRowContentLayout from '../../../HiredTalentRowContentLayout'

const TalentDetailsSkeletonLoader = () => {
  return (
    <HiredTalentRowContentLayout
      avatar={<SkeletonLoader.Media variant='avatar' size='small' />}
      talentLink={<SkeletonLoader.Header />}
      publicProfile={<SkeletonLoader.Button size='small' />}
      list={
        <DetailedListSkeleton
          labelColumnWidth={LABEL_COLUMN_WIDTH}
          columns={1}
          items={10}
          data-testid='TalentDetailsSkeletonLoader-DetailedList'
        />
      }
      data-testid='TalentDetailsSkeletonLoader'
    />
  )
}

export default TalentDetailsSkeletonLoader
