import React, { ReactNode } from 'react'
import { screen, render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  EngagementCommitmentEnum,
  NewEngagementWizardAttributes,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { Form } from '@toptal/picasso-forms'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import {
  useCandidateSendingContext,
  useGetCandidateSendingDataForAvailabilityStep,
  useGetAvailabilityStepTalentAvailabilityData
} from '../../hooks'
import CandidateSendingAvailabilityStep from './CandidateSendingAvailabilityStep'
import { AvailabilityStepDataFragment } from '../../data/get-availability-step-data'
import { AvailabilityStepTalentAvailabilityDataFragment } from '../../data/get-availability-step-talent-availability-data'
import { CandidateCommitmentDetailsSection } from '../../components'

jest.mock('../CandidateSendingForm', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid='candidate-sending-form'>
      <>{children}</>
    </div>
  )
}))
jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  SectionWithDetailedListSkeleton: () => <div data-testid='section-loader' />
}))
jest.mock('../CandidateSendingJobSection', () => ({
  __esModule: true,
  default: () => <div data-testid='candidate-sending-job-section' />
}))
jest.mock('../CandidateSendingTalentSection', () => ({
  __esModule: true,
  default: () => <div data-testid='candidate-sending-talent-section' />
}))
jest.mock('../CandidateSendingTalentAvailabilitySection', () => ({
  __esModule: true,
  default: () => <div data-testid='candidate-sending-availability-section' />
}))
jest.mock('../../components', () => ({
  __esModule: true,
  CandidateCommitmentDetailsSection: jest.fn()
}))

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn(),
  useGetJobCandidateData: jest.fn(),
  useGetTalentCandidateData: jest.fn(),
  useGetAvailabilityStepTalentAvailabilityData: jest.fn(),
  useGetCandidateSendingDataForAvailabilityStep: jest.fn()
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock
const useGetCandidateSendingDataForAvailabilityStepMock =
  useGetCandidateSendingDataForAvailabilityStep as jest.Mock
const useGetAvailabilityStepTalentAvailabilityDataMock =
  useGetAvailabilityStepTalentAvailabilityData as jest.Mock

const CandidateCommitmentDetailsSectionMock =
  CandidateCommitmentDetailsSection as jest.Mock

const renderComponent = ({
  availabilityData,
  availabilityStepData,
  availabilityDataLoading,
  availabilityStepDataLoading,
  stepsAttributes
}: {
  availabilityData?: AvailabilityStepTalentAvailabilityDataFragment
  availabilityStepData?: AvailabilityStepDataFragment
  availabilityDataLoading?: boolean
  availabilityStepDataLoading?: boolean
  stepsAttributes?: NewEngagementWizardAttributes
} = {}) => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    talentId: '123',
    stepsAttributes
  }))
  useGetCandidateSendingDataForAvailabilityStepMock.mockImplementation(() => ({
    data: availabilityStepData,
    loading: availabilityStepDataLoading
  }))

  useGetAvailabilityStepTalentAvailabilityDataMock.mockImplementation(() => ({
    data: availabilityData,
    loading: availabilityDataLoading
  }))

  CandidateCommitmentDetailsSectionMock.mockImplementation(() => <div />)

  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <CandidateSendingAvailabilityStep />
      </Form>
    </TestWrapper>
  )
}

describe('CandidateSendingAvailabilityStep', () => {
  describe('when data is available', () => {
    it('renders static content', () => {
      renderComponent()

      expect(
        screen.getByTestId('candidate-sending-talent-section')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('candidate-sending-job-section')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('candidate-sending-availability-section')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('parallel-interviews-section')
      ).not.toBeInTheDocument()
      expect(screen.getByTestId('candidate-sending-form')).toBeInTheDocument()
      expect(CandidateCommitmentDetailsSectionMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('when we have parallel engagements', () => {
    it('renders the parallel interviews section and passes correct props to `CandidateCommitmentDetails`', () => {
      renderComponent({
        availabilityStepData: {
          acquireHighPriorityLockOperation: createOperationMock({
            callable: OperationCallableTypes.HIDDEN
          }),
          parallelEngagements: {
            nodes: [
              {
                id: '123',
                commitment: EngagementCommitmentEnum.FULL_TIME
              }
            ]
          }
        },
        availabilityDataLoading: false
      })

      expect(
        screen.getByTestId('parallel-interviews-section')
      ).toBeInTheDocument()

      expect(CandidateCommitmentDetailsSectionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          commitmentDetailsData: {
            acquireHighPriorityLockOperation: {
              __typename: 'Operation',
              callable: 'HIDDEN',
              messages: []
            },
            parallelEngagements: {
              nodes: [
                {
                  commitment: 'FULL_TIME',
                  id: '123'
                }
              ]
            }
          }
        }),
        {}
      )
    })
  })

  describe('when availability step data is loading', () => {
    it(`renders the section loader`, () => {
      renderComponent({ availabilityStepDataLoading: true })

      expect(screen.getByTestId('section-loader')).toBeInTheDocument()
      expect(
        screen.queryByTestId('candidate-sending-form')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('candidate-sending-commitment-details-section')
      ).not.toBeInTheDocument()
    })
  })
})
