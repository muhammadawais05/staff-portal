import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@toptal/picasso/test-utils'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import PreviousStepButton from './PreviousStepButton'
import { useCandidateSendingContext } from '../../hooks'

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn()
}))

const mockUseCandidateSendingContext = useCandidateSendingContext as jest.Mock

const renderComponent = ({
  actualSteps,
  currentStep,
  previousStep,
  queryParametersEngagementId
}: {
  actualSteps?: NewEngagementWizardStep[]
  currentStep?: NewEngagementWizardStep
  previousStep?: NewEngagementWizardStep
  queryParametersEngagementId?: string
}) => {
  mockUseCandidateSendingContext.mockReturnValue({
    actualSteps,
    currentStep,
    previousStep,
    queryParametersEngagementId
  })

  return render(
    <TestWrapper>
      <PreviousStepButton
        disabled={false}
        loading={false}
        onClick={jest.fn()}
      />
    </TestWrapper>
  )
}

describe('PreviousStepButton', () => {
  describe('when `previousStep` is set', () => {
    it('renders the components', () => {
      renderComponent({
        previousStep: NewEngagementWizardStep.AVAILABILITY
      })

      expect(screen.queryByTestId('previous-step-button')).toBeInTheDocument()
    })
  })

  describe('when `previousStep` is not set', () => {
    it('does not render the components', () => {
      renderComponent({
        previousStep: undefined
      })

      expect(
        screen.queryByTestId('previous-step-button')
      ).not.toBeInTheDocument()
    })
  })

  describe('when is persisted engagement', () => {
    describe('when is step after `DETAILS` step', () => {
      it('renders the components', () => {
        renderComponent({
          actualSteps: [
            NewEngagementWizardStep.POSITION,
            NewEngagementWizardStep.AVAILABILITY,
            NewEngagementWizardStep.DETAILS,
            NewEngagementWizardStep.PITCH
          ],
          currentStep: NewEngagementWizardStep.PITCH,
          previousStep: NewEngagementWizardStep.DETAILS,
          queryParametersEngagementId: '123'
        })

        expect(screen.queryByTestId('previous-step-button')).toBeInTheDocument()
      })
    })

    describe('when is `DETAILS` step', () => {
      it('does not render the components', () => {
        renderComponent({
          actualSteps: [
            NewEngagementWizardStep.POSITION,
            NewEngagementWizardStep.AVAILABILITY,
            NewEngagementWizardStep.DETAILS
          ],
          currentStep: NewEngagementWizardStep.DETAILS,
          previousStep: NewEngagementWizardStep.AVAILABILITY,
          queryParametersEngagementId: '123'
        })

        expect(
          screen.queryByTestId('previous-step-button')
        ).not.toBeInTheDocument()
      })
    })

    describe('when is step before `DETAILS` step', () => {
      it('does not render the components', () => {
        renderComponent({
          actualSteps: [
            NewEngagementWizardStep.POSITION,
            NewEngagementWizardStep.AVAILABILITY,
            NewEngagementWizardStep.DETAILS
          ],
          currentStep: NewEngagementWizardStep.AVAILABILITY,
          previousStep: NewEngagementWizardStep.POSITION,
          queryParametersEngagementId: '123'
        })

        expect(
          screen.queryByTestId('previous-step-button')
        ).not.toBeInTheDocument()
      })
    })
  })
})
