import fixtures from '@staff-portal/billing/src/_fixtures'

import { useGetDocumentNoteQuery } from './getDocumentNote.graphql.types'
import { useGetDocumentNote } from '.'

jest.mock('./getDocumentNote.graphql.types')

describe('editDocumentNote helper', () => {
  describe('when loading true returns', () => {
    it('Returns data', () => {
      useGetDocumentNoteQuery.mockReturnValue({
        data: null,
        error: null,
        loading: true
      })

      expect(useGetDocumentNote('abc123')).toEqual({
        data: undefined,
        error: null,
        loading: true,
        refetch: undefined
      })
    })
  })

  describe('when loading false returns', () => {
    it('Returns data', () => {
      useGetDocumentNoteQuery.mockReturnValue({
        data: { node: fixtures.MockInvoice },
        error: null,
        loading: false
      })

      expect(useGetDocumentNote('abc123')).toEqual({
        data: fixtures.MockInvoice,
        error: null,
        loading: false,
        refetch: undefined
      })
    })
  })
})
