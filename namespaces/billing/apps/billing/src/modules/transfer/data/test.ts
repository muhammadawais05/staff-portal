import { useQuery } from '@apollo/client'
import fixtures from '@staff-portal/billing/src/_fixtures'

import { useGetTransfers, useGetTransfer } from '.'

jest.mock('@apollo/client')

describe('Transfers data helper', () => {
  describe('#useGetTransfers', () => {
    describe('when no error returns', () => {
      describe('when data returns', () => {
        describe('when loading true returns', () => {
          it('Returns data', () => {
            ;(useQuery as jest.Mock).mockReturnValue({
              data: null,
              error: null,
              loading: true
            })

            expect(useGetTransfers('abc123')).toEqual({
              data: undefined,
              error: null,
              initialLoading: true,
              loading: true,
              refetch: undefined
            })
          })
        })

        describe('when loading false returns', () => {
          it('Returns data', () => {
            ;(useQuery as jest.Mock).mockReturnValue({
              data: { node: fixtures.MockInvoice },
              error: null,
              loading: false
            })

            expect(useGetTransfers('abc123')).toEqual({
              data: fixtures.MockInvoice,
              error: null,
              initialLoading: false,
              loading: false,
              refetch: undefined
            })
          })
        })
      })
    })
  })

  describe('#useGetTransfer', () => {
    describe('when no error returns', () => {
      describe('when data returns', () => {
        describe('when loading true returns', () => {
          it('Returns data', () => {
            ;(useQuery as jest.Mock).mockReturnValue({
              data: null,
              error: null,
              loading: true
            })

            expect(useGetTransfer('abc123')).toEqual({
              data: undefined,
              error: null,
              initialLoading: true,
              loading: true,
              refetch: undefined
            })
          })
        })

        describe('when loading false returns', () => {
          it('Returns data', () => {
            ;(useQuery as jest.Mock).mockReturnValue({
              data: { node: fixtures.MockTransfer },
              error: null,
              loading: false
            })

            expect(useGetTransfer('abc123')).toEqual({
              data: fixtures.MockTransfer,
              error: null,
              initialLoading: false,
              loading: false,
              refetch: undefined
            })
          })
        })
      })
    })
  })
})
