import React, { memo } from 'react'
import { Section } from '@toptal/picasso'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'

import { JobDetailsInformation } from './components'
import ContactsSection from './components/ContactsSection'
import CompanyInformation from './components/CompanyInformation'

interface Props {
  jobId: string
}

const JobDetailsSection = ({ jobId }: Props) => (
  <Section
    title='Job Details'
    data-testid='job-details-section'
    variant='withHeaderBar'
  >
    <WidgetErrorBoundary emptyOnError>
      <CompanyInformation jobId={jobId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <ContactsSection jobId={jobId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <JobDetailsInformation jobId={jobId} />
    </WidgetErrorBoundary>
  </Section>
)

export default memo(JobDetailsSection)
