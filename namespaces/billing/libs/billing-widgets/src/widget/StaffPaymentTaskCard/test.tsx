import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WidgetStaffPaymentTaskCard from '.'

jest.mock(
  '../../modules/payment/components/PaymentTaskCard/components/PaymentTaskCard'
)
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/utils')

const render = (props: ComponentProps<typeof WidgetStaffPaymentTaskCard>) =>
  renderComponent(<WidgetStaffPaymentTaskCard {...props} />)

describe('WidgetStaffPaymentTaskCard', () => {
  it('widget is rendered', () => {
    const { getByTestId } = render({
      task: { id: 'VjEtVGFzay00MTA0MTUz' },
      taskCardConfig: {}
    })

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('PaymentTaskCard').innerHTML).toBe(
      '{"taskCardConfig":{},"task":{"id":"VjEtVGFzay00MTA0MTUz"}}'
    )
    expect(getByTestId('Modals')).toBeInTheDocument()
  })
})
