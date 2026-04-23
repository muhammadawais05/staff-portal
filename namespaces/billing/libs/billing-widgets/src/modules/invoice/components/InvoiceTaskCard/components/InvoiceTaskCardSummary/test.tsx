import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceTaskCardSummary from '.'

jest.mock(
  '../../../../../commercialDocument/components/CommercialDocumentStatus'
)

const render = (props: ComponentProps<typeof InvoiceTaskCardSummary>) =>
  renderComponent(<InvoiceTaskCardSummary {...props} />)

describe('InvoiceTaskCardSummary', () => {
  it('renders clean outstanding amount', () => {
    const { getByTestId } = render({
      invoice: { ...fixtures.MockInvoice, cleanOutstandingAmount: '999' }
    })

    expect(
      getByTestId('InvoiceAmountWithColorAndTooltip-amount')
    ).toContainHTML('$999.00')
  })

  describe('when job is applied', () => {
    it('JobStatus component rendered', () => {
      const { getByTestId } = render({
        invoice: fixtures.MockInvoice
      })

      expect(
        getByTestId('InvoiceTaskCardSummary-jobStatus-component')
      ).toContainHTML('VjEtSm9iLTE0NTU0NA')
    })
  })

  describe('when job is not applied', () => {
    it('empty state rendered', () => {
      const { getByTestId } = render({
        invoice: {
          ...fixtures.MockInvoice,
          job: undefined
        }
      })

      expect(
        getByTestId('InvoiceTaskCardSummary-jobStatus-value')
      ).toContainHTML('—')
    })
  })

  it('card is rendered properly', () => {
    const { getByTestId } = render({
      invoice: fixtures.MockInvoice
    })

    expect(getByTestId('TaskCardLayout.Summary')).toBeInTheDocument()
    expect(getByTestId('InvoiceTaskCardSummary-status-label')).toContainHTML(
      'Status'
    )
    expect(getByTestId('CommercialDocumentStatus')).toContainHTML('"DISPUTED"')
    expect(getByTestId('InvoiceTaskCardSummary-balance-label')).toContainHTML(
      'Balance'
    )
    expect(
      getByTestId('InvoiceTaskCardSummary-netTerms-label')?.innerHTML
    ).toBe('Net Terms')
    expect(
      getByTestId('InvoiceTaskCardSummary-netTerms-value')?.innerHTML
    ).toBe('Net 30')
    expect(
      getByTestId('InvoiceTaskCardSummary-jobStatus-label')?.innerHTML
    ).toBe('Job Status')
  })
})
