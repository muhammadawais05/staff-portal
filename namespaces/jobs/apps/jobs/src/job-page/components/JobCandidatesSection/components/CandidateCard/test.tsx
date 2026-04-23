import React from 'react'
import { screen, render } from '@testing-library/react'
import { BillCycle } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { JobEngagementCandidateFragment } from '../JobCandidatesSection/data/get-job-candidates.staff.gql.types'
import { useGetCandidateCard } from './data/get-candidate-card.staff.gql'
import CandidateCard from './CandidateCard'

const TALENT_AVATAR_ID = 'talent-avatar'
const TALENT_NAME = "Carolyne D'Amore"
const ENGAGEMENT_ID = 'xyz'
const COMPANY_RATE_FIELD_ID = 'company-rate-field'
const BILLING_TERMS_FIELD_ID = 'billing-terms-field'
const COMMITMENT_FIELD_ID = 'commitment-field'
const STATUS_FIELD_ID = 'status-field'
const GENERIC_RATE_FIELD_ID = 'generic-rate-field'
const TRIAL_LENGTH_FIELD_ID = 'trial-length-field'

jest.mock('./data/get-candidate-card.staff.gql', () => ({
  useGetCandidateCard: jest.fn()
}))

jest.mock('@staff-portal/talents', () => ({
  TalentAvatar: () => <div data-testid={TALENT_AVATAR_ID} />
}))

jest.mock('@staff-portal/engagements', () => ({
  CompanyRateField: () => <span data-testid={COMPANY_RATE_FIELD_ID} />,
  EngagementBillingTerms: () => <span data-testid={BILLING_TERMS_FIELD_ID} />,
  EngagementCommitment: () => <span data-testid={COMMITMENT_FIELD_ID} />,
  GenericRateField: () => <span data-testid={GENERIC_RATE_FIELD_ID} />,
  TrialLengthField: () => <span data-testid={TRIAL_LENGTH_FIELD_ID} />
}))

jest.mock('@staff-portal/engagements-interviews', () => ({
  EngagementStatus: { Detailed: () => <span data-testid={STATUS_FIELD_ID} /> }
}))

const defaultEngagement = {
  id: 'VjEtRW5nYWdlbWVu',
  currentCommitment: {
    availability: 'full_time',
    canBeDiscounted: true,
    adjustedTalentRate: {
      availability: 'WEEK',
      value: '3800.0'
    },
    adjustedRevenueRate: {
      availability: 'WEEK',
      value: '1612.6'
    },
    adjustedCompanyRate: {
      availability: 'WEEK',
      value: '5580.0'
    }
  },
  billCycle: BillCycle.BI_WEEKLY,
  trialLength: 5,
  operations: {
    changeEngagementTrialLength: {
      callable: 'ENABLED',
      messages: []
    }
  },
  talent: {
    id: 'VjEtVGFsZW50LTU5OTgxNw',
    type: 'Designer',
    photo: null,
    fullName: TALENT_NAME,
    resumeUrl: 'https://resume-url',
    webResource: {
      url: 'https://talent-url'
    }
  }
} as unknown as JobEngagementCandidateFragment

const useGetCandidateCardMock = useGetCandidateCard as jest.Mock

const arrangeTest = (
  loading = false,
  engagement: JobEngagementCandidateFragment | null = null
) => {
  useGetCandidateCardMock.mockImplementation(() => ({
    engagement,
    loading
  }))

  render(
    <TestWrapper>
      <CandidateCard engagementId={ENGAGEMENT_ID} />
    </TestWrapper>
  )
}

describe('CandidateCard', () => {
  it('renders candidate card fields', () => {
    arrangeTest(false, defaultEngagement)

    expect(screen.getByTestId('candidate-card')).toBeInTheDocument()
    expect(screen.getByTestId(TALENT_AVATAR_ID)).toBeInTheDocument()
    expect(screen.getByTestId(COMPANY_RATE_FIELD_ID)).toBeInTheDocument()
    expect(screen.getByTestId(BILLING_TERMS_FIELD_ID)).toBeInTheDocument()
    expect(screen.getByTestId(COMMITMENT_FIELD_ID)).toBeInTheDocument()
    expect(screen.getByTestId(STATUS_FIELD_ID)).toBeInTheDocument()
    expect(screen.getAllByTestId(GENERIC_RATE_FIELD_ID)).toHaveLength(2)
    expect(screen.getByTestId(TRIAL_LENGTH_FIELD_ID)).toBeInTheDocument()
  })

  it('renders candidate skeleton loader', () => {
    arrangeTest(true)
    expect(screen.getByTestId('candidate-card-loader')).toBeInTheDocument()
    expect(screen.queryByTestId('candidate-card')).not.toBeInTheDocument()
  })
})
