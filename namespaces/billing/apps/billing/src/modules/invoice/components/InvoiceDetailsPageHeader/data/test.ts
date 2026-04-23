import fixtures from '@staff-portal/billing/src/_fixtures'

import { useGetInvoiceDetailsHeaderQuery } from './getInvoiceDetailsHeader.graphql.types'
import { useGetInvoiceDetailsHeader } from '.'

jest.mock('./getInvoiceDetailsHeader.graphql.types')

describe('Payment Details page data helper', () => {
  describe('when loading true returns', () => {
    it('Returns data', () => {
      useGetInvoiceDetailsHeaderQuery.mockReturnValue({
        data: null,
        error: null,
        loading: true
      })

      expect(useGetInvoiceDetailsHeader('abc123')).toEqual({
        data: undefined,
        error: null,
        loading: true,
        refetch: undefined
      })
    })
  })

  describe('when loading false returns', () => {
    it('Returns data', () => {
      useGetInvoiceDetailsHeaderQuery.mockReturnValue({
        data: { node: fixtures.MockInvoice },
        error: null,
        loading: false
      })

      expect(useGetInvoiceDetailsHeader('abc123')).toEqual({
        data: fixtures.MockInvoice,
        error: null,
        loading: false,
        refetch: undefined
      })
    })
  })
})
