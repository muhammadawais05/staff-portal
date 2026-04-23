import { EngagementStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import CandidateSendingSubmitButton from '../CandidateSendingSubmitButton'
import CandidateSendingDraftButton from './CandidateSendingDraftButton'

jest.mock('../CandidateSendingSubmitButton')
const mockCandidateSendingSubmitButton =
  CandidateSendingSubmitButton as jest.Mock

const renderComponent = ({
  engagementId
}: {
  engagementId?: string
} = {}) => {
  mockCandidateSendingSubmitButton.mockImplementation(() => null)

  return render(
    <TestWrapper>
      <CandidateSendingDraftButton
        engagementId={engagementId}
        onClick={() => {}}
      />
    </TestWrapper>
  )
}

describe('CandidateSendingDraftButton', () => {
  describe('when engagement is missing', () => {
    it('shows submit button with status', () => {
      renderComponent()

      expect(mockCandidateSendingSubmitButton).toHaveBeenCalledWith(
        expect.objectContaining({
          children: 'Save Draft',
          status: EngagementStatus.DRAFT,
          variant: 'secondary',
          onClick: expect.anything()
        }),
        expect.anything()
      )
    })
  })

  describe('when engagement is passed', () => {
    it('shows submit button with status', () => {
      renderComponent({ engagementId: '123' })

      expect(mockCandidateSendingSubmitButton).toHaveBeenCalledWith(
        expect.objectContaining({
          children: 'Update Draft',
          status: EngagementStatus.DRAFT,
          variant: 'secondary',
          onClick: expect.anything()
        }),
        expect.anything()
      )
    })
  })
})
