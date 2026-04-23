import { Container } from '@toptal/picasso'
import { NavigationTabPanel } from '@staff-portal/ui'
import React from 'react'
import { StaffBillingSettingsWidget } from '@staff-portal/billing-widgets'
import { JobTabValue } from '@staff-portal/jobs'

import JobSummaryTab from '../JobSummaryTab'
import JobDetailsTab from '../JobDetailsTab'
import SourcingRequestTab from '../SourcingRequestTab'

type Props = {
  jobId: string
  tabValues: typeof JobTabValue
}

const JobTabPanel = ({ jobId, tabValues }: Props) => (
  <Container top='medium'>
    <NavigationTabPanel value={tabValues.SUMMARY}>
      <JobSummaryTab jobId={jobId} />
    </NavigationTabPanel>

    <NavigationTabPanel value={tabValues.JOB_DETAILS}>
      <JobDetailsTab jobId={jobId} />
    </NavigationTabPanel>

    <NavigationTabPanel value={tabValues.SOURCING_REQUEST}>
      <SourcingRequestTab jobId={jobId} />
    </NavigationTabPanel>

    <NavigationTabPanel value={tabValues.BILLING}>
      <StaffBillingSettingsWidget jobId={jobId} />
    </NavigationTabPanel>
  </Container>
)

export default JobTabPanel
