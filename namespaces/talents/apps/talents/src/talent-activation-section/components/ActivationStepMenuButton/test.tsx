import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { createOperation } from '@staff-portal/talents/src/mocks'

import { createStep } from '../../test-utils'
import { SecondaryOperation, StepOperation } from '../../types'
import { getSecondaryOperationButtonLabel } from '../../utils'
import ActivationStepMenuButton, {
  Props as ActivationStepMenuButtonProps
} from './ActivationStepMenuButton'

const mockedShowUnclaimActivationStepModal = jest.fn()
const mockedShowResetActivationStepModal = jest.fn()
const mockedShowReassignActivationStepModal = jest.fn()
const mockedShowSendIntroduceReviewCallEmailModal = jest.fn()
const mockedShowReviewCallRescheduleEmailModal = jest.fn()
const mockedShowSendRestoreReviewCallEmailModal = jest.fn()

const mockedFunctions = [
  mockedShowUnclaimActivationStepModal,
  mockedShowResetActivationStepModal,
  mockedShowReassignActivationStepModal,
  mockedShowSendIntroduceReviewCallEmailModal,
  mockedShowReviewCallRescheduleEmailModal,
  mockedShowSendRestoreReviewCallEmailModal
]

const secondaryOperations: [SecondaryOperation, jest.Mock][] = [
  StepOperation.Unassign,
  StepOperation.Reset,
  StepOperation.Reassign,
  StepOperation.SendIntroductionEmail,
  StepOperation.SendRescheduleEmail,
  StepOperation.SendRestorationEmail
].map((actionName, index) => [
  actionName as SecondaryOperation,
  mockedFunctions[index]
])

jest.mock('@staff-portal/talents-review-call-email', () => ({
  useSendIntroduceReviewCallEmailModal: () => ({
    showModal: mockedShowSendIntroduceReviewCallEmailModal
  }),
  useSendRescheduleReviewCallEmailModal: () => ({
    showModal: mockedShowReviewCallRescheduleEmailModal
  }),
  useSendRestoreReviewCallEmailModal: () => ({
    showModal: mockedShowSendRestoreReviewCallEmailModal
  })
}))

jest.mock('../../modals/components/UnclaimActivationStepModal', () => ({
  __esModule: true,
  useUnclaimActivationStepModal: () => ({
    showModal: mockedShowUnclaimActivationStepModal
  })
}))

jest.mock('../../modals/components/ReassignActivationStepModal', () => ({
  __esModule: true,
  useReassignActivationStepModal: () => ({
    showModal: mockedShowReassignActivationStepModal
  })
}))

jest.mock('../../modals/components/ResetActivationStepModal', () => ({
  __esModule: true,
  useResetActivationStepModal: () => ({
    showModal: mockedShowResetActivationStepModal
  })
}))

const defaultProps = {
  activationId: '123',
  talentId: '1234',
  step: createStep(),
  stepName: 'stepName'
}

const arrangeTest = (props: ActivationStepMenuButtonProps = defaultProps) =>
  render(
    <TestWrapper>
      <ActivationStepMenuButton {...props} />
    </TestWrapper>
  )

describe('ActivationStepMenuButton', () => {
  it('renders empty option when there are no secondary operations', () => {
    const { queryByText, getByTestId } = arrangeTest()

    fireEvent.click(getByTestId('step-button-menu'))

    expect(queryByText('No Additional Actions')).toBeInTheDocument()
  })

  it.each(secondaryOperations)(
    'opens modal for secondary operation: %s',
    async (stepOperation, mockedFunction) => {
      const buttonLabel = getSecondaryOperationButtonLabel(stepOperation)
      const step = createStep({
        operations: {
          [stepOperation]: createOperation(OperationCallableTypes.ENABLED)
        }
      })

      arrangeTest({
        ...defaultProps,
        step
      })

      fireEvent.click(screen.getByTestId('step-button-menu'))

      fireEvent.click(screen.getByText(buttonLabel))
      expect(mockedFunction).toHaveBeenCalledTimes(1)
    }
  )
})
