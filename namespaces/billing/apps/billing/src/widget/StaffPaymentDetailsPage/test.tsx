import React from 'react'
import { BaseAppProps } from '@staff-portal/billing/src/@types/types'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WidgetStaffPaymentDetailsPage from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('../../modules/payment/pages/PaymentDetails')

const render = (props: BaseAppProps) =>
  renderComponent(<WidgetStaffPaymentDetailsPage {...props} />)

describe('WidgetStaffPaymentDetailsPage', () => {
  it('widget is rendered', () => {
    const { getByTestId } = render({
      paymentId: 'abc123456'
    })

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('PaymentDetails').innerHTML).toBe(
      '{"paymentId":"VjEtUGF5bWVudC11bmRlZmluZWQ"}'
    )
    expect(getByTestId('Modals')).toBeInTheDocument()
  })
})
