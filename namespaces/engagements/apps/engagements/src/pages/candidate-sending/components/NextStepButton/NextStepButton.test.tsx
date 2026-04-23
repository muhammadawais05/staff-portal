import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@toptal/picasso/test-utils'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import NextStepButton from './NextStepButton'
import { useCandidateSendingContext } from '../../hooks'

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn()
}))

const mockUseCandidateSendingContext = useCandidateSendingContext as jest.Mock

const renderComponent = ({
  nextStep
}: {
  nextStep?: NewEngagementWizardStep
}) => {
  mockUseCandidateSendingContext.mockReturnValue({
    nextStep
  })

  return render(
    <TestWrapper>
      <NextStepButton disabled={false} loading={false} />
    </TestWrapper>
  )
}

describe('NextStepButton', () => {
  describe('when `nextStep` is set', () => {
    it('renders the components', () => {
      renderComponent({
        nextStep: NewEngagementWizardStep.AVAILABILITY
      })

      expect(screen.getByText('Next — Availability')).toBeInTheDocument()
    })
  })

  describe('when `nextStep` is not set', () => {
    it('does not render the components', () => {
      renderComponent({
        nextStep: undefined
      })

      expect(screen.queryByTestId('next-step-button')).not.toBeInTheDocument()
    })
  })
})
