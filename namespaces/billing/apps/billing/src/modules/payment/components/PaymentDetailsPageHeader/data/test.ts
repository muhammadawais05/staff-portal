import fixtures from '@staff-portal/billing/src/_fixtures'

import { useGetPaymentDetailsHeaderQuery } from './getPaymentDetailsHeader.graphql.types'
import { useGetPaymentDetailsHeader } from '.'

jest.mock('./getPaymentDetailsHeader.graphql.types')

describe('Payment Details page data helper', () => {
  describe('when loading true returns', () => {
    it('Returns data', () => {
      useGetPaymentDetailsHeaderQuery.mockReturnValue({
        data: null,
        error: null,
        loading: true
      })

      expect(useGetPaymentDetailsHeader('abc123')).toEqual({
        data: undefined,
        error: null,
        loading: true,
        refetch: undefined
      })
    })
  })

  describe('when loading false returns', () => {
    it('Returns data', () => {
      useGetPaymentDetailsHeaderQuery.mockReturnValue({
        data: { node: fixtures.MockPayment },
        error: null,
        loading: false
      })

      expect(useGetPaymentDetailsHeader('abc123')).toEqual({
        data: fixtures.MockPayment,
        error: null,
        loading: false,
        refetch: undefined
      })
    })
  })
})
