import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import NotesList from '.'
import { useGetNotes } from '../../data'

jest.mock('../../data')
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: () => [jest.fn()]
}))
jest.mock('../NotesContainer')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')

const render = (props: ComponentProps<typeof NotesList>) =>
  renderComponent(<NotesList {...props} />)

describe('ConsolidatedInvoices', () => {
  describe('when no data returned', () => {
    it('default render', () => {
      useGetNotes.mockReturnValue({
        data: null,
        error: false,
        loading: false
      })
      const { container } = render({
        nodeId: 'abc123'
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when data returned', () => {
    it('default render', () => {
      useGetNotes.mockReturnValue({
        data: fixtures.MockNotes,
        error: false,
        loading: false
      })
      const { container } = render({
        nodeId: 'abc123'
      })

      expect(container).toMatchSnapshot()
    })
  })
})
