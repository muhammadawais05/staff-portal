import { render } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { PromptModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import ExpireEngagementModal from './ExpireEngagementModal'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  PromptModal: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

const PromptModalMock = PromptModal as jest.Mock
const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock
const handleSubmitMock = jest.fn()

const arrangeTest = () => {
  useModalFormChangeHandlerMock.mockImplementation(
    ({ mutationResultOptions: { onSuccessAction } }) => {
      onSuccessAction()

      return { handleSubmit: handleSubmitMock, loading: false }
    }
  )

  return render(
    <TestWrapper>
      <ExpireEngagementModal engagementId='123' hideModal={jest.fn()} />
    </TestWrapper>
  )
}

describe('ExpireEngagementModal', () => {
  beforeEach(() => {
    PromptModalMock.mockImplementation(() => null)
  })

  it('renders with correct props', async () => {
    arrangeTest()
    expect(PromptModalMock).toHaveBeenCalledWith(
      expect.objectContaining({
        'data-testid': 'ExpireEngagementModal',
        loading: false,
        message: 'Are you sure you want to expire this interview now?',
        onClose: expect.any(Function),
        onSubmit: expect.any(Function),
        open: true,
        operationVariables: {
          nodeId: '123',
          nodeType: 'Engagement',
          operationName: 'expireEngagement'
        },
        submitText: 'Expire Interview',
        title: 'Expire Interview'
      }),
      {}
    )
  })
})
