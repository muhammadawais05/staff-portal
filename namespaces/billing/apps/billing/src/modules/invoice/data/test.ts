import fixtures from '@staff-portal/billing/src/_fixtures'

import { useGetConsolidatedInvoicesQuery } from './getConsolidatedInvoices.graphql.types'
import { useGetConsolidatedInvoices } from '.'

jest.mock('./getInvoicesList.graphql.types')
jest.mock('./getConsolidatedInvoices.graphql.types')

describe('Payment Task Card data helper', () => {
  describe('#useGetConsolidatedInvoicesQuery', () => {
    describe('when loading true returns', () => {
      it('Returns data', () => {
        useGetConsolidatedInvoicesQuery.mockReturnValue({
          data: null,
          error: null,
          loading: true
        })

        expect(useGetConsolidatedInvoices('abc123')).toEqual({
          data: undefined,
          error: null,
          loading: true,
          refetch: undefined
        })
      })
    })

    describe('when loading false returns', () => {
      it('Returns data', () => {
        useGetConsolidatedInvoicesQuery.mockReturnValue({
          data: { node: fixtures.MockPayment },
          error: null,
          loading: false
        })

        expect(useGetConsolidatedInvoices('abc123')).toEqual({
          data: fixtures.MockPayment,
          error: null,
          loading: false,
          refetch: undefined
        })
      })
    })
  })
})
