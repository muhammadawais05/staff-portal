import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import StaffJobPage from '.'

jest.mock('@toptal/staff-portal', () => ({
  WidgetErrorBoundary: jest
    .fn()
    .mockImplementation(({ children }) => (
      <div data-testid='WidgetErrorBoundary'>{children}</div>
    ))
}))
jest.mock(
  '@staff-portal/billing-widgets/src/modules/billingCycles/components/BillingCycles'
)
jest.mock(
  '@staff-portal/billing-widgets/src/modules/extraExpenses/components/ExtraExpenses'
)
jest.mock(
  '@staff-portal/billing-widgets/src/modules/placementFees/components/PlacementFees'
)
jest.mock(
  '@staff-portal/billing-widgets/src/modules/timesheets/components/TimesheetListContainer'
)
jest.mock('../../../engagement/components/EngagementContainer')

const render = (engagementId = 'VjEtRW5nYWdlbWVudC0xNzE2MDg') =>
  renderComponent(<StaffJobPage engagementId={engagementId} />)

describe('StaffJobPage', () => {
  it('default render', () => {
    const { getByTestId, queryByTestId } = render()

    expect(queryByTestId('TimesheetListContainer')).toBeInTheDocument()

    expect(getByTestId('TimesheetListContainer-engagementId')).toContainHTML(
      'VjEtRW5nYWdlbWVudC0xNzE2MDg'
    )
    expect(getByTestId('TimesheetListContainer-limitElements')).toContainHTML(
      '3'
    )

    expect(getByTestId('BillingCycles')).toBeInTheDocument()

    expect(getByTestId('BillingCycles-engagementId')).toContainHTML(
      'VjEtRW5nYWdlbWVudC0xNzE2MDg'
    )

    expect(getByTestId('StaffJobPage-memorandums')).toHaveAttribute(
      'href',
      '/platform/staff/memos?engagement_id=171608'
    )

    expect(getByTestId('ExtraExpenses-engagementId')).toContainHTML(
      'VjEtRW5nYWdlbWVudC0xNzE2MDg'
    )
    expect(getByTestId('PlacementFees-engagementId')).toContainHTML(
      'VjEtRW5nYWdlbWVudC0xNzE2MDg'
    )
  })

  describe('when `engagementId` is `falsy`', () => {
    it.each`
      engagementId
      ${undefined}
      ${'0'}
      ${'random weird string for an id'}
      ${0}
      ${'VjEtRW5nYWdlbWVudC0'}
    `(
      'should render null when `engagementId` is `$engagementId`',
      async ({ engagementId }) => {
        const { queryByTestId } = render({
          engagementId
        })

        expect(queryByTestId('BillingCycles')).not.toBeInTheDocument()
        expect(queryByTestId('EngagementContainer')).not.toBeInTheDocument()
        expect(queryByTestId('TimesheetListContainer')).not.toBeInTheDocument()
      }
    )
  })
})
