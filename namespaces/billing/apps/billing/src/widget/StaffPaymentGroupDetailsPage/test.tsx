import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WidgetStaffInvoiceListPage from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('../../modules/paymentGroup/page/PaymentGroupDetailsPage')
jest.mock('@staff-portal/billing/src/components/Modals')

const render = (props: ComponentProps<typeof WidgetStaffInvoiceListPage>) =>
  renderComponent(<WidgetStaffInvoiceListPage {...props} />)

describe('WidgetStaffInvoiceListPage', () => {
  it('renders all required components', () => {
    const { getByTestId } = render()

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('PaymentGroupDetailsPage')).toBeInTheDocument()
    expect(getByTestId('Modals')).toBeInTheDocument()
  })
})
