import { SkeletonLoader } from '@toptal/picasso'
import React from 'react'
import { DetailedListSkeleton, SubSection } from '@staff-portal/ui'

import { JOB_INFORMATION_TITLE } from '../../config'
import { LABEL_COLUMN_WIDTH } from '../../../../config'

const JobDetailsInformationSkeletonLoader = () => (
  <>
    <SubSection
      title={JOB_INFORMATION_TITLE}
      titleSize='small'
      data-testid='job-details-information-loader'
    >
      <DetailedListSkeleton
        columns={2}
        labelColumnWidth={LABEL_COLUMN_WIDTH}
        items={20}
      />
    </SubSection>

    <SubSection
      title='Job description'
      titleSize='small'
      data-testid='job-details-description-loader'
      last
    >
      <SkeletonLoader.Typography rows={4} />
    </SubSection>
  </>
)

export default JobDetailsInformationSkeletonLoader
