import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import CandidateSendingWizardSection from './CandidateSendingWizardSection'
import { useCandidateSendingContext } from '../../hooks'

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn()
}))
jest.mock('../../components', () => ({
  NewEngagementWizard: () => <div data-testid='new-engagement-wizard' />,
  NewEngagementWizardLoader: () => (
    <div data-testid='new-engagement-wizard-loader' />
  )
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock

const arrangeTest = ({
  initialLoading,
  hasPendingAssignment,
  displayedSteps
}: {
  initialLoading: boolean
  hasPendingAssignment?: boolean
  displayedSteps?: NewEngagementWizardStep[]
}) => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    displayedSteps: displayedSteps ?? [
      NewEngagementWizardStep.POSITION,
      NewEngagementWizardStep.NEXT
    ],
    currentStep: NewEngagementWizardStep.POSITION,
    hasPendingAssignment,
    initialLoading
  }))

  render(
    <TestWrapper>
      <CandidateSendingWizardSection
        roleName='Developer'
        roleNameLoading={false}
      />
    </TestWrapper>
  )
}

describe('CandidateSendingWizardSection', () => {
  describe('when entity data is loading', () => {
    it('renders section with skeleton component', () => {
      arrangeTest({ initialLoading: true })

      expect(
        screen.getByTestId('new-engagement-wizard-loader')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('candidate-sending-wizard-section')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('new-engagement-wizard')
      ).not.toBeInTheDocument()
    })
  })

  describe('when entity data was fetched and can be viewed', () => {
    it('renders section with wizard component', () => {
      arrangeTest({
        initialLoading: false
      })

      expect(
        screen.queryByTestId('new-engagement-wizard-loader')
      ).not.toBeInTheDocument()
      expect(
        screen.getByTestId('candidate-sending-wizard-section')
      ).toBeInTheDocument()
      expect(screen.getByTestId('new-engagement-wizard')).toBeInTheDocument()
    })

    describe('when `hasPendingAssignment` is not specified', () => {
      it('renders section title with `send` prefix', () => {
        arrangeTest({ initialLoading: false })

        expect(
          screen.getByText('Follow these steps to send developer to position')
        ).toBeInTheDocument()
      })
    })

    describe('when `hasPendingAssignment` is `truthy`', () => {
      it('renders section title with `assign` prefix', () => {
        arrangeTest({ initialLoading: false, hasPendingAssignment: true })

        expect(
          screen.getByText('Follow these steps to assign developer to position')
        ).toBeInTheDocument()
      })
    })
  })

  describe('when steps are empty', () => {
    it('renders nothing', () => {
      arrangeTest({
        initialLoading: false,
        displayedSteps: []
      })

      expect(
        screen.queryByTestId('new-engagement-wizard-loader')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('candidate-sending-wizard-section')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('new-engagement-wizard')
      ).not.toBeInTheDocument()
    })
  })
})
