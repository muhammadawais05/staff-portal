import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ViewBillingOptionsContainer from '../../containers/ViewBillingOptionsContainer'
import WidgetStaffBillingAddressDetails from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('../../modules/billingDetails/components/BillingDetailsAddress')
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('../../containers/ViewBillingOptionsContainer', () => ({
  __esModule: true,
  default: jest.fn()
}))

const render = () =>
  renderComponent(
    <WidgetStaffBillingAddressDetails
      baseAppProps={{ endpoints: fixtures.MockEndpoints }}
      companyId='VjEtQ29tcGFueS0xMjM0NQ'
    />
  )

const ViewBillingOptionsContainerMock = ViewBillingOptionsContainer as jest.Mock

describe('WidgetStaffBillingAddressDetails', () => {
  it('widget is rendered', () => {
    ViewBillingOptionsContainerMock.mockImplementation(({ children }) => (
      <>{children}</>
    ))

    const { getByTestId } = render()

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('BillingDetailsAddress')).toBeInTheDocument()
    expect(getByTestId('BillingDetailsAddress-companyId')).toContainHTML(
      'VjEtQ29tcGFueS0xMjM0NQ'
    )
    expect(getByTestId('Modals')).toBeInTheDocument()
    expect(ViewBillingOptionsContainerMock).toHaveBeenCalledTimes(1)
  })
})
