import React from 'react'
import { JobStatus } from '@staff-portal/graphql/staff'
import { NavigationTabsList } from '@staff-portal/ui'
import { JobTabValue } from '@staff-portal/jobs'

import { useGetJobPageTabsPermissions } from '../../pages/JobPage/data/get-job-page-tabs-permissions'

type Props = {
  jobId: string
  tabValues: typeof JobTabValue
}

const JobTabsList = ({ jobId, tabValues }: Props) => {
  const {
    tabsPermissions,
    userPermissions: { canViewBillingCycle } = {},
    loading: permissionsLoading
  } = useGetJobPageTabsPermissions(jobId)
  const { status, sourcingRequest } = tabsPermissions || {}

  return (
    <NavigationTabsList loading={permissionsLoading}>
      <NavigationTabsList.Tab
        label='Summary'
        value={tabValues.SUMMARY}
        hidden={status !== JobStatus.PENDING_CLAIM}
      />

      <NavigationTabsList.Tab
        label='Job details'
        value={tabValues.JOB_DETAILS}
      />

      <NavigationTabsList.Tab
        label='Sourcing Request'
        value={tabValues.SOURCING_REQUEST}
        hidden={!sourcingRequest}
      />

      <NavigationTabsList.Tab
        label='Billing & Invoice Settings'
        value={tabValues.BILLING}
        hidden={!canViewBillingCycle}
      />
    </NavigationTabsList>
  )
}

export default JobTabsList
