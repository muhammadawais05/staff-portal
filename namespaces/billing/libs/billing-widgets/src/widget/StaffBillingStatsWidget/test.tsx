import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WidgetStaffBillingStatsWidget from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('../../modules/dashboard/components/BillingStatsWidget')

const render = () =>
  renderComponent(
    <WidgetStaffBillingStatsWidget endpoints={fixtures.MockEndpoints} />
  )

describe('WidgetStaffBillingStatsWidget', () => {
  it('widget is rendered', () => {
    const { getByTestId } = render()

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('BillingStatsWidget')).toBeInTheDocument()
  })
})
