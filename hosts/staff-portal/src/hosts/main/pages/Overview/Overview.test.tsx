import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import Overview from './Overview'
import { useGetOverviewWidgetPermissions } from './data/get-overview-widget-permissions/get-overview-widget-permissions.staff.gql'
import { GetOverviewWidgetPermissionsQuery } from './data/get-overview-widget-permissions/get-overview-widget-permissions.staff.gql.types'

jest.mock('@staff-portal/tasks-lists', () => ({
  ...jest.requireActual('@staff-portal/tasks-lists'),
  DueTasks: () => <div data-testid='due-tasks' />
}))

jest.mock('./containers/ClaimSteps/ClaimSteps', () => ({
  __esModule: true,
  default: () => <div data-testid='claim-steps' />
}))

jest.mock('./containers/RecentActivity/RecentActivity', () => ({
  __esModule: true,
  default: () => <div data-testid='recent-activity' />
}))

jest.mock('./containers/ReferralsSection/ReferralsSection', () => ({
  __esModule: true,
  default: () => <div data-testid='referrals-section' />
}))

jest.mock(
  './containers/CompanyVerificationRateChart/CompanyVerificationRateChart',
  () => ({
    __esModule: true,
    default: () => <div data-testid='CompanyVerificationRateChart' />
  })
)

jest.mock('@staff-portal/billing-widgets', () => ({
  StaffDashboardCommissionWidget: () => (
    <div data-testid='dashboard-commissions-widget' />
  ),
  StaffBillingStatsWidget: () => <div />,
  StaffOverviewWidget: () => <div />
}))

jest.mock(
  './data/get-overview-widget-permissions/get-overview-widget-permissions.staff.gql',
  () => ({
    useGetOverviewWidgetPermissions: jest.fn()
  })
)

const mockReturnValues = (
  widgets: GetOverviewWidgetPermissionsQuery['widgets']
) => {
  const mockUseGetOverviewWidgetPermissions =
    useGetOverviewWidgetPermissions as jest.Mock

  mockUseGetOverviewWidgetPermissions.mockReturnValue({ data: { widgets } })
}

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <Overview />
    </TestWrapper>
  )
}

describe('Overview', () => {
  it('shows unrestricted widgets', () => {
    mockReturnValues({
      claims: { available: false, nodes: [] },
      showOverviewApp: false
    })
    arrangeTest()

    expect(screen.getByText('Welcome to Toptal')).toBeInTheDocument()
    expect(screen.getByTestId('due-tasks')).toBeInTheDocument()
    expect(screen.getByTestId('recent-activity')).toBeInTheDocument()

    expect(
      screen.queryByTestId('dashboard-billing-stats-widget')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('dashboard-billing-overview')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('CompanyVerificationRateChart')
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('referrals-section')).not.toBeInTheDocument()
    expect(screen.queryByTestId('claim-steps')).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('dashboard-commissions-widget')
    ).not.toBeInTheDocument()
  })

  it('shows unrestricted and restricted widgets', () => {
    mockReturnValues({
      claims: {
        available: true,
        nodes: [
          {
            roleStepsTitle: 'some title'
          }
        ]
      },
      showOverviewApp: true,
      referrals: { available: true },
      billingStats: { available: true },
      commissions: { available: true },
      companyCharts: { available: true }
    })
    arrangeTest()

    expect(screen.getByText('Welcome to Toptal')).toBeInTheDocument()
    expect(screen.getByTestId('due-tasks')).toBeInTheDocument()
    expect(screen.getByTestId('recent-activity')).toBeInTheDocument()

    expect(
      screen.getByTestId('dashboard-billing-stats-widget')
    ).toBeInTheDocument()
    expect(screen.getByTestId('dashboard-billing-overview')).toBeInTheDocument()
    expect(
      screen.getByTestId('CompanyVerificationRateChart')
    ).toBeInTheDocument()
    expect(screen.getByTestId('referrals-section')).toBeInTheDocument()
    expect(screen.getByTestId('claim-steps')).toBeInTheDocument()
    expect(
      screen.getByTestId('dashboard-commissions-widget')
    ).toBeInTheDocument()
  })
})
