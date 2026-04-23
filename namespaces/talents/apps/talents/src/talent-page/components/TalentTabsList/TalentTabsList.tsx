import React from 'react'
import { NavigationTabsList } from '@staff-portal/ui'
import {
  TABS_COUNTERS_UPDATED,
  TabsCountersScope,
  TalentTabValue
} from '@staff-portal/talents'
import { Badge } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import { useGetTalentTabsPermissions } from '../../pages/Talent/data/get-talent-tabs-parmissions'
import { useGetTalentTabsCounters } from '../../pages/Talent/data/get-talent-tabs-counters'

type Props = {
  talentId: string
  tabValues: typeof TalentTabValue
}

const TalentTabsList = ({ talentId, tabValues }: Props) => {
  const {
    userPermissions,
    tabsPermissions,
    loading: permissionsLoading
  } = useGetTalentTabsPermissions(talentId)
  const { data: tabsCounters, refetch: refetchTabsCounters } =
    useGetTalentTabsCounters(talentId)

  useMessageListener(
    [TABS_COUNTERS_UPDATED],
    ({ scope }) =>
      scope === TabsCountersScope.TalentProfile && refetchTabsCounters()
  )

  return (
    <NavigationTabsList loading={permissionsLoading}>
      <NavigationTabsList.Tab
        label={`${
          tabsPermissions?.talentPartner ? 'Talent Partner ' : ''
        }Talent Profile`}
        value={tabValues.TALENT_PROFILE}
      />

      <NavigationTabsList.Tab label='Workload' value={tabValues.WORKLOAD} />

      <NavigationTabsList.Tab label='Stats' value={tabValues.STATS} />

      <NavigationTabsList.Tab
        label='Sourcing'
        value={tabValues.SOURCING_REQUESTS}
        icon={
          <Badge
            content={tabsCounters?.sourcingRequests?.totalCount ?? 0}
            variant='white'
          />
        }
      />

      <NavigationTabsList.Tab
        label='Jobs'
        value={tabValues.TALENT_JOBS}
        icon={
          <Badge
            content={tabsCounters?.engagements.jobCounters.total ?? 0}
            variant='white'
          />
        }
        hidden={!userPermissions?.canViewEngagements}
      />

      <NavigationTabsList.Tab
        label='Applications'
        value={tabValues.JOB_APPLICATIONS}
        hidden={!tabsPermissions?.jobApplications}
      />

      <NavigationTabsList.Tab
        label='Notes'
        value={tabValues.NOTES}
        icon={
          <Badge
            content={tabsCounters?.activitiesAndNotes?.totalCount ?? 0}
            variant='white'
          />
        }
      />

      <NavigationTabsList.Tab
        label='Performance'
        value={tabValues.PERFORMANCE}
        icon={
          <Badge
            content={tabsCounters?.infractions?.totalCount ?? 0}
            variant='white'
          />
        }
        hidden={!tabsPermissions?.displayPerformanceProfileTab}
      />

      <NavigationTabsList.Tab
        label='Community'
        value={tabValues.COMMUNITY_LEADER}
        hidden={!userPermissions?.canViewCommunityLeaders}
      />

      <NavigationTabsList.Tab
        label='TopShield'
        value={tabValues.TOP_SHIELD}
        hidden={!tabsPermissions?.topShieldApplication}
      />
    </NavigationTabsList>
  )
}

export default TalentTabsList
