import React, { ComponentProps, ReactNode } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoicePayModalFullyCovered from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = (
  children: ReactNode,
  props: ComponentProps<typeof InvoicePayModalFullyCovered>
) =>
  renderComponent(
    <InvoicePayModalFullyCovered {...props}>
      {children}
    </InvoicePayModalFullyCovered>
  )

describe('InvoicePayModalFullyCovered', () => {
  it('is paid render', () => {
    const { container } = render(null, {
      clientId: 'clientId',
      documentNumber: 123,
      isInvoicePaid: true
    })

    expect(container).toMatchSnapshot()
  })

  it('is not paid render', () => {
    const { container } = render(null, {
      clientId: 'clientId',
      documentNumber: 123,
      isInvoicePaid: false
    })

    expect(container).toMatchSnapshot()
  })
})
