import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceTaskCardTitle from '.'

const render = (props: ComponentProps<typeof InvoiceTaskCardTitle>) =>
  renderComponent(<InvoiceTaskCardTitle {...props} />)

describe('InvoiceTaskCardTitle', () => {
  describe('when there is `consolidatedInvoice`', () => {
    it('card is rendered properly', () => {
      const { container } = render({
        consolidatedDocument: {
          id: 'abc123',
          webResource: {
            text: 'Invoice #377249',
            url: 'http://localhost:3000/platform/staff/invoices/377249'
          }
        },
        taskCardSubtitle: 'abc123'
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when there is no `consolidatedInvoice`', () => {
    it('card is rendered properly', () => {
      const { container } = render({
        taskCardSubtitle: 'abc123'
      })

      expect(container).toMatchSnapshot()
    })
  })
})
