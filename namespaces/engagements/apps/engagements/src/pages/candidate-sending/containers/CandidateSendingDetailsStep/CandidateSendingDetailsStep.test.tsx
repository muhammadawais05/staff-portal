import React, { ReactNode } from 'react'
import { screen, render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { NewEngagementWizardAttributes } from '@staff-portal/graphql/staff'

import {
  useCandidateSendingContext,
  useGetCandidateSendingDataForDetailsStep
} from '../../hooks'
import CandidateSendingDetailsStep from './CandidateSendingDetailsStep'
import { GetDetailsStepDataQuery } from '../../data/get-details-step-data'
import { JobApplicationSection } from '../../components'

jest.mock('../CandidateSendingForm', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid='candidate-sending-form'>
      <>{children}</>
    </div>
  )
}))

jest.mock('@staff-portal/ui', () => ({
  __esModule: true,
  SectionWithDetailedListSkeleton: () => <div data-testid='section-loader' />
}))
jest.mock('../PaymentsSection', () => ({
  __esModule: true,
  default: () => <div data-testid='payments-section' />
}))
jest.mock('../../components', () => ({
  JobApplicationSection: jest.fn()
}))

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn(),
  useGetCandidateSendingDataForDetailsStep: jest.fn()
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock
const useGetCandidateSendingDataForPositionStepMock =
  useGetCandidateSendingDataForDetailsStep as jest.Mock

const JobApplicationSectionMock = JobApplicationSection as jest.Mock

const renderComponent = ({
  data,
  loading,
  stepsAttributes
}: {
  data?: GetDetailsStepDataQuery
  loading?: boolean
  stepsAttributes?: NewEngagementWizardAttributes
} = {}) => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    stepsAttributes
  }))
  useGetCandidateSendingDataForPositionStepMock.mockImplementation(() => ({
    data,
    loading
  }))

  JobApplicationSectionMock.mockImplementation(() => (
    <div data-testid='job-application-section' />
  ))

  return render(
    <TestWrapper>
      <CandidateSendingDetailsStep />
    </TestWrapper>
  )
}

describe('CandidateSendingDetailsStep', () => {
  it('default render', () => {
    renderComponent({
      stepsAttributes: {
        hasPendingAssignment: false
      },
      data: {
        newEngagementWizard: {
          job: {
            relatedJobApplications: {
              nodes: [{ id: '123' }, { id: '456' }]
            }
          }
        }
      } as GetDetailsStepDataQuery
    })

    expect(screen.getByTestId('candidate-sending-form')).toBeInTheDocument()
    expect(screen.getByTestId('payments-section')).toBeInTheDocument()
    expect(screen.getByTestId('job-application-section')).toBeInTheDocument()

    expect(JobApplicationSectionMock).toHaveBeenCalledWith(
      {
        relatedJobApplication: { id: '123' }
      },
      {}
    )
  })

  describe('when related job application is missing', () => {
    it('does not render job application section', () => {
      renderComponent({
        stepsAttributes: {
          hasPendingAssignment: false
        },
        data: {
          newEngagementWizard: {
            job: {}
          }
        } as GetDetailsStepDataQuery
      })

      expect(screen.getByTestId('candidate-sending-form')).toBeInTheDocument()
      expect(screen.getByTestId('payments-section')).toBeInTheDocument()
      expect(
        screen.queryByTestId('job-application-section')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there is no data', () => {
    it('does not render any component', () => {
      renderComponent({ loading: false })

      expect(screen.queryByTestId('section-loader')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('candidate-sending-form')
      ).not.toBeInTheDocument()
      expect(screen.queryByTestId('payments-section')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('job-application-section')
      ).not.toBeInTheDocument()
    })
  })

  describe('when `loading` state is `true`', () => {
    it('renders loader', () => {
      renderComponent({ loading: true })

      expect(screen.getByTestId('section-loader')).toBeInTheDocument()
      expect(
        screen.queryByTestId('candidate-sending-form')
      ).not.toBeInTheDocument()
    })
  })
})
