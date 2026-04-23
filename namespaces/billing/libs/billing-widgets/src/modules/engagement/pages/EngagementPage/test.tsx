import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import StaffEngagementPage from '.'

jest.mock('../../../timesheets/components/TimesheetListContainer')
jest.mock('../../../billingCycles/components/BillingCycles')

const render = () =>
  renderComponent(
    <StaffEngagementPage engagementId='VjEtRW5nYWdlbWVudC0xNzE2MDg' />
  )

describe('StaffEngagementPage', () => {
  it('default render', () => {
    const { getByTestId, queryByTestId } = render()

    expect(queryByTestId('TimesheetListContainer')).toBeInTheDocument()

    expect(getByTestId('TimesheetListContainer-engagementId')).toContainHTML(
      'VjEtRW5nYWdlbWVudC0xNzE2MDg'
    )
    expect(getByTestId('TimesheetListContainer-limitElements')).toContainHTML(
      '3'
    )

    expect(queryByTestId('BillingCycles')).toBeInTheDocument()

    expect(getByTestId('BillingCycles-engagementId')).toContainHTML(
      'VjEtRW5nYWdlbWVudC0xNzE2MDg'
    )
  })
})
