import fixtures from '@staff-portal/billing/src/_fixtures'

import { useGetInvoiceDetailsTableQuery } from './getInvoiceDetailsTable.graphql.types'
import { useGetInvoiceDetailsTable } from './useGetInvoiceDetailsTable'

jest.mock('./getInvoiceDetailsTable.graphql.types')

describe('#useGetInvoiceDetailsTable', () => {
  describe('when loading true returns', () => {
    it('Returns data', () => {
      useGetInvoiceDetailsTableQuery.mockReturnValue({
        data: null,
        error: null,
        loading: true
      })

      expect(useGetInvoiceDetailsTable('abc123')).toEqual({
        data: undefined,
        error: null,
        loading: true,
        refetch: undefined
      })
    })
  })

  describe('when loading false returns', () => {
    it('Returns data', () => {
      useGetInvoiceDetailsTableQuery.mockReturnValue({
        data: { node: fixtures.MockInvoice },
        error: null,
        loading: false
      })

      expect(useGetInvoiceDetailsTable('abc123')).toEqual({
        data: fixtures.MockInvoice,
        error: null,
        loading: false,
        refetch: undefined
      })
    })
  })
})
