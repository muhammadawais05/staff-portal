import React, { ComponentProps } from 'react'
import { fireEvent } from '@toptal/picasso/test-utils'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceListRow from '.'

jest.mock('../../../InvoiceShortDescription')
jest.mock('@staff-portal/billing/src/components/LinkWrapper')
jest.mock(
  '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentStatus'
)
jest.mock('../../../InvoiceListAmount')
jest.mock('../../../InvoiceListDate')

const render = (props: ComponentProps<typeof InvoiceListRow>) =>
  renderComponent(
    <table>
      <tbody>
        <InvoiceListRow {...props} />
      </tbody>
    </table>
  )

describe('InvoiceListRow', () => {
  it('renders description properly', () => {
    const { getByTestId, queryByTestId } = render({
      index: 1,
      invoice: fixtures.MockInvoice
    })

    expect(queryByTestId('InvoiceShortDescription')).not.toBeNull()

    fireEvent.click(getByTestId('InvoiceListRow-expand'))

    expect(queryByTestId('InvoiceShortDescription')).toBeNull()
  })

  it('renders Invoice Row', () => {
    const { getByTestId } = render({
      index: 1,
      invoice: fixtures.MockInvoice
    })

    expect(getByTestId('InvoiceListDate-invoice')).toContainHTML(
      'VjEtSW52b2ljZS0zNzcyNDk'
    )
    expect(getByTestId('InvoiceListAmount-invoice')).toContainHTML(
      'VjEtSW52b2ljZS0zNzcyNDk'
    )
    expect(getByTestId('LinkWrapper')).toBeInTheDocument()
    expect(getByTestId('InvoiceListRow-invoice-id')).toBeInTheDocument()
  })

  describe('when selection is enabled', () => {
    describe('when invoice does not have consolidatable: false', () => {
      it('renders as regular selectable row', () => {
        const { getByTestId } = render({
          index: 1,
          invoice: fixtures.MockInvoice,
          selectionEnabled: true
        })

        expect(
          getByTestId('InvoiceListRow-checkbox-enabled')
        ).toBeInTheDocument()
      })
    })
    describe('when invoice has consolidatable: false', () => {
      it('renders as a disabled state', () => {
        const { getByTestId } = render({
          index: 1,
          invoice: {
            ...fixtures.MockInvoice,
            consolidatable: false
          },
          selectionEnabled: true
        })

        expect(
          getByTestId('InvoiceListRow-checkbox-disabled')
        ).toBeInTheDocument()
      })
    })
  })
})
