import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import {
  ApolloError,
  createApolloError,
  GraphQLErrorCode
} from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  isExtraHoursHidden,
  isMinCommitmentVisible
} from '@staff-portal/engagements'
import { BillCycle } from '@staff-portal/graphql/staff'

import { GetEngagementTalentQuery } from './data/get-engagement-talent'
import { useGetEngagementTalent } from './data'
import EngagementTalent from './EngagementTalent'
import { createEngagementTalentMock } from './mocks'
import { getIsTalentSentAtVisible } from './utils/get-is-talent-sent-at-visible'

jest.mock('./data', () => ({
  useGetEngagementTalent: jest.fn()
}))
jest.mock('./components/PurchaseOrderField', () => ({
  __esModule: true,
  default: () => <div data-testid='PurchaseOrderField' />
}))
jest.mock('./components/TalentSentAtField', () => ({
  __esModule: true,
  default: () => <div data-testid='TalentSentAtField' />
}))
jest.mock('@staff-portal/engagements', () => ({
  CompanyRateField: () => <div data-testid='CompanyRateField' />,
  EngagementBillingTerms: () => <div data-testid='EngagementBillingTerms' />,
  EngagementCommitment: () => <div data-testid='EngagementCommitment' />,
  ExtraHoursEnabledField: () => <div data-testid='ExtraHoursEnabledField' />,
  GenericRateField: () => <div data-testid='GenericRateField' />,
  MinCommitment: () => <div data-testid='MinCommitment' />,
  TrialLengthField: () => <div data-testid='TrialLengthField' />,
  isExtraHoursHidden: jest.fn(),
  isMinCommitmentVisible: jest.fn()
}))
jest.mock('@staff-portal/engagements-interviews', () => ({
  EngagementStatus: {
    Detailed: () => <div data-testid='EngagementStatusDetailed' />
  }
}))

jest.mock('./utils/get-is-talent-sent-at-visible', () => ({
  getIsTalentSentAtVisible: jest.fn()
}))

jest.mock('@staff-portal/billing', () => ({
  PublicMessages: {
    commitmentChange: 'commitmentChange'
  }
}))

const mockReturnValues = ({
  loading = false,
  data,
  error,
  isTalentSentAtVisible = false,
  isExtraHoursHiddenValue = false,
  isMinCommitmentVisibleValue = false
}: Partial<{
  loading: boolean
  data: GetEngagementTalentQuery
  error?: ApolloError
  isTalentSentAtVisible?: boolean
  isExtraHoursHiddenValue?: boolean
  isMinCommitmentVisibleValue?: boolean
}> = {}) => {
  const mockUseGetEngagementTalent = useGetEngagementTalent as jest.Mock
  const mockGetIsTalentSentAtVisible = getIsTalentSentAtVisible as jest.Mock
  const mockIsExtraHoursHidden = isExtraHoursHidden as jest.Mock
  const mockIsMinCommitmentVisible = isMinCommitmentVisible as jest.Mock
  const returnValue = {
    loading,
    engagement: data?.node,
    error
  } as ReturnType<typeof useGetEngagementTalent>

  mockUseGetEngagementTalent.mockReturnValue(returnValue)
  mockGetIsTalentSentAtVisible.mockReturnValue(isTalentSentAtVisible)
  mockIsExtraHoursHidden.mockReturnValue(isExtraHoursHiddenValue)
  mockIsMinCommitmentVisible.mockReturnValue(isMinCommitmentVisibleValue)
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <EngagementTalent engagementId='1' />
    </TestWrapper>
  )

describe('EngagementTalent', () => {
  it('shows the skeleton loader', () => {
    const data = createEngagementTalentMock()

    mockReturnValues({ loading: true, data })
    arrangeTest()

    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument()
  })

  it('returns null if engagement is missing', () => {
    const data = createEngagementTalentMock()

    data.node = null
    mockReturnValues({ loading: false, data })
    arrangeTest()

    expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('engagement-talent-badge')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('engagement-talent-items')
    ).not.toBeInTheDocument()
  })

  it('shows the talent details', () => {
    const data = createEngagementTalentMock({
      talent: {
        fullName: 'John Doe',
        email: 'john.doe@test.com',
        type: 'FinanceExpert'
      }
    })

    mockReturnValues({
      loading: false,
      data
    })
    arrangeTest()

    expect(screen.queryByTestId('CompanyRateField')).toBeInTheDocument()
    expect(screen.queryByTestId('EngagementBillingTerms')).toBeInTheDocument()
    expect(screen.queryByTestId('EngagementCommitment')).toBeInTheDocument()
    expect(screen.queryByTestId('EngagementStatusDetailed')).toBeInTheDocument()
    expect(screen.queryByTestId('PurchaseOrderField')).toBeInTheDocument()
    expect(screen.queryAllByTestId('GenericRateField')).toHaveLength(2)

    expect(screen.getByText('Finance Expert')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john.doe@test.com')).toBeInTheDocument()
  })

  it('hides conditional fields', () => {
    const data = createEngagementTalentMock({
      talent: {
        fullName: 'John Doe',
        email: 'john.doe@test.com',
        type: 'FinanceExpert'
      },
      engagement: {
        trialLength: 0,
        billCycle: null
      }
    })

    mockReturnValues({
      loading: false,
      data,
      isExtraHoursHiddenValue: true
    })
    arrangeTest()

    expect(screen.queryByTestId('TalentSentAtField')).not.toBeInTheDocument()
    expect(screen.queryByTestId('TrialLengthField')).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('EngagementBillingTerms')
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('MinCommitment')).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('ExtraHoursEnabledField')
    ).not.toBeInTheDocument()
  })

  it('shows conditional fields', () => {
    const data = createEngagementTalentMock({
      talent: {
        fullName: 'John Doe',
        email: 'john.doe@test.com',
        type: 'FinanceExpert'
      },
      engagement: {
        trialLength: 5,
        billCycle: BillCycle.WEEKLY
      }
    })

    mockReturnValues({
      loading: false,
      data,
      isTalentSentAtVisible: true,
      isMinCommitmentVisibleValue: true,
      isExtraHoursHiddenValue: false
    })
    arrangeTest()

    expect(screen.queryByTestId('TalentSentAtField')).toBeInTheDocument()
    expect(screen.queryByTestId('TrialLengthField')).toBeInTheDocument()
    expect(screen.queryByTestId('EngagementBillingTerms')).toBeInTheDocument()
    expect(screen.queryByTestId('MinCommitment')).toBeInTheDocument()
    expect(screen.queryByTestId('ExtraHoursEnabledField')).toBeInTheDocument()
  })

  describe('Onboarding plan URL', () => {
    it("should be hidden if the user doesn't have permission", () => {
      const data = createEngagementTalentMock()

      mockReturnValues({
        loading: false,
        data,
        error: createApolloError('', GraphQLErrorCode.UNAUTHORIZED, [
          'onboardingPlanUrl'
        ])
      })
      arrangeTest()

      expect(screen.queryByText('Onboarding Plan')).not.toBeInTheDocument()
    })

    it('should be visible if the user has permission', () => {
      const data = createEngagementTalentMock()

      mockReturnValues({
        loading: false,
        data
      })
      arrangeTest()

      expect(screen.queryByText('Onboarding Plan')).toBeInTheDocument()
    })
  })

  describe('Purchase Order', () => {
    it("should be hidden if the user doesn't have permission", () => {
      const data = createEngagementTalentMock()

      mockReturnValues({
        loading: false,
        data,
        error: createApolloError('', GraphQLErrorCode.UNAUTHORIZED, [
          'purchaseOrder'
        ])
      })
      arrangeTest()

      expect(screen.queryByTestId('PurchaseOrderField')).not.toBeInTheDocument()
    })

    it('should be visible if the user has permission', () => {
      const data = createEngagementTalentMock()

      mockReturnValues({
        loading: false,
        data
      })
      arrangeTest()

      expect(screen.queryByTestId('PurchaseOrderField')).toBeInTheDocument()
    })
  })
})
