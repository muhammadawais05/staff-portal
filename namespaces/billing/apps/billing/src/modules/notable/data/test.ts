import fixtures from '@staff-portal/billing/src/_fixtures'

import { useGetNotesQuery } from './getNotes.graphql.types'
import { useGetNotes } from '.'

jest.mock('./getNotes.graphql.types')

describe('Notable data', () => {
  describe('when data returns', () => {
    describe('when loading true returns', () => {
      it('Returns data', () => {
        useGetNotesQuery.mockReturnValue({
          data: null,
          error: null,
          loading: true
        })

        expect(useGetNotes('abc123')).toEqual({
          data: undefined,
          error: null,
          loading: true,
          refetch: undefined
        })
      })
    })

    describe('when loading false returns', () => {
      it('Returns data', () => {
        useGetNotesQuery.mockReturnValue({
          data: { node: fixtures.MockNotes },
          error: null,
          loading: false
        })

        expect(useGetNotes('abc123')).toEqual({
          data: fixtures.MockNotes,
          error: null,
          loading: false,
          refetch: undefined
        })
      })
    })
  })
})
