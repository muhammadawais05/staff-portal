import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import {
  ActivationStepOperations,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createGetLazyOperationMock } from '@staff-portal/operations/src/mocks'
import { NodeType } from '@staff-portal/graphql'
import { StepIndicatorColor } from '@staff-portal/ui'
import { useModal } from '@staff-portal/modals-service'

import ApproveActivationStepModalButton, {
  Props as ButtonProps
} from '../ApproveActivationStepModalButton'
import { createApproveActivationStepMock } from '../../ApproveActivationStepModal/data/approve-activation-step/mocks'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))
const mockUseModal = useModal as jest.Mock

const arrangeTest = ({
  mocks,
  buttonProps
}: {
  mocks: MockedResponse[]
  buttonProps: ButtonProps
}) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <ApproveActivationStepModalButton {...buttonProps} />
    </TestWrapperWithMocks>
  )

const createOperationMock = (
  id: string,
  operationName: keyof ActivationStepOperations
) =>
  createGetLazyOperationMock({
    operation: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    variables: {
      nodeId: id,
      nodeType: NodeType.ACTIVATION_STEP,
      operationName
    }
  })

describe('ApproveActivationStepModalButton', () => {
  beforeEach(() => {
    mockUseModal.mockReturnValue({
      showModal: jest.fn()
    })
  })

  it('calls showModal when clicked', async () => {
    const stepName = 'Profile Editing'
    const activationStepId = '123'
    const operationMock = createOperationMock(activationStepId, 'approve')
    const approveActivationStepMock = createApproveActivationStepMock({
      variables: {
        input: {
          activationStepId,
          comment: 'TEST_COMMENT'
        }
      },
      partialApproveActivationStepMutation: {
        approveActivationStep: {
          activation: {
            id: '123',
            steps: {
              nodes: []
            }
          },
          success: true,
          errors: []
        }
      }
    })
    const showModal = jest.fn()

    mockUseModal.mockReturnValue({
      showModal
    })
    arrangeTest({
      mocks: [operationMock, approveActivationStepMock],
      buttonProps: {
        talentId: 'test-talent',
        stepId: activationStepId,
        stepName,
        needsToptalEmail: false,
        indicatorData: {
          color: StepIndicatorColor.LightGrey
        },
        showCalendarIcon: false,
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    })

    fireEvent.click(screen.getByRole('button', { name: /Profile Editing/i }))

    expect(showModal).toHaveBeenCalledTimes(1)
  })
})
