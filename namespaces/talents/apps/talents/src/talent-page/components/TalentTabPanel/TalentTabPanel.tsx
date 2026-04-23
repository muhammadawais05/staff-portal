import { Container } from '@toptal/picasso'
import { NavigationTabPanel } from '@staff-portal/ui'
import React from 'react'
import { TalentTabValue } from '@staff-portal/talents'
import { WorkloadTab } from '@staff-portal/talents-workload'
import { StatsTab } from '@staff-portal/talents-stats'
import { CommunityLeaderTab } from '@staff-portal/community-leaders'

import { TalentProfileTab } from '../../../talent-profile-tab'
import { SourcingRequestsTab } from '../../../sourcing-requests-tab'
import { JobsTab } from '../../../jobs-tab'
import { ApplicationsTab } from '../../../applications-tab'
import { NotesTab } from '../../../notes-tab'
import { PerformanceTab } from '../../../performance-tab'
import { TopShieldTab } from '../../../top-shield-tab'

type Props = {
  talentId: string
  tabValues: typeof TalentTabValue
}

const TalentTabPanel = ({ talentId, tabValues }: Props) => (
  <Container top='medium'>
    <NavigationTabPanel value={tabValues.TALENT_PROFILE}>
      <TalentProfileTab talentId={talentId} />
    </NavigationTabPanel>

    <NavigationTabPanel value={tabValues.WORKLOAD}>
      <WorkloadTab talentId={talentId} section />
    </NavigationTabPanel>

    <NavigationTabPanel value={tabValues.STATS}>
      <StatsTab talentId={talentId} section />
    </NavigationTabPanel>

    <NavigationTabPanel value={tabValues.SOURCING_REQUESTS}>
      <SourcingRequestsTab talentId={talentId} />
    </NavigationTabPanel>

    <NavigationTabPanel value={tabValues.TALENT_JOBS}>
      <JobsTab talentId={talentId} />
    </NavigationTabPanel>

    <NavigationTabPanel value={tabValues.JOB_APPLICATIONS}>
      <ApplicationsTab talentId={talentId} />
    </NavigationTabPanel>

    <NavigationTabPanel value={tabValues.NOTES}>
      <NotesTab talentId={talentId} sectionVariant='withHeaderBar' />
    </NavigationTabPanel>

    <NavigationTabPanel value={tabValues.PERFORMANCE}>
      <PerformanceTab talentId={talentId} />
    </NavigationTabPanel>

    <NavigationTabPanel value={tabValues.COMMUNITY_LEADER}>
      <CommunityLeaderTab talentId={talentId} />
    </NavigationTabPanel>

    <NavigationTabPanel value={tabValues.TOP_SHIELD}>
      <TopShieldTab talentId={talentId} />
    </NavigationTabPanel>
  </Container>
)

export default TalentTabPanel
