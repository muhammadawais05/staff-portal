import React from 'react'
import { Section, Typography, Container } from '@toptal/picasso'
import { DetailedListSkeleton } from '@staff-portal/ui'

import { COMPANY_INFORMATION_TITLE, CONTACTS_TITLE } from '../../config'
import JobDetailsInformationSkeletonLoader from '../JobDetailsInformation/JobDetailsInformationSkeletonLoader'
import { LABEL_COLUMN_WIDTH } from '../../../../config'

const JobDetailsSectionSkeletonLoader = () => {
  return (
    <Container top='medium' data-testid='job-details-loader'>
      <Section title='Job Details' variant='bordered'>
        <Container bottom='small'>
          <Typography variant='heading' size='small'>
            {COMPANY_INFORMATION_TITLE}
          </Typography>
        </Container>
        <DetailedListSkeleton
          columns={2}
          labelColumnWidth={LABEL_COLUMN_WIDTH}
          items={7}
        />

        <Container bottom='small' top='medium'>
          <Typography variant='heading' size='small'>
            {CONTACTS_TITLE}
          </Typography>
        </Container>
        <DetailedListSkeleton
          columns={2}
          labelColumnWidth={LABEL_COLUMN_WIDTH}
          items={4}
        />
        <JobDetailsInformationSkeletonLoader />
      </Section>
    </Container>
  )
}

export default JobDetailsSectionSkeletonLoader
