import { formatTrialLength } from '@staff-portal/engagements'
import {
  getEngagementDefaultStatus,
  getEngagementStatusColor
} from '@staff-portal/engagements-interviews'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'

import PitchCandidate from './PitchCandidate'
import { PitchStepDataFragment } from '../../data/get-pitch-step-data'

jest.mock('@staff-portal/engagements-interviews')
jest.mock('@staff-portal/engagements', () => ({
  ...jest.requireActual('@staff-portal/engagements'),
  formatTrialLength: jest.fn()
}))

const mockFormatTrialLength = formatTrialLength as jest.Mock
const mockGetEngagementDefaultStatus = getEngagementDefaultStatus as jest.Mock
const mockGetEngagementStatusColor = getEngagementStatusColor as jest.Mock

const MOCKED_CANDIDATE: NonNullable<PitchStepDataFragment> = {
  isPitchTextEnabled: true,
  job: {
    id: '123',
    client: {
      id: '123',
      clientPartner: {
        id: '123',
        fullName: 'John Smith',
        webResource: { text: 'Client Partner Name' }
      },
      enterprise: false,
      webResource: { text: 'Client Name' }
    },
    webResource: { text: 'Job Title' }
  },
  talent: {
    id: '123',
    type: 'Developer',
    fullName: 'Timofei Kachalov',
    resumeUrl: 'http://example.com/talent-resume-url',
    webResource: { text: 'Talent Name' }
  },
  newEngagement: {
    companyHourlyRate: '10',
    cumulativeStatus: 'Draft',
    talentHourlyRate: '20',
    trialLength: 10
  }
}

const renderComponent = ({
  candidate
}: {
  candidate?: NonNullable<PitchStepDataFragment>
} = {}) => {
  mockFormatTrialLength.mockImplementation(() => '10 business days')
  mockGetEngagementDefaultStatus.mockImplementation(() => 'Draft')
  mockGetEngagementStatusColor.mockImplementation(() => 'red')

  return render(
    <TestWrapper>
      <PitchCandidate candidate={candidate ?? MOCKED_CANDIDATE} />
    </TestWrapper>
  )
}

describe('PitchCandidate', () => {
  it('renders the pitch candidate section', () => {
    renderComponent()

    expect(
      screen.getByTestId('pitch-candidate-talent-avatar')
    ).toBeInTheDocument()

    expect(screen.getByText('View Profile')).toBeInTheDocument()
    expect(screen.getByText('Job Title')).toBeInTheDocument()
    expect(screen.getByText('Talent Name')).toBeInTheDocument()
    expect(screen.getByText('Client Name')).toBeInTheDocument()
    expect(screen.getByText('Client Partner Name')).toBeInTheDocument()
    expect(screen.getByText('Draft')).toBeInTheDocument()
    expect(screen.getByText('$10/h')).toBeInTheDocument()
    expect(screen.getByText('$20/h')).toBeInTheDocument()
    expect(screen.getByText('10 business days')).toBeInTheDocument()

    expect(
      screen.queryByText('View Job-Specific Resume')
    ).not.toBeInTheDocument()
    expect(screen.getByText('View Profile')).toBeInTheDocument()
  })

  describe('when new engagement resume url is the same as talent resume url', () => {
    it('renders `View Profile` button', () => {
      renderComponent({
        candidate: {
          ...MOCKED_CANDIDATE,
          newEngagement: {
            ...MOCKED_CANDIDATE.newEngagement,
            resumeUrl: MOCKED_CANDIDATE.talent?.resumeUrl
          }
        }
      })

      expect(
        screen.queryByText('View Job-Specific Resume')
      ).not.toBeInTheDocument()
      expect(screen.getByText('View Profile')).toBeInTheDocument()
    })
  })

  describe('when new engagement resume url is different from talent resume url', () => {
    it('renders `View Job-Specific Resume` button', () => {
      renderComponent({
        candidate: {
          ...MOCKED_CANDIDATE,
          newEngagement: {
            ...MOCKED_CANDIDATE.newEngagement,
            resumeUrl: 'http://example.com/job-specific-resume'
          }
        }
      })

      expect(screen.getByText('View Job-Specific Resume')).toBeInTheDocument()
      expect(screen.queryByText('View Profile')).not.toBeInTheDocument()
    })
  })
})
