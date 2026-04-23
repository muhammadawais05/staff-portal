import getCommissionDetailedListReferralLabel from './getCommissionDetailedListReferralLabel'

describe('#getCommissionDetailedListReferralLabel', () => {
  describe('when referral commission is undefined', () => {
    it('returns label without commission', () => {
      expect(getCommissionDetailedListReferralLabel(undefined)).toBe('Referrer')
    })
  })

  describe('when referral commission is defined', () => {
    describe('when referral commission is a amount based commission', () => {
      it('returns label with amount commission', () => {
        expect(
          getCommissionDetailedListReferralLabel({
            ratePercent: '17'
          })
        ).toBe('Referrer (17.0%)')
      })
    })

    describe('when referral commission is a rate based commission', () => {
      it('returns label with rate commission', () => {
        expect(
          getCommissionDetailedListReferralLabel({
            commission: '2000.0'
          })
        ).toBe('Referrer ($2,000.00)')
      })
    })
  })
})
