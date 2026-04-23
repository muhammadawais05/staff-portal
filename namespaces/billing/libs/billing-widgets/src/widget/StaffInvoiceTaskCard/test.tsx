import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WidgetStaffInvoiceTaskCard from '.'

jest.mock(
  '../../modules/invoice/components/InvoiceTaskCard/components/InvoiceTaskCard'
)
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('@staff-portal/billing/src/components/App')

const render = (props: ComponentProps<typeof WidgetStaffInvoiceTaskCard>) =>
  renderComponent(<WidgetStaffInvoiceTaskCard {...props} />)

describe('WidgetStaffInvoiceTaskCard', () => {
  it('widget is rendered', () => {
    const { getByTestId } = render({
      taskCardConfig: {}
    })

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('InvoiceTaskCard')).toBeInTheDocument()
    expect(getByTestId('Modals')).toBeInTheDocument()
  })
})
