import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ViewBillingOptionsContainer from '../../containers/ViewBillingOptionsContainer'
import WidgetStaffBillingDetails from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('../../modules/billingDetails/components/BillingDetails')
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('../../containers/ViewBillingOptionsContainer', () => ({
  __esModule: true,
  default: jest.fn()
}))

const render = () =>
  renderComponent(
    <WidgetStaffBillingDetails companyId='VjEtQ29tcGFueS0xMjM0NQ' />
  )

const mockedViewBillingOptionsContainer =
  ViewBillingOptionsContainer as jest.Mock

describe('WidgetStaffBillingDetails', () => {
  it('widget is rendered', () => {
    mockedViewBillingOptionsContainer.mockImplementationOnce(
      ({ children }) => children
    )

    const { getByTestId } = render()

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('BillingDetails')).toBeInTheDocument()
    expect(getByTestId('BillingDetails-companyId')).toContainHTML(
      'VjEtQ29tcGFueS0xMjM0NQ'
    )
    expect(getByTestId('Modals')).toBeInTheDocument()

    expect(mockedViewBillingOptionsContainer).toHaveBeenCalledTimes(1)
    expect(mockedViewBillingOptionsContainer).toHaveBeenCalledWith(
      expect.objectContaining({ skeletonRowsSize: 30 }),
      {}
    )
  })
})
