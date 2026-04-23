import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  GetLazyOperationQuery,
  GetLazyOperationVariables,
  useGetLazyOperation
} from '@staff-portal/operations'
import { NoteOperationFragment } from '@staff-portal/notes'

import CheckComplianceButton from './CheckComplianceButton'
import { useCheckClientComplianceModal } from './services/use-check-client-compliance-modal'

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

jest.mock('./services/use-check-client-compliance-modal', () => ({
  useCheckClientComplianceModal: jest.fn()
}))

const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const mockReturnValues = (operation: NoteOperationFragment) => {
  const mockUseGetLazyOperation = useGetLazyOperation as jest.Mock
  const mockUseCheckClientComplianceModal =
    useCheckClientComplianceModal as jest.Mock

  mockUseCheckClientComplianceModal.mockImplementation(() => ({
    showModal: () => render(<div data-testid='check-compliance-modal' />)
  }))
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
          node: { operations: { checkClientCompliance: operation } }
        }),
      {
        data: {
          loading: false,
          node: { operations: { checkClientCompliance: operation } }
        }
      }
    ]
  )
}

const renderComponent = (operation: NoteOperationFragment = OPERATION) => {
  mockReturnValues(operation)

  render(
    <TestWrapper>
      <CheckComplianceButton
        clientId='VjEtQ2xpZW50LTQ4ODcwOA'
        clientName='clientName'
        operation={operation}
        onComplete={() => {}}
      />
    </TestWrapper>
  )
}

describe('CheckComplianceButton', () => {
  it('hides the check compliance button', () => {
    renderComponent({ callable: OperationCallableTypes.HIDDEN, messages: [] })

    expect(screen.queryByText('Check Compliance')).not.toBeInTheDocument()
  })

  it('shows the check compliance button', () => {
    renderComponent()

    expect(screen.queryByText('Check Compliance')).toBeInTheDocument()
  })

  it('shows the check compliance modal', async () => {
    renderComponent()

    expect(
      screen.queryByTestId('check-compliance-modal')
    ).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Check Compliance'))

    expect(
      await screen.findByTestId('check-compliance-modal')
    ).toBeInTheDocument()
  })
})
