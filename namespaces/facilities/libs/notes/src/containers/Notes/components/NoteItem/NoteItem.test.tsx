import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { NoteStatus, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { NoteFragment } from '../../../../data/note-fragment'
import NoteItem from './NoteItem'

const mockedGetForm = jest.fn()

jest.mock('@staff-portal/forms', () => ({
  usePersistentForm: jest.fn(),
  usePersistentFormContext: () => ({
    getForm: mockedGetForm
  })
}))

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: () => ({ showModal: jest.fn() })
}))

jest.mock('../../../Note/components/NoteContent', () => ({
  __esModule: true,
  default: () => <div data-testid='note-content' />
}))

const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

jest.mock('../EditNoteForm/data', () => ({
  __esModule: true,
  useUpdateNote: () => [
    () => ({
      data: {
        updateNote: {
          success: true
        }
      }
    }),
    { loading: false }
  ]
}))

jest.mock('./data', () => ({
  __esModule: true,
  useGetNote: () => ({
    note: {
      answers: { nodes: [] },
      softSkillRatings: { nodes: [] },
      id: '1',
      title: 'Edit Note'
    },
    getNote: jest.fn(),
    loading: false
  })
}))

jest.mock('../../../../hooks/use-note-notifications')

const arrangeTest = ({
  open = false,
  onClose
}: Partial<{
  open?: boolean
  onClose: () => void
}> = {}) => {
  const note: NoteFragment = {
    id: '1',
    answers: {
      nodes: []
    },
    createdAt: '',
    newSalesCall: false,
    checklistSalesCall: false,
    operations: {
      removeNote: OPERATION,
      removeNoteAttachment: OPERATION,
      updateNote: OPERATION
    },
    softSkillRatings: {
      nodes: []
    },
    status: NoteStatus.ACTIVE,
    title: '',
    updatedAt: '',
    __typename: 'Note'
  }

  return render(
    <TestWrapper>
      <NoteItem open={open} note={note} onClose={onClose} />
    </TestWrapper>
  )
}

describe('NoteItem', () => {
  it('renders the note content', () => {
    arrangeTest()

    expect(screen.getByTestId('note-content')).toBeInTheDocument()
  })

  it('shows and submit the edit form', async () => {
    const onClose = jest.fn()

    arrangeTest({ open: true, onClose })

    expect(await screen.findByPlaceholderText('Title')).toBeInTheDocument()
    expect(screen.queryByTestId('note-content')).not.toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'Title' }
    })

    fireEvent.change(
      screen.getByPlaceholderText('Notes, details or red flags'),
      {
        target: { value: 'Comment' }
      }
    )

    fireEvent.click(screen.getByText('Save Note'))

    await waitFor(() => expect(onClose).toHaveBeenCalled())
  })

  it('displays data from the persistent note', async () => {
    const FILE_NAME = 'file.pdf'
    const FILE = [
      { file: new File(['file content'], FILE_NAME), name: FILE_NAME }
    ]

    mockedGetForm.mockReturnValue({ title: 'Note title', attachment: FILE })

    arrangeTest({ open: true })

    expect(await screen.findByPlaceholderText('Title')).toBeInTheDocument()
    expect(screen.getByText(FILE_NAME)).toBeInTheDocument()
  })
})
