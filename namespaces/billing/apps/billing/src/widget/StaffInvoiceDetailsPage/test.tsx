import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WidgetStaffInvoiceDetailsPage from '.'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('../../modules/invoice/pages/InvoiceDetailsPage')
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')

const render = (props: ComponentProps<typeof WidgetStaffInvoiceDetailsPage>) =>
  renderComponent(<WidgetStaffInvoiceDetailsPage {...props} />)

describe('WidgetStaffInvoiceDetailsPage', () => {
  describe('when `invoiceId` is defined', () => {
    it('widget is rendered', () => {
      const { getByTestId } = render()

      expect(getByTestId('App')).toBeInTheDocument()
      expect(getByTestId('InvoiceDetailsPage')).toBeInTheDocument()
      expect(getByTestId('Modals')).toBeInTheDocument()
    })
  })

  describe('when `modalsOnly` is `true`', () => {
    it('widget is rendered', () => {
      const { queryByTestId, getByTestId } = render({
        modalsOnly: true
      })

      expect(queryByTestId('InvoiceDetailsPage')).toBeNull()
      expect(getByTestId('App')).toBeInTheDocument()
      expect(getByTestId('Modals')).toBeInTheDocument()
    })
  })
})
