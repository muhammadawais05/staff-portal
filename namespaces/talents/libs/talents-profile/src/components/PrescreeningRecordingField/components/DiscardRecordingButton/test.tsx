import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createGetLazyOperationMock } from '@staff-portal/operations/src/mocks'
import { NodeType } from '@staff-portal/graphql'
import { useModal } from '@staff-portal/modals-service'

import DiscardRecordingButton, { Props } from './DiscardRecordingButton'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const mockUseModal = useModal as jest.Mock

const generateOperation = (
  callable: OperationCallableTypes,
  messages: string[] = []
): Operation => ({ callable, messages })

const defaultProps: Props = {
  talentId: '123',
  operation: generateOperation(OperationCallableTypes.ENABLED)
}

const arrangeTest = (props = defaultProps, mocks?: MockedResponse[]) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <DiscardRecordingButton {...props} />
    </TestWrapperWithMocks>
  )

describe('DiscardRecordingButton', () => {
  const mockShowModal = jest.fn()

  beforeEach(() => {
    mockUseModal.mockReturnValue({
      showModal: mockShowModal
    })
  })

  it('shows the discard recording modal', async () => {
    arrangeTest({ ...defaultProps }, [
      createGetLazyOperationMock({
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        variables: {
          nodeId: defaultProps.talentId,
          nodeType: NodeType.TALENT,
          operationName: 'discardTalentPrescreeningVideo'
        }
      })
    ])

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Discard Recording' }))
    })

    expect(mockShowModal).toHaveBeenCalled()
  })

  describe('when the user does not have permission to discard recording', () => {
    it('hides the discard recording button', () => {
      arrangeTest({
        ...defaultProps,
        operation: generateOperation(OperationCallableTypes.HIDDEN)
      })

      expect(
        screen.queryByRole('button', { name: 'Discard Recording' })
      ).not.toBeInTheDocument()
    })
  })

  describe('when the operation is disabled', () => {
    it('disables the discard recording button', () => {
      arrangeTest({
        ...defaultProps,
        operation: generateOperation(OperationCallableTypes.DISABLED)
      })

      expect(
        screen.queryByRole('button', { name: 'Discard Recording' })
      ).toBeDisabled()
    })
  })
})
