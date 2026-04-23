import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@testing-library/react'

import JobMaxHourlyRateWidgets, { Props } from './JobMaxHourlyRateWidgets'
import { useGetAggregatedTalentClientHourlyRates } from './data/get-aggregated-talent-client-hourly-rates/get-aggregated-talent-client-hourly-rates.staff.gql'
import { useGetMaxHourlyRateEnhancementsExperiments } from './data/get-max-hourly-rate-enabled/get-max-hourly-rate-enabled.staff.gql'

jest.mock(
  './data/get-max-hourly-rate-enabled/get-max-hourly-rate-enabled.staff.gql.ts'
)
jest.mock(
  './data/get-aggregated-talent-client-hourly-rates/get-aggregated-talent-client-hourly-rates.staff.gql'
)

const renderComponent = (props: Props) => {
  return render(
    <TestWrapper>
      <JobMaxHourlyRateWidgets {...props} />
    </TestWrapper>
  )
}

const mockedUseGetAggregatedTalentClientHourlyRates =
  useGetAggregatedTalentClientHourlyRates as jest.Mock

const mockedUseGetMaxHourlyRateEnhancementsExperiments =
  useGetMaxHourlyRateEnhancementsExperiments as jest.Mock

describe('JobMaxHourlyRateWidgets', () => {
  beforeEach(() => {
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
  })

  it('Shows only the field when expanded === false', () => {
    const { queryByTestId } = renderComponent({
      expanded: false,
      children: <div data-testid='field'>field here</div>
    })

    expect(queryByTestId('field')).toHaveTextContent('field here')
    expect(queryByTestId('job-max-hourly-rate-slider')).not.toBeInTheDocument()
  })

  it('Shows the slider, chart and progress bar when {expanded: true, edit: true}', () => {
    const { getByTestId } = renderComponent({
      expanded: true,
      edit: true,
      children: <div data-testid='field'>field here</div>
    })

    expect(getByTestId('field')).toHaveTextContent('field here')
    expect(getByTestId('job-max-hourly-rate-slider')).toBeInTheDocument()
  })

  it('Shows the right value', () => {
    const { getByTestId, container } = renderComponent({
      expanded: true,
      edit: true,
      maxHourlyRate: 250,
      children: <div>field here</div>,
      jobCommitment: 'HOURLY',
      skillSets: []
    })

    expect(
      container.querySelector(
        '[data-testid="job-max-hourly-rate-slider"] input'
      )
    ).toHaveValue('250')
    expect(getByTestId('TalentPoolProgressBar')).toHaveTextContent(
      '25%of talent pool'
    )
  })
})
