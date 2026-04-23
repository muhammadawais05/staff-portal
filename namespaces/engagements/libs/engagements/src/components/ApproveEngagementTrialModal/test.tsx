import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { PromptModal } from '@staff-portal/modals-service'

import { ApproveEngagementTrialModal } from './index'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  PromptModal: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useMutation: () => [undefined, { loading: false }]
}))

const PromptModalMock = PromptModal as jest.Mock

const arrangeTest = () => {
  const defaultProps = {
    engagementId: '123',
    clientId: '456',
    talentType: 'Developer',
    hideModal: jest.fn()
  }

  return render(
    <TestWrapper>
      <ApproveEngagementTrialModal {...defaultProps} />
    </TestWrapper>
  )
}

describe('ApproveEngagementTrialModal', () => {
  beforeEach(() => {
    PromptModalMock.mockImplementation(() => null)
  })

  it('renders with correct props', async () => {
    arrangeTest()
    expect(PromptModalMock).toHaveBeenCalledWith(
      expect.objectContaining({
        'data-testid': 'ApproveTrialModal',
        loading: false,
        message:
          "Are you sure that you want to approve trial and hire developer? This will immediately end the trial period (if it's not finished yet) and start your working contract with the developer.",
        onClose: expect.any(Function),
        onSubmit: expect.any(Function),
        open: true,
        operationVariables: {
          nodeId: '123',
          nodeType: 'Engagement',
          operationName: 'approveEngagementTrial'
        },
        submitText: 'Hire Developer',
        title: 'Approve Developer Trial'
      }),
      {}
    )
  })
})
