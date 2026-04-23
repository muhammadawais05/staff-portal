import fixtures from '@staff-portal/billing/src/_fixtures'

import { useGetInvoiceTaskCardQuery } from './getInvoiceTaskCard.graphql.types'
import { useGetInvoiceTaskCard } from '.'

jest.mock('./getInvoiceTaskCard.graphql.types')

describe('Invoice Task Card data helper', () => {
  describe('when loading true returns', () => {
    it('Returns data', () => {
      useGetInvoiceTaskCardQuery.mockReturnValue({
        data: null,
        error: null,
        loading: true
      })

      expect(useGetInvoiceTaskCard('abc123')).toEqual({
        data: undefined,
        error: null,
        loading: true,
        refetch: undefined
      })
    })
  })

  describe('when loading false returns', () => {
    it('Returns data', () => {
      useGetInvoiceTaskCardQuery.mockReturnValue({
        data: { node: fixtures.MockInvoice },
        error: null,
        loading: false
      })

      expect(useGetInvoiceTaskCard('abc123')).toEqual({
        data: fixtures.MockInvoice,
        error: null,
        loading: false,
        refetch: undefined
      })
    })
  })
})
