import { useQuery } from '@apollo/client'
import fixtures from '@staff-portal/billing/src/_fixtures'

import { useGetNotification } from '.'

jest.mock('@apollo/client')

describe('Email Status Panel data helper', () => {
  describe('when no error returns', () => {
    describe('when data returns', () => {
      describe('when loading true returns', () => {
        it('Returns data', () => {
          ;(useQuery as jest.Mock).mockReturnValue({
            data: null,
            error: null,
            loading: true
          })

          expect(useGetNotification('abc123')).toEqual({
            data: undefined,
            error: null,
            loading: true,
            initialLoading: true,
            refetch: undefined
          })
        })
      })

      describe('when loading false returns', () => {
        it('Returns data', () => {
          ;(useQuery as jest.Mock).mockReturnValue({
            data: { node: fixtures.MockNotifications },
            error: null,
            loading: false
          })

          expect(useGetNotification('abc123')).toEqual({
            data: fixtures.MockNotifications,
            error: null,
            loading: false,
            initialLoading: false,
            refetch: undefined
          })
        })
      })
    })
  })
})
