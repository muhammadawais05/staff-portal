import React from 'react'
import { Section, SkeletonLoader } from '@toptal/picasso'
import { DetailedListSkeleton, SubSection } from '@staff-portal/ui'

import { SECTION_TITLE } from '../../utils/constants'

const ContractSectionSkeleton = () => (
  <Section
    title={SECTION_TITLE}
    actions={<SkeletonLoader.Button size='small' />}
    variant='withHeaderBar'
  >
    <SubSection
      title={<SkeletonLoader.Header />}
      actions={<SkeletonLoader.Button size='small' />}
    >
      <DetailedListSkeleton labelColumnWidth={11} columns={2} items={8} />
    </SubSection>
  </Section>
)

export default ContractSectionSkeleton
