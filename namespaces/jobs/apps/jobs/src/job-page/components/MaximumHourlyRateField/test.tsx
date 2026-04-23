import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { JobBudgetDetails } from '@staff-portal/graphql/staff'
import { TestWrapper, assertOnTooltip } from '@staff-portal/test-utils'
import {
  useGetAggregatedTalentClientHourlyRates,
  useGetMaxHourlyRateEnhancementsExperiments
} from '@staff-portal/jobs'

import MaximumHourlyRateField, { Props } from './MaximumHourlyRateField'
import { JobDetailsInformationFragment } from '../JobDetailsSection/components/JobDetailsInformation/data/get-job-details-information/get-job-details-information.staff.gql.types'

jest.mock(
  '@staff-portal/jobs/src/components/JobMaxHourlyRateWidgets/data/get-max-hourly-rate-enabled/get-max-hourly-rate-enabled.staff.gql.ts'
)
jest.mock(
  '@staff-portal/jobs/src/components/JobMaxHourlyRateWidgets/data/get-aggregated-talent-client-hourly-rates/get-aggregated-talent-client-hourly-rates.staff.gql'
)

const mockedUseGetAggregatedTalentClientHourlyRates =
  useGetAggregatedTalentClientHourlyRates as jest.Mock

const mockedUseGetMaxHourlyRateEnhancementsExperiments =
  useGetMaxHourlyRateEnhancementsExperiments as jest.Mock

const arrangeTest = (props: Props) => {
  return render(
    <TestWrapper>
      <MaximumHourlyRateField {...props} />
    </TestWrapper>
  )
}

describe('MaximumHourlyRateField', () => {
  it("renders 'No rate limit'", () => {
    arrangeTest({
      budgetDetails: JobBudgetDetails.NO_RATE_LIMIT
    })

    expect(
      screen.getByTestId('job-information-max-hourly-rate')
    ).toHaveTextContent('No rate limit')
  })

  it("renders 'Uncertain of budget' text with reason tooltip", () => {
    const uncertainOfBudgetReason = 'Other'
    const uncertainOfBudgetReasonComment = 'Test comment'

    arrangeTest({
      budgetDetails: JobBudgetDetails.UNCERTAIN_OF_BUDGET,
      uncertainOfBudgetReason,
      uncertainOfBudgetReasonComment
    })

    expect(
      screen.getByTestId('job-information-max-hourly-rate')
    ).toHaveTextContent('Uncertain of budget')

    const tooltipIcon = screen.getByTestId(
      'job-information-max-hourly-rate-icon'
    )

    assertOnTooltip(tooltipIcon, tooltip => {
      expect(tooltip).toHaveTextContent(uncertainOfBudgetReason)
      expect(tooltip).toHaveTextContent(uncertainOfBudgetReasonComment)
    })
  })

  it('renders maximum hourly rate value', () => {
    arrangeTest({
      budgetDetails: JobBudgetDetails.RATE_SPECIFIED,
      maxHourlyRate: 123
    })

    expect(
      screen.getByTestId('job-information-max-hourly-rate')
    ).toHaveTextContent('$123.00/hour')
  })

  it('renders max hourly rate widgets', () => {
    mockedUseGetAggregatedTalentClientHourlyRates.mockReturnValue({
      loading: false,
      data: {
        rates1: Array.from({ length: 500 }).map((number, index) => ({
          from: index,
          to: index + 1,
          count: index
        })),
        rates5: Array.from({ length: 100 }).map((number, index) => ({
          from: index * 5,
          to: (index + 1) * 5,
          count: index
        }))
      }
    } as ReturnType<typeof useGetAggregatedTalentClientHourlyRates>)

    mockedUseGetMaxHourlyRateEnhancementsExperiments.mockReturnValue({
      loading: false,
      experiments: {
        maxHourlyRateEnhancements: {
          enabled: true
        }
      }
    } as ReturnType<typeof useGetMaxHourlyRateEnhancementsExperiments>)

    arrangeTest({
      budgetDetails: JobBudgetDetails.RATE_SPECIFIED,
      maxHourlyRate: 100,
      job: {
        commitment: 'HOURLY',
        verticalId: {
          id: 'id'
        },
        skillSets: [],
        maxHourlyRate: 30
      } as unknown as JobDetailsInformationFragment
    })

    expect(screen.getByTestId('TalentPoolProgressBar')).toBeInTheDocument()
  })
})
