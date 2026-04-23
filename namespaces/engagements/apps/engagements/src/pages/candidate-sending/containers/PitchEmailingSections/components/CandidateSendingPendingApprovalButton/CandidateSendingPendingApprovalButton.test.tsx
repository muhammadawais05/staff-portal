import { EngagementStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import CandidateSendingSubmitButton from '../CandidateSendingSubmitButton'
import CandidateSendingPendingApprovalButton from './CandidateSendingPendingApprovalButton'

jest.mock('../CandidateSendingSubmitButton')
const mockCandidateSendingSubmitButton =
  CandidateSendingSubmitButton as jest.Mock

const renderComponent = (engagementId?: string) => {
  mockCandidateSendingSubmitButton.mockImplementation(() => null)

  return render(
    <TestWrapper>
      <CandidateSendingPendingApprovalButton
        engagementId={engagementId}
        onClick={() => {}}
      />
    </TestWrapper>
  )
}

describe('CandidateSendingPendingApprovalButton', () => {
  describe('when engagement is missing', () => {
    it('shows the submit button', () => {
      renderComponent()

      expect(mockCandidateSendingSubmitButton).toHaveBeenCalledWith(
        expect.objectContaining({
          children: 'Save and Notify Approver',
          status: EngagementStatus.PENDING_APPROVAL,
          variant: 'secondary',
          onClick: expect.anything()
        }),
        expect.anything()
      )
    })
  })

  describe('when engagement is passed', () => {
    it('shows the submit button', () => {
      renderComponent('123')

      expect(mockCandidateSendingSubmitButton).toHaveBeenCalledWith(
        expect.objectContaining({
          children: 'Update and Notify Approver',
          status: EngagementStatus.PENDING_APPROVAL,
          variant: 'secondary',
          onClick: expect.anything()
        }),
        expect.anything()
      )
    })
  })
})
