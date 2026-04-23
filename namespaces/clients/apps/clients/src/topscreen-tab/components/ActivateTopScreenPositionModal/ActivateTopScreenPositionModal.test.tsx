import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { PromptModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import ActivateTopScreenPositionModal from './ActivateTopScreenPositionModal'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  PromptModal: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

const mockPositionId = 'mockClientId'

const mockOnHideModal = jest.fn()

const mockPromptModal = PromptModal as jest.Mock
const mockUseModalFormChangeHandler = useModalFormChangeHandler as jest.Mock

const arrangeTest = () => {
  mockPromptModal.mockImplementation(() => <span>Mock PromptModal</span>)
  mockUseModalFormChangeHandler.mockImplementation(() => ({
    handleSubmit: jest.fn(),
    loading: false
  }))

  render(
    <ActivateTopScreenPositionModal
      positionId={mockPositionId}
      hideModal={mockOnHideModal}
    />
  )
}

describe('ActivateTopScreenPositionModal', () => {
  it('renders component', () => {
    const context = {}

    arrangeTest()

    expect(mockPromptModal).toHaveBeenCalledWith(
      {
        loading: false,
        message:
          'Once you activate the position, the related talents will be automatically sent to a screening process.',
        onClose: expect.any(Function),
        onSubmit: expect.any(Function),
        open: true,
        submitText: 'Activate',
        title: 'Activate TopScreen Position',
        operationVariables: {
          nodeId: mockPositionId,
          nodeType: 'TopscreenPosition',
          operationName: 'activateTopscreenPosition'
        }
      },
      context
    )
  })
})
