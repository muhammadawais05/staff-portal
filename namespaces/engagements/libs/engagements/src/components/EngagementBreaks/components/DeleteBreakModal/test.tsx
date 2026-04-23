import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { PromptModal } from '@staff-portal/modals-service'

import DeleteBreakModal from './DeleteBreakModal'

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
    engagementBreakId: '456',
    hideModal: jest.fn()
  }

  return render(
    <TestWrapper>
      <DeleteBreakModal {...defaultProps} />
    </TestWrapper>
  )
}

describe('DeleteBreakModal', () => {
  beforeEach(() => {
    PromptModalMock.mockImplementation(() => null)
  })

  it('renders with correct props', async () => {
    arrangeTest()
    expect(PromptModalMock).toHaveBeenCalledWith(
      expect.objectContaining({
        message: `Are you sure you want to cancel pause for this engagement? If the client's break affects billing cycles that have already been paid, all related invoices, payments, and commissions will be sent to the accounting team for review and updated accordingly.`,
        onClose: expect.any(Function),
        onSubmit: expect.any(Function),
        open: true,
        operationVariables: {
          nodeId: '456',
          nodeType: 'EngagementBreak',
          operationName: 'removeEngagementBreak'
        },
        submitText: 'Delete Break',
        title: 'Delete Break',
        loading: false,
        'data-testid': 'DeleteBreak-modal'
      }),
      {}
    )
  })
})
