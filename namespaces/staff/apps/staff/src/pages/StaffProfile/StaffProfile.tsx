import React from 'react'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { Redirect } from '@staff-portal/navigation'
import { getDashboardPath } from '@staff-portal/routes'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { TabsList } from '@staff-portal/ui'
import { DEBOUNCE_LIMIT } from '@staff-portal/config'
import { PersistentFormProvider } from '@staff-portal/forms'
import { NodeStatusMessageNotifications } from '@staff-portal/status-messages'
import { ROLE_FLAGS_UPDATED } from '@staff-portal/role-flags'

import { useGetStaffProfile } from '../../data'
import { useGetStaffProfileIdParam, useGetStaffTabs } from '../../hooks'
import { StaffProfileActions } from '../components'
import {
  getStaffProfileBrowserTitle,
  userCanViewStaffProfile
} from '../../utils'
import { STAFF_UPDATED } from '../../messages'

const StaffProfile = () => {
  const { staffId } = useGetStaffProfileIdParam()
  const { staffProfile, loading, refetch } = useGetStaffProfile(staffId)

  useMessageListener(
    STAFF_UPDATED,
    ({ staffId: staffProfileId }) => staffId === staffProfileId && refetch()
  )
  useMessageListener(ROLE_FLAGS_UPDATED, refetch)

  const tabsConfig = useGetStaffTabs(staffId)

  if (!loading && !userCanViewStaffProfile(staffProfile)) {
    return <Redirect to={getDashboardPath()} />
  }

  return (
    <PersistentFormProvider debounceLimit={DEBOUNCE_LIMIT}>
      <ContentWrapper
        additionalStatusMessages={
          <NodeStatusMessageNotifications id={staffId} />
        }
        title={staffProfile?.fullName}
        browserTitle={getStaffProfileBrowserTitle(staffProfile?.fullName)}
        titleLoading={loading}
        actions={
          <StaffProfileActions staffProfile={staffProfile} loading={loading} />
        }
        tabs={
          tabsConfig && (
            <TabsList
              tabs={tabsConfig.tabs}
              activeTabNumber={tabsConfig.activeTabNumber}
              handleTabChange={tabsConfig.handleTabChange}
            />
          )
        }
      >
        {tabsConfig?.selectedTabContent ?? null}
      </ContentWrapper>
    </PersistentFormProvider>
  )
}

export default StaffProfile
