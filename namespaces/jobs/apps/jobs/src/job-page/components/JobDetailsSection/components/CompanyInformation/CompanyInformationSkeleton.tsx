import React from 'react'
import { SubSection, DetailedListSkeleton } from '@staff-portal/ui'

import { COMPANY_INFORMATION_TITLE } from '../../config'
import { LABEL_COLUMN_WIDTH } from '../../../../config'

const CompanyInformationSkeleton = () => (
  <SubSection title={COMPANY_INFORMATION_TITLE} titleSize='small'>
    <DetailedListSkeleton
      columns={2}
      labelColumnWidth={LABEL_COLUMN_WIDTH}
      items={7}
    />
  </SubSection>
)

export default CompanyInformationSkeleton
