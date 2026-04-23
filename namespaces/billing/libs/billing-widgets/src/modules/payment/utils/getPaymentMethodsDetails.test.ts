import getPaymentMethodsDetails from './getPaymentMethodsDetails'

const mockACHMethod = [
  { label: 'Routing number', value: '***** 6789' },
  { label: 'Account number', value: '***** 4321' }
]

const mockCreditCardMethod = [
  { label: 'Name', value: 'John Talbot' },
  { label: 'Number', value: '**** **** **** 1324' },
  { label: 'Expires', value: '12/2015' },
  { label: 'Type', value: 'MasterCard' }
]

const mockPayPalMethod = [
  { label: 'Business name', value: 'Toptal' },
  { label: 'Email', value: 'j.talbot@toptal.io' }
]

const mockWireMethod = [
  { label: 'Name on account', value: 'Wire Option Surname' },
  { label: 'Bank name', value: 'Wire Option Bank' }
]

describe('#getPaymentMethodsDetails', () => {
  describe('when account info list defined', () => {
    it('return a formatted list', () => {
      expect(
        getPaymentMethodsDetails([
          ...mockACHMethod,
          ...mockCreditCardMethod,
          ...mockPayPalMethod,
          ...mockWireMethod
        ])
      ).toEqual([
        { label: 'Routing number or SWIFT', value: '***** 6789' },
        { label: 'Account number', value: '***** 4321' },
        ...mockCreditCardMethod,
        ...mockPayPalMethod,
        ...mockWireMethod
      ])
    })
  })

  describe('when no account info list defined', () => {
    it('return empty list', () => {
      expect(getPaymentMethodsDetails()).toEqual([])
    })
  })
})
