import { getCurrentDateString } from '@staff-portal/date-time-utils'

import { engagementCommitmentDataMock } from './mocks'
import { getEngagementCommitmentData } from './get-engagement-commitment-data'

jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  getCurrentDateString: jest.fn()
}))

const mockGetCurrentDateString = getCurrentDateString as jest.Mock

describe('getEngagementCommitmentData', () => {
  beforeEach(() => {
    mockGetCurrentDateString.mockImplementation(() => '2022-04-01')
  })

  it('returns currentCommitment when start date is undefined', () => {
    engagementCommitmentDataMock.startDate = undefined
    const rates = getEngagementCommitmentData(engagementCommitmentDataMock)

    expect(rates?.adjustedCompanyRate.value).toBe('168.0')
    expect(rates?.adjustedRevenueRate.value).toBe('62.96')
    expect(rates?.adjustedTalentRate.value).toBe('100.0')
  })

  it('returns currentCommitment when start and current dates are equal', () => {
    engagementCommitmentDataMock.startDate = '2022-04-01'
    const rates = getEngagementCommitmentData(engagementCommitmentDataMock)

    expect(rates?.adjustedCompanyRate.value).toBe('168.0')
    expect(rates?.adjustedRevenueRate.value).toBe('62.96')
    expect(rates?.adjustedTalentRate.value).toBe('100.0')
  })

  it('returns commitmentAtStartDate when start date in future', () => {
    engagementCommitmentDataMock.startDate = '2022-04-02'
    const rates = getEngagementCommitmentData(engagementCommitmentDataMock)

    expect(rates?.adjustedCompanyRate.value).toBe('297.0')
    expect(rates?.adjustedRevenueRate.value).toBe('88.09')
    expect(rates?.adjustedTalentRate.value).toBe('200.0')
  })
})
