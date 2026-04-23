import { paymentsHoldButtonText } from '.'

describe('paymentsHoldButtonText', () => {
  it('gives create copy', () => {
    expect(paymentsHoldButtonText(undefined)).toBe('Hold Payments')
    expect(paymentsHoldButtonText('')).toBe('Hold Payments')
  })

  it('gives update copy', () => {
    expect(paymentsHoldButtonText('something')).toBe(
      'Update Hold on Payments'
    )
  })
})
