import React from 'react'
import { Container, Section } from '@toptal/picasso'
import { DetailedListSkeleton } from '@staff-portal/ui'

import { COMPANY_LEVEL_TITLE } from '../../../JobDetailsSection/config'
import { LABEL_COLUMN_WIDTH } from '../../../../config'

const JobSummaryCompanyLevelSkeleton = () => {
  return (
    <Container top='medium'>
      <Section variant='withHeaderBar' title={COMPANY_LEVEL_TITLE}>
        <DetailedListSkeleton
          columns={1}
          labelColumnWidth={LABEL_COLUMN_WIDTH}
          items={3}
        />
      </Section>
    </Container>
  )
}

export default JobSummaryCompanyLevelSkeleton
