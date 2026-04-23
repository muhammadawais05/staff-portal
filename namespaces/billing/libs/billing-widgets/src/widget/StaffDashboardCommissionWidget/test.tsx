import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WidgetStaffCommissionWidget from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('../../modules/dashboard/components/CommissionWidget')

const render = () =>
  renderComponent(
    <WidgetStaffCommissionWidget endpoints={fixtures.MockEndpoints} />
  )

describe('WidgetStaffCommissionWidget', () => {
  it('widget is rendered', () => {
    const { getByTestId } = render()

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('DashboardCommissionWidget')).toBeInTheDocument()
  })
})
