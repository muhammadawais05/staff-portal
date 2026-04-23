import fixtures from '@staff-portal/billing/src/_fixtures'

import { useGetPaymentTaskCardQuery } from './getPaymentTaskCard.graphql.types'
import { useGetPaymentTaskCard } from '.'

jest.mock('./getPaymentTaskCard.graphql.types')

describe('Payment Task Card data helper', () => {
  describe('when loading true returns', () => {
    it('Returns data', () => {
      useGetPaymentTaskCardQuery.mockReturnValue({
        data: null,
        error: null,
        loading: true
      })

      expect(useGetPaymentTaskCard('abc123')).toEqual({
        data: undefined,
        error: null,
        loading: true
      })
    })
  })

  describe('when loading false returns', () => {
    it('Returns data', () => {
      useGetPaymentTaskCardQuery.mockReturnValue({
        data: { node: fixtures.MockPayment },
        error: null,
        loading: false
      })

      expect(useGetPaymentTaskCard('abc123')).toEqual({
        data: fixtures.MockPayment,
        error: null,
        loading: false
      })
    })
  })
})
