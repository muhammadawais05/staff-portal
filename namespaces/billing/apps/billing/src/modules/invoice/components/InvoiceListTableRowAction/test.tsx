import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceListTableRowAction from '.'

jest.mock('@staff-portal/billing/src/components/OperationFetcherForActions')

const render = (props: ComponentProps<typeof InvoiceListTableRowAction>) =>
  renderComponent(<InvoiceListTableRowAction {...props} />)

describe('InvoiceListTableRowAction', () => {
  it('renders Actions', () => {
    const { getByTestId } = render({
      invoice: {
        ...fixtures.MockInvoice,
        operations: undefined
      },
      handleOnClick: jest.fn()
    })

    expect(getByTestId('more-actions-button')).not.toBeNull()
  })

  describe('when operation is missing', () => {
    it('does not render the button at all', () => {
      const { queryByTestId } = render({
        invoice: {
          ...fixtures.MockInvoice,
          operations: undefined
        },
        handleOnClick: jest.fn()
      })
      const button = queryByTestId('InvoiceListTableRowAction')

      expect(button).toBeNull()
    })
  })

  describe('when the operation is Enabled', () => {
    it('renders the Create Payment Group button with proper details', () => {
      const { getByTestId } = render({
        invoice: {
          ...fixtures.MockInvoice,
          operations: {
            createTransferInvoice: {
              callable: OperationCallableTypes.ENABLED,
              messages: ['']
            }
          }
        },
        handleOnClick: jest.fn()
      })
      const button = getByTestId('InvoiceListTableRowAction-pay')

      expect(button).toBeEnabled()
    })
  })

  describe('when the operation is Disabled', () => {
    it('renders the Create Payment Group button as disabled', () => {
      const { getByTestId } = render({
        invoice: {
          ...fixtures.MockInvoice,
          operations: {
            createTransferInvoice: {
              callable: OperationCallableTypes.DISABLED,
              messages: ['']
            }
          }
        },
        handleOnClick: jest.fn()
      })
      const button = getByTestId('InvoiceListTableRowAction-pay')

      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('when the operation is Hidden', () => {
    it('does not render the button at all', () => {
      const { queryByTestId } = render({
        invoice: {
          ...fixtures.MockInvoice,
          operations: {
            createTransferInvoice: {
              callable: OperationCallableTypes.HIDDEN,
              messages: ['']
            }
          }
        },
        handleOnClick: jest.fn()
      })

      const button = queryByTestId('InvoiceListTableRowAction-pay')

      expect(button).toBeNull()
    })
  })
})
