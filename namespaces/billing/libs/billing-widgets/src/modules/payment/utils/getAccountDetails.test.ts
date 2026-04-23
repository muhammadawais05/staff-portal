import { PaymentOptionPaymentMethod } from '@staff-portal/graphql/staff'

import getAccountDetails from './getAccountDetails'

describe('#getAccountDetails', () => {
  describe('when `preferred` is `false`', () => {
    it('returns the proper text variant', () => {
      expect(
        getAccountDetails([
          {
            accountInfo: [],
            paymentMethod: PaymentOptionPaymentMethod.BANK_WIRE,
            preferred: false
          }
        ])
      ).toEqual([{ accountInfo: [], text: 'Bank Wire', value: 'BANK_WIRE' }])
    })
  })

  describe('when `preferred` is `true`', () => {
    it('returns the proper text variant', () => {
      expect(
        getAccountDetails([
          {
            accountInfo: [],
            paymentMethod: PaymentOptionPaymentMethod.BANK_WIRE,
            preferred: true
          }
        ])
      ).toEqual([
        { accountInfo: [], text: 'Bank Wire (preferred)', value: 'BANK_WIRE' }
      ])
    })
  })
})
