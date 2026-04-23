import React, { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'
import { ErrorType, ErrorView } from '@staff-portal/error-handling'

import CandidateSendingPageContent from './CandidateSendingPageContent'
import { useCandidateSendingContext, useGetRoleTitle } from '../../hooks'

jest.mock('@staff-portal/error-handling', () => ({
  ...jest.requireActual('@staff-portal/error-handling'),
  ErrorView: jest.fn()
}))

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn(),
  useGetRoleTitle: jest.fn()
}))

jest.mock('@staff-portal/page-wrapper', () => ({
  ContentWrapper: ({
    title,
    children
  }: {
    title: string
    children: ReactNode
  }) => (
    <>
      <div>{title}</div>
      <div>{children}</div>
    </>
  )
}))

jest.mock('../CandidateSendingWizardSection', () => ({
  __esModule: true,
  default: () => <div data-testid='candidate-sending-wizard-section' />
}))
jest.mock('../CandidateSendingPositionStep', () => ({
  __esModule: true,
  default: () => <div data-testid='candidate-sending-position-step' />
}))
jest.mock('../CandidateSendingSkillsStep', () => ({
  __esModule: true,
  default: () => <div data-testid='candidate-sending-skills-step' />
}))
jest.mock('../CandidateSendingAvailabilityStep', () => ({
  __esModule: true,
  default: () => <div data-testid='candidate-sending-availability-step' />
}))
jest.mock('../CandidateSendingDetailsStep', () => ({
  __esModule: true,
  default: () => <div data-testid='candidate-sending-details-step' />
}))
jest.mock('../CandidateSendingPitchStep', () => ({
  __esModule: true,
  default: () => <div data-testid='candidate-sending-pitch-step' />
}))
jest.mock(
  '../CandidateSendingFeedbackStep/CandidateSendingFeedbackStep',
  () => ({
    __esModule: true,
    default: () => <div data-testid='candidate-sending-feedback-step' />
  })
)
jest.mock('../CandidateSendingNextStep', () => ({
  __esModule: true,
  default: () => <div data-testid='candidate-sending-next-step' />
}))
jest.mock('../../components', () => ({
  ContentStatusMessage: () => <div data-testid='content-status-message' />
}))

const ErrorViewMock = ErrorView as jest.Mock
const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock
const useGetRoleTitleMock = useGetRoleTitle as jest.Mock

const renderComponent = ({
  initialStepErrorType,
  hasPendingAssignment,
  currentStep,
  roleTitleData = {}
}: {
  initialStepErrorType?: ErrorType | null
  hasPendingAssignment?: boolean
  currentStep?: NewEngagementWizardStep
  roleTitleData?: { roleTitle?: string | null; loading?: boolean }
}) => {
  ErrorViewMock.mockImplementation(() => <div data-testid='error-view' />)
  useCandidateSendingContextMock.mockImplementation(() => ({
    initialStepErrorType: initialStepErrorType ?? null,
    currentStep,
    hasPendingAssignment
  }))
  useGetRoleTitleMock.mockImplementation(() => roleTitleData)

  render(
    <TestWrapper>
      <CandidateSendingPageContent talentId='talent-id' jobId='jobId' />
    </TestWrapper>
  )
}

describe('CandidateSendingPageContent', () => {
  it('renders default', () => {
    renderComponent({ roleTitleData: { roleTitle: 'role title' } })

    expect(screen.getByText('Send role title to Position')).toBeInTheDocument()

    expect(
      screen.getByTestId('candidate-sending-wizard-section')
    ).toBeInTheDocument()

    expect(screen.getByTestId('content-status-message')).toBeInTheDocument()

    expect(
      screen.queryByTestId('candidate-sending-position-step')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('candidate-sending-skills-step')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('candidate-sending-availability-step')
    ).not.toBeInTheDocument()
  })

  describe('when `hasPendingAssignment` is truthy', () => {
    it('renders proper title', () => {
      renderComponent({
        roleTitleData: { roleTitle: 'role title' },
        hasPendingAssignment: true
      })

      expect(
        screen.getByText('Assign role title to Position')
      ).toBeInTheDocument()
    })
  })

  it.each([
    [NewEngagementWizardStep.POSITION, 'position'],
    [NewEngagementWizardStep.SKILLS, 'skills'],
    [NewEngagementWizardStep.AVAILABILITY, 'availability'],
    [NewEngagementWizardStep.DETAILS, 'details'],
    [NewEngagementWizardStep.PITCH, 'pitch'],
    [NewEngagementWizardStep.FEEDBACK, 'feedback'],
    [NewEngagementWizardStep.NEXT, 'next']
  ])('renders %s step', (currentStep, step) => {
    renderComponent({ currentStep })

    expect(
      screen.getByTestId(`candidate-sending-${step}-step`)
    ).toBeInTheDocument()
  })
})
