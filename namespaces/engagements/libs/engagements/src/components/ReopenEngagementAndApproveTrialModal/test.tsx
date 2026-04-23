import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { PromptModal } from '@staff-portal/modals-service'

import ReopenEngagementAndApproveTrialModal from './ReopenEngagementAndApproveTrialModal'

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
    hideModal: jest.fn()
  }

  return render(
    <TestWrapper>
      <ReopenEngagementAndApproveTrialModal {...defaultProps} />
    </TestWrapper>
  )
}

describe('ReopenEngagementAndApproveTrialModal', () => {
  beforeEach(() => {
    PromptModalMock.mockImplementation(() => null)
  })

  it('renders with correct props', async () => {
    arrangeTest()
    expect(PromptModalMock).toHaveBeenCalledWith(
      expect.objectContaining({
        'data-testid': 'ReopenEngagementAndApproveTrialModal',
        loading: false,
        message:
          'Are you sure that you want to reopen this engagement? This will set change trial to approved, and billing will be generated without breaks. If there was a break, you can add it after reopening.',
        onClose: expect.any(Function),
        onSubmit: expect.any(Function),
        open: true,
        operationVariables: {
          nodeId: '123',
          nodeType: 'Engagement',
          operationName: 'reopenExpiredEngagement'
        },
        submitText: 'Reopen and Approve Trial',
        title: 'Reopen Engagement'
      }),
      {}
    )
  })
})
