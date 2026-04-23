import React, { useEffect, useMemo } from 'react'
import { useHistory } from '@staff-portal/navigation'
import { useHashTabs } from '@staff-portal/ui'
import { HashTabConfig, StaffTabUrlHash } from '@staff-portal/routes'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import { CommunityLeaderTab } from '@staff-portal/community-leaders'

import StaffProfileOverview from '../pages/StaffProfile/StaffProfileOverview'
type StaffTab = Omit<HashTabConfig, 'tabHash'> & { tabHash: StaffTabUrlHash }

export const useGetStaffTabs = (id: string) => {
  const history = useHistory()

  const staffTabs = useMemo<StaffTab[]>(() => {
    return [
      {
        label: 'Staff Profile',
        node: (
          <WidgetErrorBoundary>
            <StaffProfileOverview />
          </WidgetErrorBoundary>
        ),
        tabHash: StaffTabUrlHash.STAFF_PROFILE
      },
      {
        label: 'Community',
        node: (
          <WidgetErrorBoundary>
            <CommunityLeaderTab talentId={id} />
          </WidgetErrorBoundary>
        ),
        tabHash: StaffTabUrlHash.COMMUNITY_LEADER
      }
    ]
  }, [id])

  const {
    activeTabNumber,
    selectedTabContent,
    handleTabChange,
    hash: activeTabHash
  } = useHashTabs(staffTabs)

  useEffect(() => {
    if (
      !activeTabHash ||
      staffTabs.some(tab => `#${tab.tabHash}` === activeTabHash)
    ) {
      return
    }

    history.replace(history.location.pathname)
  }, [staffTabs, activeTabHash, history])

  return useMemo(() => {
    return {
      tabs: staffTabs,
      selectedTabContent,
      activeTabNumber,
      handleTabChange,
      activeTabHash
    }
  }, [
    staffTabs,
    selectedTabContent,
    activeTabNumber,
    handleTabChange,
    activeTabHash
  ])
}
