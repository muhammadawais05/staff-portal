import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ReceivedPaymentListRowActions from '.'

const render = (props: ComponentProps<typeof ReceivedPaymentListRowActions>) =>
  renderComponent(<ReceivedPaymentListRowActions {...props} />)

describe('PaymentRowAction', () => {
  describe('when download links are provided', () => {
    it('renders all download links', () => {
      const { queryByTestId } = render({
        payment: fixtures.MockPayment
      })

      expect(queryByTestId('HTML')).toBeInTheDocument()
      expect(queryByTestId('PDF')).toBeInTheDocument()
      expect(queryByTestId('more-actions-button')).toBeInTheDocument()
    })
  })

  describe('when download links are null', () => {
    it('renders a disabled component with no menu', () => {
      const { queryByTestId } = render({
        payment: {
          ...fixtures.MockPayment,
          downloadHtmlUrl: null,
          downloadPdfUrl: null
        }
      })

      expect(queryByTestId('HTML')).toBeNull()
      expect(queryByTestId('PDF')).toBeNull()
      expect(queryByTestId('more-actions-button')).toHaveAttribute('disabled')
    })
  })
})
