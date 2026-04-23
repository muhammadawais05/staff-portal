import { shouldShowPortfolio } from '../should-show-portfolio'

describe('shouldShowPortfolio', () => {
  it('returns true if provided talentType is designer or finance expert', () => {
    expect(shouldShowPortfolio('Designer')).toBe(true)
    expect(shouldShowPortfolio('FinanceExpert')).toBe(true)
  })

  it('returns false if provided talentType is not designer or finance expert', () => {
    expect(shouldShowPortfolio('Developer')).toBe(false)
  })
})
