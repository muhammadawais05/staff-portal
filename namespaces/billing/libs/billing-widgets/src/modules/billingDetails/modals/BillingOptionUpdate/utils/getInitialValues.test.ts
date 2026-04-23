import fixtures from '@staff-portal/billing/src/_fixtures'

import { getInitialValues } from './getInitialValues'

describe('getInitialValues', () => {
  describe('when a billing option is Wire', () => {
    it('return name on account and bank name', () => {
      expect(
        getInitialValues(fixtures.MockClient.billingOptions.nodes[1])
      ).toMatchObject({
        nameOnAccount: 'Account name',
        bankName: 'Bank name'
      })
    })
  })

  describe('when a billing option is Paypal', () => {
    it('return business name and username', () => {
      expect(
        getInitialValues(fixtures.MockClient.billingOptions.nodes[2])
      ).toMatchObject({
        username: 'paypal@toptal.com',
        businessName: 'Paypal business name'
      })
    })
  })

  describe('when a billing option is not passed', () => {
    it('return an empty object', () => {
      expect(getInitialValues(undefined)).toMatchObject({})
    })
  })

  describe('when a billing option does not have any account information rows', () => {
    it('return an empty object', () => {
      expect(
        getInitialValues({
          ...fixtures.MockClient.billingOptions.nodes[2],
          accountInfo: undefined
        })
      ).toEqual({})
    })
  })
})
