import React from 'react'
import { render } from '@testing-library/react'
import { formatAmount } from '@toptal/picasso/utils'
import { getBillingInvoicesPath } from '@staff-portal/routes'
import { TestWrapper } from '@staff-portal/test-utils'

import CompanyTaskCardRevenue, { Props } from './CompanyTaskCardRevenue'

jest.mock('@staff-portal/routes')
jest.mock('@toptal/picasso/utils', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso/utils'),
  formatAmount: jest.fn()
}))

const mockFormatAmount = formatAmount as jest.Mock

const arrangeTest = (company: Props['company']) => ({
  renderResult: render(
    <TestWrapper>
      <CompanyTaskCardRevenue company={company} />
    </TestWrapper>
  )
})

describe('CompanyTaskCardRevenue component', () => {
  it('renders', async () => {
    const COMPANY_LEGACY_ID = 12345
    const TOTAL_AMOUNT = '1'

    const {
      renderResult: { getByText, getByTestId }
    } = arrangeTest({
      companyLegacyId: COMPANY_LEGACY_ID,
      invoices: { totalAmount: TOTAL_AMOUNT },
      overdueInvoices: { totalCount: 1 }
    })

    expect(getByText('Revenue')).toBeInTheDocument()
    expect(mockFormatAmount).toHaveBeenCalledWith({ amount: TOTAL_AMOUNT })
    expect(getBillingInvoicesPath).toHaveBeenCalledWith({
      'badges[company_ids]': [COMPANY_LEGACY_ID]
    })
    expect(getByTestId('overdue-invoices-icon')).toBeInTheDocument()
  })

  it('should not render if invoices is null (unauthorized)', () => {
    const {
      renderResult: { queryByText }
    } = arrangeTest({
      companyLegacyId: 12345,
      invoices: null,
      overdueInvoices: null
    })

    expect(queryByText('Revenue')).not.toBeInTheDocument()
  })

  it('should not render icon and tooltip without overdueInvoices', () => {
    const {
      renderResult: { queryByTestId }
    } = arrangeTest({
      companyLegacyId: 12345,
      invoices: { totalAmount: '1000' },
      overdueInvoices: { totalCount: 0 }
    })

    expect(queryByTestId('overdue-invoices-icon')).not.toBeInTheDocument()
  })
})
