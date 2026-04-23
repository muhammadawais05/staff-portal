import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceListHeaderDownloadButton from '.'

const render = (
  props: ComponentProps<typeof InvoiceListHeaderDownloadButton>
) => renderComponent(<InvoiceListHeaderDownloadButton {...props} />)

describe('InvoiceListHeaderDownloadButton', () => {
  describe('when `url` defined', () => {
    it('Button being rendered', () => {
      const { getByTestId } = render({
        url: 'http://example.com/test.xls',
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: ['']
        }
      })
      const button = getByTestId('InvoiceListHeaderDownloadButton')

      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('href', 'http://example.com/test.xls')
      expect(button).not.toHaveAttribute('disabled', '')
    })
  })

  describe('when `url` undefined', () => {
    it('Button being rendered', () => {
      const { getByTestId } = render({
        url: undefined,
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: ['']
        }
      })
      const button = getByTestId('InvoiceListHeaderDownloadButton')

      expect(button).toBeInTheDocument()
      expect(button).not.toHaveAttribute('href')
    })
  })

  describe('when the operation is Disabled', () => {
    it('renders the Consolidated Button button as disabled', () => {
      const { getByTestId } = render({
        operation: {
          callable: OperationCallableTypes.DISABLED,
          messages: ['Example message']
        }
      })
      const button = getByTestId('InvoiceListHeaderDownloadButton')

      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })
})
