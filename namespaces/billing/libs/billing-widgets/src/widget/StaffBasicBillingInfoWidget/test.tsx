import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WidgetStaffBasicBillingInfo from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('../../modules/billingInfo/components/BasicBillingInfo')
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('@staff-portal/billing/src/utils')

const render = () =>
  renderComponent(
    <WidgetStaffBasicBillingInfo
      baseAppProps={{ endpoints: fixtures.MockEndpoints }}
      companyId='VjEtQ29tcGFueS0xMjM0NQ'
    />
  )

describe('WidgetStaffBasicBillingInfo', () => {
  it('widget is rendered', () => {
    const { getByTestId } = render()

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('BasicBillingInfo')).toBeInTheDocument()
    expect(getByTestId('BasicBillingInfo-companyId')).toContainHTML(
      'VjEtQ29tcGFueS0xMjM0NQ'
    )
    expect(getByTestId('Modals')).toBeInTheDocument()
  })
})
