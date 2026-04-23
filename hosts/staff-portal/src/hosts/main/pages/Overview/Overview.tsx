import { Container, Grid } from '@toptal/picasso'
import React from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { DueTasks } from '@staff-portal/tasks-lists'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import {
  StaffDashboardCommissionWidget,
  StaffBillingStatsWidget,
  StaffOverviewWidget
} from '@staff-portal/billing-widgets'

import ClaimSteps from './containers/ClaimSteps/ClaimSteps'
import CompanyVerificationRateChart from './containers/CompanyVerificationRateChart/CompanyVerificationRateChart'
import RecentActivity from './containers/RecentActivity/RecentActivity'
import ReferralsSection from './containers/ReferralsSection/ReferralsSection'
import { useGetOverviewWidgetPermissions } from './data/get-overview-widget-permissions/get-overview-widget-permissions.staff.gql'

// eslint-disable-next-line complexity
const Overview = () => {
  const user = useGetCurrentUser()
  const { data } = useGetOverviewWidgetPermissions()

  if (!user) {
    return null
  }

  // To be able to know if claims section will be visible we need to check for `nodes` too
  const hasClaimsAvailable =
    data?.widgets.claims.available && !!data?.widgets.claims.nodes.length
  const hasCommissionsAvailable = data?.widgets.commissions?.available

  return (
    <ContentWrapper title='Welcome to Toptal'>
      {data?.widgets.billingStats?.available && (
        <WidgetErrorBoundary emptyOnError>
          <Container data-testid='dashboard-billing-stats-widget'>
            <StaffBillingStatsWidget />
          </Container>
        </WidgetErrorBoundary>
      )}
      {data?.widgets.showOverviewApp && (
        <WidgetErrorBoundary emptyOnError>
          <Container data-testid='dashboard-billing-overview'>
            <StaffOverviewWidget />
          </Container>
        </WidgetErrorBoundary>
      )}
      {data?.widgets.companyCharts?.available && (
        <CompanyVerificationRateChart />
      )}

      <DueTasks />

      {data?.widgets.referrals?.available && <ReferralsSection />}

      <Container top='large' data-testid='dashboard-widgets'>
        <Grid>
          {hasClaimsAvailable && <ClaimSteps />}

          <RecentActivity
            /** we want to move `RecentActivity` as last one for this conditional,
             * to have the same order of widgets as in the platform
             */
            order={hasCommissionsAvailable && hasClaimsAvailable ? 1 : 0}
            userId={user.id}
          />

          {hasCommissionsAvailable && (
            <WidgetErrorBoundary emptyOnError>
              <StaffDashboardCommissionWidget />
            </WidgetErrorBoundary>
          )}
        </Grid>
      </Container>
    </ContentWrapper>
  )
}

export default Overview
