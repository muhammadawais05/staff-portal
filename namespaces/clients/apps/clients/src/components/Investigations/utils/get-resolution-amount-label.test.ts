import { getResolutionAmountLabel } from './get-resolution-amount-label'

describe('getResolutionAmountLabel', () => {
  describe('when paymentResolutionType is Void', () => {
    it('returns label "refund" keyword', () => {
      expect(getResolutionAmountLabel('Payment')).toBe(
        'Payment resolution amount'
      )
    })
  })

  describe('when paymentResolutionType is not Void', () => {
    it.each(['Credit', 'Refund'])(
      'returns label with %s keyword',
      paymentResolutionType => {
        expect(getResolutionAmountLabel(paymentResolutionType)).toBe(
          `${paymentResolutionType} resolution amount`
        )
      }
    )
  })
})
