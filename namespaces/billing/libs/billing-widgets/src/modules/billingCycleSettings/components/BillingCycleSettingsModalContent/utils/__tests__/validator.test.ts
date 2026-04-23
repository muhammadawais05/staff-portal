import validator from '../validator'

describe('#validator', () => {
  describe('when billing cycle is `SemiMonthly`', () => {
    describe('when `semiMonthlyPaymentTalentAgreement` is `true`', () => {
      it('return proper `FormError`', () => {
        const values = {
          currentCycleStartDate: '2015-05-05',
          semiMonthlyPaymentTalentAgreement: true
        }
        const changes = {
          billCycle: 'SEMI_MONTHLY',
          currentCycleEndDate: '2015-05-15'
        }

        expect(validator(values)(changes)).toEqual({})
      })
    })

    describe('when `semiMonthlyPaymentTalentAgreement` is `false`', () => {
      it('return proper `FormError`', () => {
        const values = {
          currentCycleStartDate: '2015-05-05',
          semiMonthlyPaymentTalentAgreement: false
        }
        const changes = {
          billCycle: 'SEMI_MONTHLY',
          currentCycleEndDate: '2015-05-15'
        }

        expect(validator(values)(changes)).toEqual({
          billCycle: ''
        })
      })
    })
  })

  describe('when `isBillingCycleTooLong` is `true`', () => {
    it('return proper `FormError`', () => {
      const values = {
        currentCycleStartDate: '2015-05-05',
        semiMonthlyPaymentTalentAgreement: true
      }
      const changes = {
        billCycle: 'SEMI_MONTHLY',
        currentCycleEndDate: '2015-06-25'
      }

      expect(validator(values)(changes)).toEqual({
        currentCycleEndDate: ''
      })
    })
  })

  describe('when `isBillingCycleTooLong` is `false`', () => {
    it('return proper `FormError`', () => {
      const values = {
        currentCycleStartDate: '2015-05-05',
        semiMonthlyPaymentTalentAgreement: false
      }
      const changes = {
        billCycle: 'SEMI_MONTHLY',
        currentCycleEndDate: '2015-05-15'
      }

      expect(validator(values)(changes)).toEqual({
        billCycle: ''
      })
    })
  })
})
