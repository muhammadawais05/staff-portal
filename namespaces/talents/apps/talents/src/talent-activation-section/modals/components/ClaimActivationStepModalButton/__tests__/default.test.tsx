import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  OperationCallableTypes,
  ActivationStepOperations
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createGetLazyOperationMock } from '@staff-portal/operations/src/mocks'
import { NodeType } from '@staff-portal/graphql'
import { StepIndicatorColor } from '@staff-portal/ui'
import { useModal } from '@staff-portal/modals-service'

import ClaimActivationStepModalButton, {
  Props as ButtonProps
} from '../ClaimActivationStepModalButton'
import { createAssignActivationStepMock } from '../../ClaimActivationStepModal/data/assign-activation-step/mocks'

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
      <ClaimActivationStepModalButton {...buttonProps} />
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

describe('ClaimActivationStepModalButton', () => {
  beforeEach(() => {
    mockUseModal.mockReturnValue({
      showModal: jest.fn()
    })
  })

  it('calls showModal when clicked', async () => {
    const stepName = 'Profile Editing'
    const activationStepId = '123'
    const operationMock = createOperationMock(activationStepId, 'assign')
    const assignActivationStepMock = createAssignActivationStepMock({
      variables: {
        input: {
          activationStepId
        }
      },
      partialAssignActivationStepMutation: {
        assignActivationStep: {
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
      mocks: [operationMock, assignActivationStepMock],
      buttonProps: {
        talentId: 'test-talent',
        stepId: activationStepId,
        stepName,
        staffFullName: 'TEST_NAME',
        staffId: '123',
        talentFullName: 'TEST_NAME',
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
