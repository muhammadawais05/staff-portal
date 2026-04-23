import React, { createRef } from 'react'
import { fireEvent, render, screen, waitFor } from '@toptal/picasso/test-utils'
import { useModal } from '@staff-portal/modals-service'
import {
  OperationCallableTypes,
  VisualComplianceStatus
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  GetLazyOperationQuery,
  GetLazyOperationVariables,
  useGetLazyOperation
} from '@staff-portal/operations'
import { usePersistentFormContext } from '@staff-portal/forms'
import { NoteOperationFragment } from '@staff-portal/notes'
import { useCheckClientCompliance } from '@staff-portal/clients'

import { ClientStatus } from '../../../enums'
import { useGetLogSalesCallActionsData } from '../LogSalesCallActionsModal/data'
import { useGetClientDefaultNoteAnswers, useLogClientSalesCall } from './data'
import LogSalesCallButton from './LogSalesCallButton'

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
  usePersistentFormContext: jest.fn()
}))

jest.mock('./data', () => ({
  useGetClientDefaultNoteAnswers: jest.fn(),
  useLogClientSalesCall: jest.fn()
}))

jest.mock(
  '@staff-portal/clients/src/data/check-compliance/check-compliance.staff.gql.ts',
  () => ({
    useCheckClientCompliance: jest.fn()
  })
)

jest.mock('../LogSalesCallActionsModal/data', () => ({
  __esModule: true,
  useGetLogSalesCallActionsData: jest.fn()
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
  const mockUseGetClientDefaultNoteAnswers =
    useGetClientDefaultNoteAnswers as jest.Mock
  const mockUseLogClientSalesCall = useLogClientSalesCall as jest.Mock
  const mockUsePersistentFormContext = usePersistentFormContext as jest.Mock
  const mockUseGetLogSalesCallActionsData =
    useGetLogSalesCallActionsData as jest.Mock
  const mockUseCheckClientCompliance = useCheckClientCompliance as jest.Mock
  const useModalMock = useModal as jest.Mock

  useModalMock.mockImplementation(
    (
      modal: (props: { onCompleted: () => void }) => JSX.Element,
      modalProps: { onCompleted: () => void }
    ) => ({
      showModal: () => render(modal(modalProps))
    })
  )

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
          node: { operations: { logClientSalesCall: operation } }
        }),
      {
        data: {
          loading: false,
          node: { operations: { logClientSalesCall: operation } }
        }
      }
    ]
  )

  mockUsePersistentFormContext.mockImplementation(() => ({
    checkForm: () => isFormVisible
  }))

  mockUseGetClientDefaultNoteAnswers.mockImplementation(
    ({ onCompleted }: { onCompleted: () => void }) => ({
      loading: false,
      checkComplianceSalesFlow: true,
      clientStatus: ClientStatus.APPLIED,
      fetchDefaultNoteAnswers: onCompleted,
      operations: {
        approveClient: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        markClientAsBadLead: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        checkClientCompliance: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        pauseClient: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        repauseClient: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        resumeClient: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    })
  )

  mockUseLogClientSalesCall.mockReturnValue([
    () => ({
      data: {
        logClientSalesCall: {
          success: true
        }
      }
    })
  ])

  mockUseGetLogSalesCallActionsData.mockImplementation(
    ({ onCompleted }: { onCompleted: () => void }) => [
      onCompleted,
      {
        loading: false,
        data: {
          node: {
            visualComplianceStatus: VisualComplianceStatus.NOT_FULLY_CHECKED
          }
        }
      }
    ]
  )

  mockUseCheckClientCompliance.mockImplementation(
    ({ onCompleted }: { onCompleted: (data: unknown) => void }) => [
      () => onCompleted({ checkClientCompliance: { success: true } }),
      { loading: false }
    ]
  )
}

const arrangeTest = ({
  operation = OPERATION,
  isFormVisible = false,
  logSalesCallWillChangeClaimer = false,
  onCheckCompliance = () => {}
}: Partial<{
  operation: NoteOperationFragment
  isFormVisible: boolean
  logSalesCallWillChangeClaimer: boolean
  onCheckCompliance: () => void
}> = {}) => {
  mockReturnValues(operation, isFormVisible)

  const containerRef = createRef<HTMLDivElement>()

  render(
    <TestWrapper>
      <LogSalesCallButton
        clientId='VjEtQ2xpZW50LTQ4ODcwOA'
        clientName='Company Name'
        operation={operation}
        formContainer={containerRef}
        logSalesCallWillChangeClaimer={logSalesCallWillChangeClaimer}
        onComplete={() => {}}
        onCheckCompliance={onCheckCompliance}
      />

      <div ref={containerRef} />
    </TestWrapper>
  )
}

describe('LogSalesCallButton', () => {
  it('hides the log client sales call button', () => {
    arrangeTest({
      operation: { callable: OperationCallableTypes.HIDDEN, messages: [] }
    })

    expect(screen.queryByText('Log Sales Call')).not.toBeInTheDocument()
  })

  it('shows the log client sales call form', async () => {
    arrangeTest()

    fireEvent.click(screen.getByText('Log Sales Call'))

    expect(await screen.findByTestId('create-note-form')).toBeInTheDocument()
  })

  it('shows persistent note', async () => {
    arrangeTest({ operation: OPERATION, isFormVisible: true })

    expect(await screen.findByTestId('create-note-form')).toBeInTheDocument()
  })

  it('shows the change claimer modal', async () => {
    arrangeTest({ operation: OPERATION, logSalesCallWillChangeClaimer: true })

    fireEvent.click(screen.getByText('Log Sales Call'))

    expect(
      await screen.findByText("Change Company's Claimer?")
    ).toBeInTheDocument()

    fireEvent.click(screen.getByText('OK'))

    expect(await screen.findByTestId('create-note-form')).toBeInTheDocument()
  })

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('triggers the check client compliance', async () => {
    const onCheckCompliance = jest.fn()

    arrangeTest({ onCheckCompliance })

    fireEvent.click(screen.getByText('Log Sales Call'))

    expect(await screen.findByTestId('create-note-form')).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.click(screen.getByText('Add Note'))
    })

    expect(
      await screen.findByText('Sales Call Notes Saved')
    ).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText('Initiate Compliance Check'))

    fireEvent.click(screen.getByText('Save'))

    expect(onCheckCompliance).toHaveBeenCalled()
  })
})
