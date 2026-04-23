import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import InvoiceListAmount from '.'

const render = (props: ComponentProps<typeof InvoiceListAmount>) =>
  renderComponent(<InvoiceListAmount {...props} />)

describe('InvoiceListAmount', () => {
  describe('when invoice has creditedMessage', () => {
    it('renders creditedMessage part', () => {
      const { getByTestId } = render({
        invoice: {
          ...fixtures.MockInvoice,
          creditedAmount: 500
        }
      })

      expect(getByTestId('InvoiceListAmount-amount-credited')).toContainHTML(
        '$500.00 credited'
      )
    })
  })

  describe('when invoice does not have creditedMessage', () => {
    it('does not render creditedMessage part', () => {
      const { queryByTestId } = render({
        invoice: {
          ...fixtures.MockInvoice
        }
      })

      expect(queryByTestId('InvoiceListAmount-amount-credited')).toBeNull()
    })
  })

  it('renders amount properly', () => {
    const { getByTestId } = render({
      invoice: {
        ...fixtures.MockInvoice
      }
    })

    expect(
      getByTestId('InvoiceAmountWithColorAndTooltip-amount')
    ).toContainHTML('$2,295.00')
  })
})
