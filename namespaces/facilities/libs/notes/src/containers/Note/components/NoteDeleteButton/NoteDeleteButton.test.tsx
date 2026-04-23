import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import RemoveNoteModal from '../RemoveNoteModal/RemoveNoteModal'
import NoteDeleteButton from './NoteDeleteButton'

const NOTE_TITLE = 'test note'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const mockUseModal = useModal as jest.Mock
const mockShowModal = jest.fn()

const mockReturnValues = () => {
  mockUseModal.mockImplementation(() => ({ showModal: mockShowModal }))
}

const renderComponent = (
  callable: OperationCallableTypes = OperationCallableTypes.ENABLED
) =>
  render(
    <TestWrapper>
      <NoteDeleteButton
        noteId='test-note-id'
        title={NOTE_TITLE}
        removeNoteOperation={{ callable, messages: [] } as Operation}
      />
    </TestWrapper>
  )

describe('NoteDeleteButton', () => {
  it('render note delete button', () => {
    mockReturnValues()
    renderComponent()

    expect(screen.getByLabelText('Delete Note')).toBeInTheDocument()

    expect(mockUseModal).toHaveBeenCalledWith(RemoveNoteModal, {
      noteId: 'test-note-id',
      onDelete: undefined,
      title: NOTE_TITLE
    })
  })

  it('should not display the delete button', () => {
    mockReturnValues()
    renderComponent(OperationCallableTypes.HIDDEN)

    expect(screen.queryByLabelText('Delete Note')).not.toBeInTheDocument()
  })

  it('should display success message', async () => {
    mockReturnValues()
    renderComponent()

    fireEvent.click(screen.getByLabelText('Delete Note'))

    expect(mockShowModal).toHaveBeenCalled()
  })
})
