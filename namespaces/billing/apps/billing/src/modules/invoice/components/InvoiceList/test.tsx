import { Form } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import MockDate from 'mockdate'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceList from '.'

jest.mock('../InvoiceShortDescription')
jest.mock(
  '@staff-portal/billing-widgets/src/modules/invoice/components/InvoiceAmountWithColorAndTooltip'
)
jest.mock(
  '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentAmountWithColorAndTooltip'
)
jest.mock('@staff-portal/billing/src/components/LinkWrapper')
jest.mock('@staff-portal/billing/src/components/RowExpander')

const render = (props: ComponentProps<typeof InvoiceList>) =>
  renderComponent(
    <Form>
      <InvoiceList {...props} />
    </Form>
  )

describe('InvoiceList', () => {
  beforeEach(() => MockDate.set('2020-01-01T19:00:00.000+00:00'))

  afterEach(() => MockDate.reset())

  describe('when its a non selectable Invoice List', () => {
    it('default render', () => {
      const { queryByTestId } = render({
        invoices: [fixtures.MockInvoice],
        selectionEnabled: false
      })
      const CheckBoxHeaderComponent = queryByTestId(
        'InvoiceListTableHeader-checkbox-header'
      )
      const CheckBoxComponent = queryByTestId('InvoiceListRow-checkbox-enabled')
      const DueDateComponent = queryByTestId('InvoiceListDate-due-date')

      expect(CheckBoxHeaderComponent).toBeNull()
      expect(CheckBoxComponent).toBeNull()
      expect(DueDateComponent).toBeNull()
    })
  })

  describe('when its a selectable Invoice List', () => {
    it('default render', () => {
      const { queryByTestId } = render({
        invoices: [fixtures.MockInvoice],
        selectionEnabled: true
      })
      const CheckBoxHeaderComponent = queryByTestId(
        'InvoiceListTableHeader-checkbox-header'
      )
      const CheckBoxComponent = queryByTestId('InvoiceListRow-checkbox-enabled')
      const DueDateComponent = queryByTestId('InvoiceListDate-due-date')

      expect(CheckBoxHeaderComponent).not.toBeNull()
      expect(CheckBoxComponent).not.toBeNull()
      expect(DueDateComponent).toBeNull()
    })
  })

  describe('when `amountField` is `amount`', () => {
    it('default render', () => {
      const { queryByTestId } = render({
        amountField: 'amount',
        selectionEnabled: true,
        invoices: [fixtures.MockInvoice]
      })
      const CheckBoxHeaderComponent = queryByTestId(
        'InvoiceListTableHeader-checkbox-header'
      )
      const CheckBoxComponent = queryByTestId('InvoiceListRow-checkbox-enabled')
      const DueDateComponent = queryByTestId('InvoiceListDate-due-date')

      expect(CheckBoxHeaderComponent).not.toBeNull()
      expect(CheckBoxComponent).not.toBeNull()
      expect(DueDateComponent).toBeNull()
    })
  })

  describe('when `paidAmount` is defined', () => {
    it('default render', () => {
      const { queryByTestId } = render({
        amountField: 'amount',
        selectionEnabled: true,
        handleOnSelect: jest.fn(),
        invoices: [
          {
            ...fixtures.MockInvoice,
            status: 'OUTSTANDING'
          }
        ]
      })
      const CheckBoxHeaderComponent = queryByTestId(
        'InvoiceListTableHeader-checkbox-header'
      )
      const CheckBoxComponent = queryByTestId('InvoiceListRow-checkbox-enabled')
      const DueDateComponent = queryByTestId('InvoiceListDate-due-date')

      expect(CheckBoxHeaderComponent).not.toBeNull()
      expect(CheckBoxComponent).not.toBeNull()
      expect(DueDateComponent).not.toBeNull()
    })
  })
  describe('when `originalClinetColumnEnabled` is enabled', () => {
    it('displays an additional "Client" column', () => {
      const { getByTestId } = render({
        handleOnSelect: jest.fn(),
        originalClientColumnEnabled: true,
        invoices: [fixtures.MockInvoice]
      })

      expect(getByTestId('InvoiceListTableHeader-client')).not.toBeNull()
      expect(getByTestId('InvoiceListRow-client')).toHaveTextContent(
        fixtures.MockInvoice.subjectObject.webResource.text
      )
    })
  })
})
