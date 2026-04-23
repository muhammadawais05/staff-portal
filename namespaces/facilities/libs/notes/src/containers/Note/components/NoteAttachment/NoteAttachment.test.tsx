import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import NoteAttachment from './NoteAttachment'
import RemoveNoteAttachmentModal from '../RemoveNoteAttachmentModal/RemoveNoteAttachmentModal'

const ATTACHMENT_IDENTIFIER = 'attachment identifier'

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
      <NoteAttachment
        noteId='test-note-id'
        attachment={{
          url: 'test-url',
          webResource: {
            url: 'test-url',
            text: ATTACHMENT_IDENTIFIER
          }
        }}
        removeNoteAttachmentOperation={
          {
            callable,
            messages: []
          } as Operation
        }
      />
    </TestWrapper>
  )

describe('NoteAttachment', () => {
  it('render note attachment', () => {
    mockReturnValues()
    renderComponent()

    expect(
      screen.getByText(`Download ${ATTACHMENT_IDENTIFIER}`)
    ).toBeInTheDocument()

    expect(
      screen.getByTestId('note-attachment-delete-button')
    ).toBeInTheDocument()

    expect(mockUseModal).toHaveBeenCalledWith(RemoveNoteAttachmentModal, {
      fileName: 'attachment identifier',
      noteId: 'test-note-id'
    })
  })

  it('delete attachment button should not be visible', () => {
    mockReturnValues()
    renderComponent(OperationCallableTypes.HIDDEN)

    expect(
      screen.queryByTestId('note-attachment-delete-button')
    ).not.toBeInTheDocument()
  })

  it('delete attachment should return success message', async () => {
    mockReturnValues()
    renderComponent()

    fireEvent.click(screen.getByTestId('note-attachment-delete-button'))

    expect(mockShowModal).toHaveBeenCalled()
  })
})
