import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React, { createRef } from 'react'
import {
  OperationCallableTypes,
  NoteQuestionCommentType,
  NoteQuestionKind
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  GetLazyOperationQuery,
  GetLazyOperationVariables,
  useGetLazyOperation
} from '@staff-portal/operations'
import { usePersistentFormContext } from '@staff-portal/forms'
import {
  NoteQuestionWithOptionsFragment,
  NoteOperationFragment
} from '@staff-portal/notes'

import { useAddJobMatchingNote } from './data'
import AddMatchingNote from '.'

jest.mock(
  '@staff-portal/operations/src/components/LazyOperation/data/get-lazy-operation/get-lazy-operation.gql',
  () => ({
    __esModule: true,
    useGetLazyOperation: jest.fn()
  })
)

jest.mock('@staff-portal/notes', () => ({
  ...jest.requireActual('@staff-portal/notes'),
  getPersistStorageKey: jest.fn(),
  CreateNoteForm: ({
    children,
    onSubmit
  }: {
    children?: string
    onSubmit: (data: unknown, callback: () => void) => void
  }) => (
    <div data-testid='create-note-form'>
      {children}
      <div onClick={() => onSubmit({}, () => {})}>Add Note</div>
    </div>
  )
}))

jest.mock('@staff-portal/forms', () => ({
  ...jest.requireActual('@staff-portal/forms'),
  __esModule: true,
  usePersistentFormContext: jest.fn()
}))

jest.mock('./data', () => ({
  __esModule: true,
  useAddJobMatchingNote: jest.fn()
}))

const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const mockReturnValues = (
  operation: NoteOperationFragment,
  isFormVisible = false
) => {
  const mockUseGetLazyOperation = useGetLazyOperation as jest.Mock
  const mockUsePersistentFormContext = usePersistentFormContext as jest.Mock
  const mockUseAddJobMatchingNote = useAddJobMatchingNote as jest.Mock

  mockUseGetLazyOperation.mockImplementation(
    (
      _: GetLazyOperationVariables,
      {
        onCompleted
      }: {
        onCompleted: (data: GetLazyOperationQuery) => void
      }
    ) => [
      () =>
        onCompleted({
          node: { operations: { addJobMatchingNote: operation } }
        }),
      {
        data: {
          loading: false,
          node: { operations: { addJobMatchingNote: operation } }
        }
      }
    ]
  )

  mockUsePersistentFormContext.mockImplementation(() => ({
    checkForm: () => isFormVisible
  }))

  mockUseAddJobMatchingNote.mockReturnValue([
    () => ({
      data: {
        logClientSalesCall: {
          success: true
        }
      }
    })
  ])
}

const questionsMock: NoteQuestionWithOptionsFragment[] = [
  {
    activeOptions: {
      nodes: [
        {
          id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxODMy',
          label:
            "No team. The client oversees the project but doesn't directly contribute",
          value:
            "No team. The client oversees the project but doesn't directly contribute"
        }
      ]
    },
    additionalCommentsHint: 'Add comment',
    commentType: NoteQuestionCommentType.LONG,
    group: { label: 'Questions' },
    hint: null,
    id: '24342sggdsgregerer',
    kind: NoteQuestionKind.RADIO_BUTTONS,
    label: 'What is the structure of the team for this job?',
    required: true
  }
]

const arrangeTest = ({
  operation = OPERATION,
  isFormVisible = false
}: Partial<{
  operation: NoteOperationFragment
  isFormVisible: boolean
}> = {}) => {
  mockReturnValues(operation, isFormVisible)

  const containerRef = createRef<HTMLDivElement>()

  render(
    <TestWrapper>
      <AddMatchingNote
        jobId='vdsfstrter23423'
        operation={operation}
        questions={questionsMock}
        formContainer={containerRef}
        onComplete={() => {}}
        onOpenNoteForm={() => {}}
        onCloseNoteForm={() => {}}
      />

      <div ref={containerRef} />
    </TestWrapper>
  )
}

describe('AddMatchingNote', () => {
  it('hides the Add Matching Note button', () => {
    arrangeTest({
      operation: { callable: OperationCallableTypes.HIDDEN, messages: [] }
    })

    expect(screen.queryByText('Add Matching Note')).not.toBeInTheDocument()
  })

  it('shows the matching note form', async () => {
    arrangeTest()

    fireEvent.click(screen.getByText('Add Matching Note'))
    expect(await screen.findByTestId('create-note-form')).toBeInTheDocument()
  })

  it('shows persistent note', async () => {
    arrangeTest({ operation: OPERATION, isFormVisible: true })

    expect(await screen.findByTestId('create-note-form')).toBeInTheDocument()
  })

  it('triggers the add job matching note', async () => {
    arrangeTest()

    fireEvent.click(screen.getByText('Add Matching Note'))
    expect(await screen.findByTestId('create-note-form')).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.click(screen.getByText('Add Note'))
    })

    expect(useAddJobMatchingNote).toHaveBeenCalled()
  })
})
