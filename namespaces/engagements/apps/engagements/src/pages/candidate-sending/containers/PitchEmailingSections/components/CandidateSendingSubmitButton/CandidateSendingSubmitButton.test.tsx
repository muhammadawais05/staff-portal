import { EngagementStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useForm, useFormState } from '@toptal/picasso-forms'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'

import CandidateSendingSubmitButton from './CandidateSendingSubmitButton'

jest.mock('@toptal/picasso-forms')

const mockUseForm = useForm as jest.Mock
const mockUseFormState = useFormState as jest.Mock

const renderComponent = ({
  submitting = false,
  onClick = () => {},
  change = () => {}
}: {
  submitting?: boolean
  onClick?: () => void
  change?: () => void
}) => {
  mockUseForm.mockImplementation(() => ({ change }))
  mockUseFormState.mockImplementation(() => ({ submitting }))

  return render(
    <TestWrapper>
      <CandidateSendingSubmitButton
        variant='secondary'
        status={EngagementStatus.ACTIVE}
        onClick={onClick}
      >
        Send
      </CandidateSendingSubmitButton>
    </TestWrapper>
  )
}

describe('CandidateSendingSubmitButton', () => {
  describe('when form is submitting', () => {
    it('shows a disabled button', () => {
      renderComponent({ submitting: true })

      expect(
        screen.getByTestId('candidate-sending-submit-button')
      ).toBeDisabled()
    })
  })

  describe('when clicking the button', () => {
    it('triggers the form change', () => {
      const onChange = jest.fn()
      const onClick = jest.fn()

      renderComponent({ change: onChange, onClick })

      fireEvent.click(screen.getByTestId('candidate-sending-submit-button'))

      expect(onChange).toHaveBeenCalledWith('status', EngagementStatus.ACTIVE)
      expect(onClick).toHaveBeenCalled()
    })
  })
})
