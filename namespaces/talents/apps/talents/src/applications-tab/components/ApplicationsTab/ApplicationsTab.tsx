import React, { memo } from 'react'
import { Section, Container } from '@toptal/picasso'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'

import AvailabilityRequestsSection from '../AvailabilityRequestsSection'
import JobApplicationsSection from '../JobApplicationsSection'

export interface Props {
  talentId: string
}

const ApplicationsTab = ({ talentId }: Props) => {
  return (
    <>
      <WidgetErrorBoundary>
        <Section variant='withHeaderBar' title='Availability Requests'>
          <AvailabilityRequestsSection talentId={talentId} />
        </Section>
      </WidgetErrorBoundary>

      <WidgetErrorBoundary emptyOnError>
        <Container top='medium'>
          <Section variant='withHeaderBar' title='Job Applications'>
            <JobApplicationsSection talentId={talentId} />
          </Section>
        </Container>
      </WidgetErrorBoundary>
    </>
  )
}

export default memo(ApplicationsTab)
