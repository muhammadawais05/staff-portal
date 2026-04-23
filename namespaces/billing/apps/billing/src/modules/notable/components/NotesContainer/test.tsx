import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import NotesContainer from '.'

const render = (props: ComponentProps<typeof NotesContainer>) =>
  renderComponent(<NotesContainer {...props} />)

jest.mock('../NoteListItem')

describe('NotesContainer', () => {
  describe('when list is not empty', () => {
    it('renders Items state', () => {
      const { queryByTestId, getAllByTestId } = render({
        handleOnClick: jest.fn(),
        notes: fixtures.MockInvoice.notes
      })
      const EmptyListNotes = queryByTestId('NotesContainer-empty')

      expect(EmptyListNotes).toBeNull()
      expect(getAllByTestId('NotesContainerItem')).toHaveLength(4)
    })
  })

  describe('when list is empty', () => {
    it('renders Empty state', () => {
      const { queryByTestId } = render({
        handleOnClick: jest.fn(),
        notes: {
          nodes: [],
          operations: {
            createNote: {
              callable: 'DISABLED'
            }
          }
        }
      })
      const EmptyListNotes = queryByTestId('NotesContainer-empty')

      expect(EmptyListNotes).not.toBeNull()
    })
  })

  describe('when operation is missing', () => {
    it('does not render the button at all', () => {
      const { queryByTestId } = render({
        handleOnClick: jest.fn(),
        notes: {
          operations: undefined,
          nodes: []
        }
      })
      const button = queryByTestId('NotesContainer-addNote-button')

      expect(button).toBeNull()
    })
  })

  describe('when the operation is Enabled', () => {
    it('renders the Add Note button with proper details', () => {
      const { getByTestId } = render({
        handleOnClick: jest.fn(),
        notes: {
          operations: {
            createNote: {
              callable: OperationCallableTypes.ENABLED,
              messages: ['']
            }
          },
          nodes: []
        }
      })
      const button = getByTestId('NotesContainer-addNote-button')

      expect(button).toBeEnabled()
      expect(button).toContainHTML('Add Note')
    })
  })

  describe('when the operation is Disabled', () => {
    it('renders the Add Note button as disabled', () => {
      const { getByTestId } = render({
        handleOnClick: jest.fn(),
        notes: {
          operations: {
            createNote: {
              callable: OperationCallableTypes.DISABLED,
              messages: ['']
            }
          },
          nodes: []
        }
      })
      const button = getByTestId('NotesContainer-addNote-button')

      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('when the operation is Hidden', () => {
    it('does not render the button at all', () => {
      const { queryByTestId } = render({
        handleOnClick: jest.fn(),
        notes: {
          operations: {
            createNote: {
              callable: OperationCallableTypes.HIDDEN,
              messages: ['']
            }
          },
          nodes: []
        }
      })
      const button = queryByTestId('NotesContainer-addNote-button')

      expect(button).toBeNull()
    })
  })
})
