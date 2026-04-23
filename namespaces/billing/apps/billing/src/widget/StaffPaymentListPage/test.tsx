import React from 'react'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WidgetStaffPaymentListPage from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('@staff-portal/counters')
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('../../modules/payment/pages/PaymentList')

const render = (props: BaseAppProps) =>
  renderComponent(<WidgetStaffPaymentListPage {...props} />)

describe('WidgetStaffPaymentListPage', () => {
  it('widget is rendered', () => {
    const { getByTestId } = render()

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('ScrollToTop')).toBeInTheDocument()
    expect(getByTestId('PaymentList')).toBeInTheDocument()
    expect(getByTestId('Modals')).toBeInTheDocument()
  })
})
