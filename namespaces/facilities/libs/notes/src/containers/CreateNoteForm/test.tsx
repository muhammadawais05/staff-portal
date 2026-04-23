import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { NoteFormType } from '../../types'
import CreateNoteForm from './CreateNoteForm'
import { useCreateNote } from './data'

jest.mock('./data', () => ({
  __esModule: true,
  useCreateNote: jest.fn()
}))

jest.mock('../../hooks/use-note-notifications')

const mockedGetForm = jest.fn()

jest.mock('@staff-portal/forms', () => ({
  usePersistentForm: jest.fn(),
  usePersistentFormContext: () => ({
    getForm: mockedGetForm,
    setForm: jest.fn()
  })
}))

const SUBMIT_TEXT = 'Create New Note'

const mockReturnValues = (note?: NoteFormType) => {
  const mockedUseCreateNote = useCreateNote as jest.Mock

  mockedUseCreateNote.mockReturnValue([
    () => ({
      data: {
        createNote: {
          success: true
        }
      }
    }),
    { loading: false }
  ])

  mockedGetForm.mockReturnValue(note)
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <CreateNoteForm
        nodeId='VjEtVGFsZW50LTE4OTI1NTQ='
        notableTitle='Awesome Talent'
        submitText={SUBMIT_TEXT}
        onClose={() => {}}
      />
    </TestWrapper>
  )

describe('CreateNoteForm', () => {
  it('submit the create note form', async () => {
    mockReturnValues()
    arrangeTest()

    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'note title' }
    })

    fireEvent.change(
      screen.getByPlaceholderText('Notes, details or red flags'),
      {
        target: { value: 'note comment' }
      }
    )

    fireEvent.click(screen.getByText(SUBMIT_TEXT))

    expect(await screen.findByText('Note has been added.')).toBeInTheDocument()
  })

  it('displays data from the unsaved note', async () => {
    const NOTE_TITLE = 'Title from storage'
    const NOTE_COMMENT = 'Comment from storage'
    const FILE_NAME = 'file.pdf'
    const FILE = [{ file: new File(['file content'], FILE_NAME) }]

    mockReturnValues({
      noteTitle: NOTE_TITLE,
      comment: NOTE_COMMENT,
      attachment: FILE
    })
    arrangeTest()

    expect(screen.getByText(NOTE_COMMENT)).toBeInTheDocument()
    expect(await screen.findByText(FILE_NAME)).toBeInTheDocument()
  })
})
