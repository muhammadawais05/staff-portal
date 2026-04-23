import fixtures from '@staff-portal/billing/src/_fixtures'

import {
  processBillingCycles,
  calculateTotalsWithHours
} from './processBillingCycles'

const mockBillingCycles =
  fixtures.MockBillingCyclesTable.node.billingCycles.nodes

const mockEngagementDocuments =
  fixtures.MockBillingCyclesTable.engagementDocuments

const mockProcessedBillingCycles = fixtures.MockProcessedBillingCycles

describe('#processBillingCycles', () => {
  it('given an array of billing cycles and a set of engagement documents, returns and array of cycles each with their associated engagement documents', () => {
    const actual = processBillingCycles(
      mockBillingCycles,
      mockEngagementDocuments
    )

    expect(actual).toMatchObject(mockProcessedBillingCycles)
  })
})

describe('#calculateTotalsWithHours', () => {
  it('given an array of billing cycles and a set of engagement documents, returns the totals for amounts and hours', () => {
    const actual = calculateTotalsWithHours(
      mockProcessedBillingCycles,
      mockEngagementDocuments
    )
    const expected = {
      totalCreditsCommissions: 0,
      totalCreditsCompany: 1520,
      totalCreditsTalent: 400,
      totalDebitsCommissions: 0,
      totalDebitsCompany: 760,
      totalDebitsTalent: 800,
      totalHours: 1984,
      totalPaidCommissions: 7543.799999999999,
      totalPaidCompany: 155040,
      totalPaidTalent: 93392
    }

    expect(actual).toMatchObject(expected)
  })
})
