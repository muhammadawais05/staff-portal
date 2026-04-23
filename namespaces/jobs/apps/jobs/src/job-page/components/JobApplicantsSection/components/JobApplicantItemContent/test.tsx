import React from 'react'
import { screen, render } from '@testing-library/react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { TalentPartnerFragment } from '@staff-portal/talents'

import { createGetJobApplicationMock } from './data/get-job-application/mocks'
import JobApplicantItemContent from './JobApplicantItemContent'

jest.mock('@staff-portal/data-layer-service')
jest.mock(
  '@staff-portal/talents/src/components/SkillSetFields/components/SkillSetField/SkillSetField.tsx',
  () => ({
    __esModule: true,
    default: () => <div data-testid='skillset-field' />
  })
)
jest.mock(
  '@staff-portal/talents/src/components/DeltaWaitingTimeField/DeltaWaitingTimeField.tsx',
  () => ({
    __esModule: true,
    default: () => <div data-testid='delta-waiting-time-field' />
  })
)
jest.mock(
  '@staff-portal/jobs/src/components/JobPositionAnswers/JobPositionAnswers',
  () => ({
    __esModule: true,
    default: () => <div data-testid='JobPositionAnswers' />
  })
)
jest.mock(
  '@staff-portal/jobs/src/components/RejectJobApplicantModalButton/RejectJobApplicantModalButton',
  () => ({
    __esModule: true,
    default: () => <div data-testid='RejectJobApplicantModalButton' />
  })
)
jest.mock(
  '@staff-portal/jobs/src/components/ApproveApplicationButton/ApproveApplicationButton',
  () => ({
    __esModule: true,
    default: () => <div data-testid='ApproveApplicationButton' />
  })
)

jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  useMessageListener: jest.fn()
}))
jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  useRenderLazyOperation: jest.fn()
}))
jest.mock('@staff-portal/engagements')

const jobId = 'job-id'
const jobApplicationId = 'job-app-id'
const talentName = 'John Due'
const talentType = 'FinanceExpert'
const talentPartner: TalentPartnerFragment['talentPartner'] = {
  id: '123',
  webResource: { text: 'Tom Doe', url: 'https://partner-url.net/1' }
}

const useGetNodeMock = useGetNode as jest.Mock
const mockedUseMessageListener = useMessageListener as jest.Mock

const jobApplicationMock = createGetJobApplicationMock({
  jobId,
  jobApplicationId,
  talentName,
  talentType
})

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobApplicantItemContent
        jobId={jobId}
        jobApplicationId={jobApplicationId}
        emailMessagingJobApplicantId='123'
      />
    </TestWrapper>
  )

describe('JobApplicantItemContent', () => {
  describe('when data is loaded', () => {
    it('renders avatar and actions', () => {
      useGetNodeMock.mockImplementation(() => () => ({
        data: jobApplicationMock,
        loading: false
      }))

      arrangeTest()

      expect(screen.getByText(talentName)).toBeInTheDocument()
      expect(screen.getByTestId('ApproveApplicationButton')).toBeInTheDocument()
      expect(
        screen.getByTestId('RejectJobApplicantModalButton')
      ).toBeInTheDocument()
    })

    it('renders avatar with talent partner badge and actions', () => {
      const jobApplication = createGetJobApplicationMock({
        jobId,
        jobApplicationId,
        talentName,
        talentType,
        talentPartner
      })

      useGetNodeMock.mockImplementation(() => () => ({
        data: jobApplication,
        loading: false
      }))

      arrangeTest()

      expect(screen.getByText(talentName)).toBeInTheDocument()
      expect(screen.getByTestId('ApproveApplicationButton')).toBeInTheDocument()
      expect(
        screen.getByTestId('RejectJobApplicantModalButton')
      ).toBeInTheDocument()
    })

    it('renders fields', () => {
      useGetNodeMock.mockImplementation(() => () => ({
        data: jobApplicationMock,
        loading: false
      }))

      arrangeTest()

      expect(mockedUseMessageListener).toHaveBeenCalledTimes(2)
      expect(screen.getByText('Current country')).toBeInTheDocument()
      expect(screen.getByText('Time Zone')).toBeInTheDocument()
      expect(screen.getByText('Engagement rate')).toBeInTheDocument()
      expect(screen.getByText('Delta waiting time')).toBeInTheDocument()
      expect(screen.getByText('Rate')).toBeInTheDocument()
    })

    it('renders sections', () => {
      useGetNodeMock.mockImplementation(() => () => ({
        data: jobApplicationMock,
        loading: false
      }))

      arrangeTest()

      expect(screen.getByText('Profile Quality')).toBeInTheDocument()
      expect(screen.getByText('Job Match')).toBeInTheDocument()
      expect(screen.getByText('Past Performance')).toBeInTheDocument()
      expect(screen.getByText('Applicant Skills')).toBeInTheDocument()
    })
  })

  describe('when data is loading', () => {
    it('renders skeleton', () => {
      useGetNodeMock.mockImplementation(() => () => ({
        data: undefined,
        loading: true,
        initialLoading: true
      }))

      arrangeTest()

      expect(screen.getByTestId('job-applicant-loader')).toBeInTheDocument()
    })
  })
})
