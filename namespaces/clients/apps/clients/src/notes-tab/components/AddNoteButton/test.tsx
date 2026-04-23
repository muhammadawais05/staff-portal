import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React, { createRef } from 'react'
import { useModal } from '@staff-portal/modals-service'
import {
  CompanyAction,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  GetLazyOperationQuery,
  GetLazyOperationVariables,
  useGetLazyOperation
} from '@staff-portal/operations'

import AddNoteButton from './AddNoteButton'
import {
  useCreateCommunicationClientNote,
  useCreateGeneralInformationClientNote,
  useGetCommunicationNoteCompanyActions
} from './data'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

jest.mock(
  '@staff-portal/operations/src/components/LazyOperation/data/get-lazy-operation/get-lazy-operation.gql',
  () => ({
    __esModule: true,
    useGetLazyOperation: jest.fn()
  })
)

jest.mock('@staff-portal/notes/src/containers/CreateNoteForm/data', () => ({
  useCreateNote: () => [jest.fn, { loading: false }]
}))

jest.mock('./data', () => ({
  __esModule: true,
  useCreateCommunicationClientNote: jest.fn(),
  useCreateGeneralInformationClientNote: jest.fn(),
  useGetCommunicationNoteCompanyActions: jest.fn()
}))

jest.mock('@staff-portal/notes/src/hooks/use-note-notifications')

const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const mockReturnValues = (operation = OPERATION) => {
  const mockUseGetLazyOperation = useGetLazyOperation as jest.Mock
  const mockUseCreateCommunicationClientNote =
    useCreateCommunicationClientNote as jest.Mock
  const mockUseCreateGeneralInformationClientNote =
    useCreateGeneralInformationClientNote as jest.Mock
  const mockUseGetCommunicationNoteCompanyActions =
    useGetCommunicationNoteCompanyActions as jest.Mock
  const useModalMock = useModal as jest.Mock

  useModalMock.mockReturnValue({ showModal: () => {} })

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
          node: {
            operations: { createGeneralInformationClientNote: operation }
          }
        }),
      {
        data: {
          loading: false,
          node: {
            operations: { createGeneralInformationClientNote: operation }
          }
        }
      }
    ]
  )

  mockUseCreateCommunicationClientNote.mockReturnValue([
    () => ({
      data: {
        createCommunicationClientNote: {
          success: true,
          errors: []
        }
      }
    }),
    { loading: false }
  ])

  mockUseCreateGeneralInformationClientNote.mockReturnValue([
    () => ({
      data: {
        createGeneralInformationClientNote: {
          success: true,
          errors: []
        }
      }
    }),
    { loading: false }
  ])

  mockUseGetCommunicationNoteCompanyActions.mockReturnValue({
    getCompanyActions: jest.fn(),
    companyActions: [CompanyAction.BAD_LEAD],
    loading: false
  })
}

const arrangeTest = (
  operation = OPERATION,
  onComplete: () => void = jest.fn()
) => {
  const containerRef = createRef<HTMLDivElement>()

  mockReturnValues(operation)

  return render(
    <TestWrapper>
      <AddNoteButton
        clientId='VjEtQ2xpZW50LTEwMDI1NA'
        clientName='Test Name'
        operation={operation}
        formContainer={containerRef}
        onComplete={onComplete}
      />

      <div ref={containerRef} />
    </TestWrapper>
  )
}

describe('AddNoteButton', () => {
  it('hides the add note button', () => {
    arrangeTest({ callable: OperationCallableTypes.HIDDEN, messages: [] })

    expect(screen.queryByText('Add Note')).not.toBeInTheDocument()
  })

  it('creates general information note', async () => {
    arrangeTest()

    fireEvent.click(screen.getByText('Add Note'))

    expect(await screen.findByText('General Information')).toBeInTheDocument()
    expect(screen.getByText('Client Communications')).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText(/Title/), {
      target: { value: 'title' }
    })

    fireEvent.change(
      screen.getByPlaceholderText(/Notes, details or red flags/),
      {
        target: { value: 'comment' }
      }
    )

    fireEvent.click(screen.getByTestId('submit-note-button'))

    expect(await screen.findByText('Note has been added.')).toBeInTheDocument()
  })
})
