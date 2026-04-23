import { InvestigationReason } from '@staff-portal/graphql/staff'

import { getInvestigationTitle } from './get-investigation-title'

describe('getInvestigationTitle', () => {
  it('returns titleized reason', () => {
    expect(getInvestigationTitle(InvestigationReason.PAYMENT_PROBLEM)).toBe(
      'Payment problems'
    )
  })
})
