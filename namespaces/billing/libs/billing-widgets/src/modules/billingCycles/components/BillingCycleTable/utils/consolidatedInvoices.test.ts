import fixtures from '@staff-portal/billing/src/_fixtures'

import { consolidateBillingCycles } from './consolidatedInvoices'

describe('#consolidateBillingCycles', () => {
  it('given an array of processed billing cycles, it mutates the array to group cycles with matching consolidated invoice, on a grouping parent cycle', () => {
    const mockProcessedBillingCycles = fixtures.MockProcessedBillingCycles

    consolidateBillingCycles(mockProcessedBillingCycles)

    expect(mockProcessedBillingCycles).toEqual(
      fixtures.MockConsolidatedBillingCycles
    )
  })
})
