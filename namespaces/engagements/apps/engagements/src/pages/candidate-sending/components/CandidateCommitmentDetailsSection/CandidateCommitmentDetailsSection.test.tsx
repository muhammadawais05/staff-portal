import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { createTalentAvailabilityFragmentMock } from '@staff-portal/talents/src/mocks'
import {
  EngagementCommitmentEnum,
  JobEstimatedLengths
} from '@staff-portal/graphql/staff'

import {
  convertObjectToSelectOptions,
  getTrialLengthOptions
} from '../../utils'
import CandidateCommitmentDetailsSection from './CandidateCommitmentDetailsSection'
import useCandidateSendingContext from '../../hooks/use-candidate-sending-context'
import useGetJobCandidateData from '../../hooks/use-get-job-candidate-data'
import useGetTalentCandidateData from '../../hooks/use-get-talent-candidate-data'
import { AvailabilityStepTalentAvailabilityDataFragment } from '../../data/get-availability-step-talent-availability-data'

jest.mock('../../utils')
const mockConvertObjectToSelectOptions =
  convertObjectToSelectOptions as jest.Mock
const mockGetTrialLengthOptions = getTrialLengthOptions as jest.Mock

jest.mock('../../hooks/use-candidate-sending-context')
jest.mock('../../hooks/use-get-job-candidate-data')
jest.mock('../../hooks/use-get-talent-candidate-data')

const mockUseCandidateSendingContext = useCandidateSendingContext as jest.Mock
const mockUseGetJobCandidateData = useGetJobCandidateData as jest.Mock
const mockUseGetTalentCandidateData = useGetTalentCandidateData as jest.Mock

const renderComponent = () => {
  mockConvertObjectToSelectOptions.mockReturnValue([])
  mockGetTrialLengthOptions.mockReturnValue([])
  mockUseCandidateSendingContext.mockReturnValue({
    hasPendingAssignment: false,
    talentId: '123',
    setStepAttributes: jest.fn()
  })
  mockUseGetJobCandidateData.mockReturnValue({
    jobData: {
      client: {
        webResource: {
          url: 'url',
          text: 'Client Name',
          __typename: 'Link'
        }
      },
      webResource: {
        url: 'url',
        text: 'Job Title',
        __typename: 'Link'
      }
    },
    jobDataLoading: false
  })
  mockUseGetTalentCandidateData.mockReturnValue({
    talentData: {},
    talentDataLoading: false
  })

  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <CandidateCommitmentDetailsSection
          commitmentDetailsData={{
            acquireHighPriorityLockOperation: createOperationMock(),
            commitment: EngagementCommitmentEnum.HOURLY,
            commitmentTooLow: false,
            lockOverrideRequired: false,
            job: {
              id: '123',
              estimatedLength: JobEstimatedLengths.LENGTH_1_2_WEEKS
            },
            parallelEngagements: {
              nodes: []
            }
          }}
          availabilityData={{
            talent: createTalentAvailabilityFragmentMock({
              type: 'Designer'
            }) as AvailabilityStepTalentAvailabilityDataFragment['talent']
          }}
          availabilityDataLoading={false}
          onCommitmentChange={jest.fn()}
        />
      </Form>
    </TestWrapper>
  )
}

describe('CandidateCommitmentDetailsSection', () => {
  it('renders the components', () => {
    renderComponent()

    expect(screen.getByText('Job Title')).toBeInTheDocument()
    expect(screen.getByText('Engagement commitment')).toBeInTheDocument()
    expect(screen.getByText('Estimated length')).toBeInTheDocument()
    expect(
      screen.getByText('How long will trial period be?')
    ).toBeInTheDocument()
  })
})
