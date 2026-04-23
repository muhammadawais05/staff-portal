import getJobCommissionLabel from './get-job-commission-label'

describe('getJobCommissionLabel', () => {
  describe(`when 'referralCommission' is a 'string'`, () => {
    it(`returns type with that 'string'`, () => {
      expect(
        getJobCommissionLabel({ type: 'Type', referralCommission: 'suffix' })
      ).toMatch('Type (suffix)')
    })
  })

  describe(`when 'referralCommission' has 'fixed' type`, () => {
    it('returns type with price value', () => {
      expect(
        getJobCommissionLabel({
          type: 'Type',
          referralCommission: {
            commission: '20',
            __typename: 'FixedSourcingCommission'
          }
        })
      ).toMatch('Type ($20.00)')
    })
  })

  describe(`when 'referralCommission' has 'relative' type`, () => {
    it('returns type with percentage value', () => {
      expect(
        getJobCommissionLabel({
          type: 'Type',
          commissionsPot: 5,
          referralCommission: {
            ratePercent: '0.75',
            __typename: 'RelativeSourcingCommission'
          }
        })
      ).toMatch('Type (15%)')
    })
  })

  describe(`when 'referralCommission' has 'relative' type & there is no 'commissionsPot'`, () => {
    it('returns type', () => {
      expect(
        getJobCommissionLabel({
          type: 'Type',
          referralCommission: {
            ratePercent: '0.75',
            __typename: 'RelativeSourcingCommission'
          }
        })
      ).toMatch('Type')
    })
  })
})
