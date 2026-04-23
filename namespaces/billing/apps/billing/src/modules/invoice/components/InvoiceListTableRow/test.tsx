import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import MockDate from 'mockdate'
import { InvoiceKind } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useListTableRowExpandState } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import InvoiceListTableRow from '.'

jest.mock('../InvoiceListTableRowAction')
jest.mock(
  '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentStatus'
)
jest.mock('@staff-portal/billing-widgets/src/modules/commercialDocument/utils')

const render = (props: ComponentProps<typeof InvoiceListTableRow>) =>
  renderComponent(
    <Table>
      <Table.Body>
        <InvoiceListTableRow {...props} />
      </Table.Body>
    </Table>
  )

const mockUseListTableRowExpandState = useListTableRowExpandState as jest.Mock

describe('InvoiceListTableRow', () => {
  beforeEach(() => MockDate.set('2020-01-01T19:00:00.000+00:00'))

  afterEach(() => MockDate.reset())

  describe('When a Consolidated invoice is rendered', () => {
    it('will render long description', () => {
      mockUseListTableRowExpandState.mockReturnValue({
        isExpanded: jest.fn().mockReturnValue(true),
        handleOnExpandClick: jest.fn()
      })

      const { queryByTestId } = render({
        handleOnActionClick: jest.fn(),
        handleOnExpandClick: jest.fn(),
        invoice: {
          ...fixtures.MockInvoice,
          longDescription: ['Long description'],
          invoiceKind: InvoiceKind.CONSOLIDATED
        }
      })

      expect(
        queryByTestId('InvoiceListTableRow-description')
      ).not.toBeInTheDocument()
      expect(
        queryByTestId('InvoiceListTableRow-long-description')
      ).toBeInTheDocument()
    })
  })

  describe('When an invoice is not consolidated', () => {
    it('will render small description', () => {
      mockUseListTableRowExpandState.mockReturnValue({
        isExpanded: jest.fn().mockReturnValue(true),
        handleOnExpandClick: jest.fn()
      })

      const { queryByTestId } = render({
        handleOnActionClick: jest.fn(),
        handleOnExpandClick: jest.fn(),
        invoice: {
          ...fixtures.MockInvoice,
          invoiceKind: InvoiceKind.COMPANY_BILL
        }
      })

      expect(
        queryByTestId('InvoiceListTableRow-description')
      ).toBeInTheDocument()
      expect(
        queryByTestId('InvoiceListTableRow-long-description')
      ).not.toBeInTheDocument()
    })
  })
})
