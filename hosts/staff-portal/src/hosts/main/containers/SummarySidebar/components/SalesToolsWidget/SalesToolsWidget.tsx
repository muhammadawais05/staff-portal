import React, { Suspense } from 'react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { useRefetchOnPathChange } from '@staff-portal/navigation'
import { lazy } from '@staff-portal/utils'

import SidebarWidget from '../SidebarWidget'
import WidgetSectionLoader from '../WidgetSectionLoader'
import CurrentJobsStatsSection from '../CurrentJobsStatsSection'
import { useGetNumberOfActiveJobs } from '../../data/get-number-of-active-jobs'

const loader = (
  <>
    <WidgetSectionLoader rows={2} />
    <WidgetSectionLoader rows={1} />
  </>
)

export interface Props {
  availableTools: {
    salesTool: boolean
    salesToolEscalations: boolean
  }
}

const SalesToolsWidget = ({ availableTools }: Props) => {
  const currentUser = useGetCurrentUser()
  const { data, loading, refetch } = useGetNumberOfActiveJobs(currentUser?.id)

  useRefetchOnPathChange([() => availableTools.salesTool && refetch()])

  if ((loading && !data) || !currentUser) {
    return loader
  }

  const NewLeadNotificationsSection = lazy(
    () => import('../NewLeadNotificationsSection')
  )

  return (
    <Suspense fallback={loader}>
      <SidebarWidget title='Sales Tools'>
        <NewLeadNotificationsSection
          escalationsEnabled={availableTools.salesToolEscalations}
        />

        <CurrentJobsStatsSection numberOfActiveJobs={data?.totalCount} />
      </SidebarWidget>
    </Suspense>
  )
}

export default SalesToolsWidget
