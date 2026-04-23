import fixtures from '@staff-portal/billing/src/_fixtures'

import { useGetPayModalInvoiceQuery } from './getPayModalInvoice.graphql.types'
import { useGetPayModalInvoice } from '.'

jest.mock('./getPayModalInvoice.graphql.types')

describe('Payment Details page data helper', () => {
  describe('when loading true returns', () => {
    it('Returns data', () => {
      useGetPayModalInvoiceQuery.mockReturnValue({
        data: null,
        error: null,
        loading: true
      })

      expect(useGetPayModalInvoice('abc123')).toEqual({
        data: null,
        error: null,
        loading: true,
        refetch: undefined
      })
    })
  })

  describe('when loading false returns', () => {
    it('Returns data', () => {
      useGetPayModalInvoiceQuery.mockReturnValue({
        data: { node: fixtures.MockInvoice },
        error: null,
        loading: false
      })

      expect(useGetPayModalInvoice('abc123')).toEqual({
        data: {
          node: {
            ...fixtures.MockInvoice
          }
        },
        error: null,
        loading: false,
        refetch: undefined
      })
    })
  })
})
