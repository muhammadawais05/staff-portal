import { getRoleTypeText } from '@staff-portal/facilities'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import CandidateSendingSubmitButton from '../CandidateSendingSubmitButton'
import CandidateSendingSendButton from './CandidateSendingSendButton'

jest.mock('@staff-portal/facilities')
jest.mock('../CandidateSendingSubmitButton')

const mockCandidateSendingSubmitButton =
  CandidateSendingSubmitButton as jest.Mock

const mockGetRoleTypeText = getRoleTypeText as jest.Mock

const renderComponent = (hasPendingAssignment = false) => {
  mockCandidateSendingSubmitButton.mockImplementation(() => null)
  mockGetRoleTypeText.mockImplementation(() => 'Developer')

  return render(
    <TestWrapper>
      <CandidateSendingSendButton
        hasPendingAssignment={hasPendingAssignment}
        talentType='developer'
        onClick={() => {}}
      />
    </TestWrapper>
  )
}

describe('CandidateSendingSendButton', () => {
  describe('when has pending assignment', () => {
    it('shows submit button with assign text', () => {
      renderComponent(true)

      expect(mockCandidateSendingSubmitButton).toHaveBeenCalledWith(
        expect.objectContaining({
          children: 'Assign Developer',
          variant: 'positive',
          onClick: expect.anything()
        }),
        expect.anything()
      )
    })
  })

  describe('when has not pending assignment', () => {
    it('shows submit button with send text', () => {
      renderComponent()

      expect(mockCandidateSendingSubmitButton).toHaveBeenCalledWith(
        expect.objectContaining({
          children: 'Send Developer',
          variant: 'positive',
          onClick: expect.anything()
        }),
        expect.anything()
      )
    })
  })
})
