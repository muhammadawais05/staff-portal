import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { PromptModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import EnableTopscreenModal from './EnableTopscreenModal'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  PromptModal: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

const mockClientId = 'mockClientId'

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
    <EnableTopscreenModal clientId={mockClientId} hideModal={mockOnHideModal} />
  )
}

describe('EnableTopscreenModal', () => {
  it('renders component', () => {
    const context = {}

    arrangeTest()

    expect(mockPromptModal).toHaveBeenCalledWith(
      {
        loading: false,
        message:
          'Once you enable the feature, the client will have the possibility to use the TopScreen feature.',
        onClose: expect.any(Function),
        onSubmit: expect.any(Function),
        open: true,
        submitText: 'Enable',
        title: 'Enable TopScreen Feature',
        operationVariables: {
          nodeId: mockClientId,
          nodeType: 'Client',
          operationName: 'enableTopscreenFeature'
        }
      },
      context
    )
  })
})
