import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingTableFooter from '.'

const render = (props: ComponentProps<typeof BillingTableFooter>) =>
  renderComponent(
    <table>
      <BillingTableFooter {...props} />
    </table>
  )

describe('BillingTableFooter', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      colSpan: 6,
      hasHours: true,
      hasTalentTotals: false,
      isCondensed: true,
      totals: {
        totalCreditsCommissions: 99,
        totalCreditsCompany: 45,
        totalCreditsTalent: 155,
        totalDebitsCommissions: 78,
        totalDebitsCompany: 55,
        totalDebitsTalent: 65,
        totalHours: 135,
        totalPaidCommissions: 12,
        totalPaidCompany: 1255,
        totalPaidTalent: 15
      }
    })

    expect(queryByTestId('total-paid')).toContainHTML('135')
    expect(queryByTestId('total-paid-commissions')).toContainHTML('$12.00')
    expect(queryByTestId('total-debits-commissions')).toContainHTML('$78.00')
    expect(queryByTestId('total-credits-commissions')).toContainHTML('$99.00')
  })

  it('with null values', () => {
    const { queryByTestId } = render({
      hasHours: false,
      hasTalentTotals: false,
      isCondensed: true,
      totals: {
        totalCreditsCommissions: undefined,
        totalCreditsCompany: undefined,
        totalCreditsTalent: undefined,
        totalDebitsCommissions: undefined,
        totalDebitsCompany: undefined,
        totalDebitsTalent: undefined,
        totalHours: undefined,
        totalPaidCommissions: undefined,
        totalPaidCompany: undefined,
        totalPaidTalent: undefined
      }
    })

    expect(queryByTestId('total-paid')).toBeNull()
    expect(queryByTestId('total-paid-company')).toContainHTML('$0.00')
    expect(queryByTestId('total-debits-company')).toContainHTML('$0.00')
    expect(queryByTestId('total-credits-company')).toContainHTML('$0.00')
  })

  it('no hours, talent totals', () => {
    const { queryByTestId } = render({
      colSpan: 1,
      hasHours: false,
      hasTalentTotals: true,
      isCondensed: false,
      totals: {
        totalCreditsCommissions: 99,
        totalCreditsCompany: 45,
        totalCreditsTalent: 155,
        totalDebitsCommissions: 78,
        totalDebitsCompany: 55,
        totalDebitsTalent: 65,
        totalPaidCommissions: 12,
        totalPaidCompany: 1255,
        totalPaidTalent: 15
      }
    })

    expect(queryByTestId('total-paid')).toBeNull()
    expect(queryByTestId('total-paid-talent')).toContainHTML('$15.00')
    expect(queryByTestId('total-debits-talent')).toContainHTML('$65.00')
    expect(queryByTestId('total-credits-talent')).toContainHTML('$155.00')
  })

  it('no hours, no talent totals', () => {
    const { queryByTestId } = render({
      hasHours: false,
      hasTalentTotals: false,
      isCondensed: false,
      totals: {
        totalCreditsCommissions: 99,
        totalCreditsCompany: 45,
        totalCreditsTalent: 155,
        totalDebitsCommissions: 78,
        totalDebitsCompany: 55,
        totalDebitsTalent: 65,
        totalPaidCommissions: 12,
        totalPaidCompany: 1255,
        totalPaidTalent: 15
      }
    })

    expect(queryByTestId('total-paid')).toBeNull()
    expect(queryByTestId('total-paid-talent')).toBeNull()
    expect(queryByTestId('total-debits-talent')).toBeNull()
    expect(queryByTestId('total-credits-talent')).toBeNull()
  })
})
