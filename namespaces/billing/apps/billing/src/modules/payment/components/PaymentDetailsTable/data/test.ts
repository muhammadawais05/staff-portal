import fixtures from '@staff-portal/billing/src/_fixtures'

import { useGetPaymentDetailsTableQuery } from './getPaymentDetailsTable.graphql.types'
import { useGetPaymentDetailsTable } from '.'

jest.mock('./getPaymentDetailsTable.graphql.types')

describe('Payment Details page data helper', () => {
  describe('when loading true returns', () => {
    it('Returns data', () => {
      useGetPaymentDetailsTableQuery.mockReturnValue({
        data: null,
        error: null,
        loading: true
      })

      expect(useGetPaymentDetailsTable('abc123')).toEqual({
        data: undefined,
        error: null,
        loading: true,
        refetch: undefined
      })
    })
  })

  describe('when loading false returns', () => {
    it('Returns data', () => {
      useGetPaymentDetailsTableQuery.mockReturnValue({
        data: { node: fixtures.MockPayment },
        error: null,
        loading: false
      })

      expect(useGetPaymentDetailsTable('abc123')).toEqual({
        data: fixtures.MockPayment,
        error: null,
        loading: false,
        refetch: undefined
      })
    })
  })
})
