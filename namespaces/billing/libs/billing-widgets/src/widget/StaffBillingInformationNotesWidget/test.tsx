import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ViewBillingOptionsContainer from '../../containers/ViewBillingOptionsContainer'
import WidgetStaffBillingInformationNotes from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock(
  '../../modules/billingInformationNotes/components/BillingInformationNotes'
)
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('../../containers/ViewBillingOptionsContainer', () => ({
  __esModule: true,
  default: jest.fn()
}))

const render = () =>
  renderComponent(
    <WidgetStaffBillingInformationNotes
      baseAppProps={{ endpoints: fixtures.MockEndpoints }}
      companyId='VjEtQ29tcGFueS0xMjM0NQ'
    />
  )

const mockedViewBillingOptionsContainer =
  ViewBillingOptionsContainer as jest.Mock

describe('WidgetStaffBillingInformationNotes', () => {
  it('widget is rendered', () => {
    mockedViewBillingOptionsContainer.mockImplementationOnce(
      ({ children }) => children
    )

    const { getByTestId } = render()

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('BillingInformationNotes')).toBeInTheDocument()
    expect(getByTestId('BillingInformationNotes-companyId')).toContainHTML(
      'VjEtQ29tcGFueS0xMjM0NQ'
    )
    expect(getByTestId('Modals')).toBeInTheDocument()

    expect(mockedViewBillingOptionsContainer).toHaveBeenCalledTimes(1)
    expect(mockedViewBillingOptionsContainer).toHaveBeenCalledWith(
      expect.objectContaining({ skeletonRowsSize: 5 }),
      {}
    )
  })
})
