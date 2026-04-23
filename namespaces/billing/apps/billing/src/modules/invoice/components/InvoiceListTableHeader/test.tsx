import { Table } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceListTableHeader from '.'

const render = (props: ComponentProps<typeof InvoiceListTableHeader> = {}) =>
  renderComponent(
    <Form>
      <Table>
        <InvoiceListTableHeader {...props} />
      </Table>
    </Form>
  )

describe('InvoiceListTableHeader', () => {
  it('renders default header cells', () => {
    const { getByTestId } = render()

    expect(getByTestId('InvoiceListTableHeader-id')).toHaveTextContent('ID')
    expect(getByTestId('InvoiceListTableHeader-amount')).toHaveTextContent(
      'Amount'
    )
    expect(getByTestId('InvoiceListTableHeader-date')).toHaveTextContent(
      'Date Issued'
    )
    expect(getByTestId('InvoiceListTableHeader-description')).toHaveTextContent(
      'Description'
    )
  })

  describe('when `isSelectionVisible` is `true`', () => {
    it('renders `Checkbox` cell', () => {
      const { getByTestId } = render({ isSelectionVisible: true })

      expect(
        getByTestId('InvoiceListTableHeader-checkbox-header')
      ).toBeInTheDocument()
      expect(
        getByTestId('InvoiceListTableHeader-checkbox-header')
      ).toBeInTheDocument()
    })
  })

  describe('when `isSelectionVisible` is `false`', () => {
    it('does not render `Checkbox` cell', () => {
      const { queryByTestId } = render()

      expect(queryByTestId('InvoiceListTableHeader-checkbox-header')).toBeNull()
    })
  })

  describe('when `isStatusVisible` is `true`', () => {
    it('renders `Status` cell', () => {
      const { getByTestId } = render({ isStatusVisible: true })

      expect(getByTestId('InvoiceListTableHeader-status')).toHaveTextContent(
        'Status'
      )
    })
  })

  describe('when `isStatusVisible` is `false`', () => {
    it('does not render `Status` cell', () => {
      const { queryByTestId } = render()

      expect(queryByTestId('InvoiceListTableHeader-status')).toBeNull()
    })
  })

  describe('when `isRecipientVisible` is `true`', () => {
    it('renders `Recipient` cell', () => {
      const { getByTestId } = render({ isRecipientVisible: true })

      expect(getByTestId('InvoiceListTableHeader-recipient')).toHaveTextContent(
        'Invoice To'
      )
    })
  })

  describe('when `isRecipientVisible` is `false`', () => {
    it('does not render `Recipient` cell', () => {
      const { queryByTestId } = render()

      expect(queryByTestId('InvoiceListTableHeader-recipient')).toBeNull()
    })
  })

  describe('when `isActionsVisible` is `true`', () => {
    it('renders action cell', () => {
      const { getByTestId, queryByTestId } = render({ isActionsVisible: true })

      expect(queryByTestId('InvoiceListTableHeader-expander')).toBeNull()
      expect(getByTestId('InvoiceListTableHeader-action')).toHaveTextContent(
        'Actions'
      )
    })
  })

  describe('when `isActionsVisible` is `false`', () => {
    it('renders expander cell', () => {
      const { getByTestId, queryByTestId } = render()

      expect(getByTestId('InvoiceListTableHeader-expander')).toBeInTheDocument()
      expect(queryByTestId('InvoiceListTableHeader-action')).toBeNull()
    })
  })
})
