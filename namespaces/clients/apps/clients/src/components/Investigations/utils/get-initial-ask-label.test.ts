import { getInitialAskLabel } from './get-initial-ask-label'

describe('getInitialAskLabel', () => {
  describe('when paymentResolutionType is Refund', () => {
    it('returns label "refund" keyword', () => {
      expect(getInitialAskLabel('Refund')).toBe('Initial refund ask')
    })
  })

  describe('when paymentResolutionType is not Refund', () => {
    it.each(['Credit', 'Void'])(
      'returns label "credit" keyword',
      paymentResolutionType => {
        expect(getInitialAskLabel(paymentResolutionType)).toBe(
          'Initial credit ask'
        )
      }
    )
  })
})
