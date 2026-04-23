import { render } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import {
  useGetMaxHourlyRateEnhancementsExperiments,
  useGetAggregatedTalentClientHourlyRates
} from '@staff-portal/jobs'

import JobMaximumHourlyRateWrapper from './JobMaximumHourlyRateWrapper'

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

const renderComponent = () => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <JobMaximumHourlyRateWrapper fieldOptions={<div>Checkboxes here</div>}>
          <div>Max hourly rate field here</div>
        </JobMaximumHourlyRateWrapper>
      </Form>
    </TestWrapper>
  )
}

const enabledExperiment = {
  experiments: {
    maxHourlyRateEnhancements: {
      enabled: true
    }
  }
}

describe('JobMaximumHourlyRateWrapper', () => {
  beforeEach(() => {
    mockedUseGetAggregatedTalentClientHourlyRates.mockReturnValue({
      loading: false,
      data: {
        rates1: [],
        rates5: []
      }
    })
  })

  it('displays fieldsOptions and field', () => {
    mockedUseGetMaxHourlyRateEnhancementsExperiments.mockReturnValue(
      enabledExperiment
    )
    const { getByTestId } = renderComponent()

    expect(
      getByTestId('job-max-hourly-rate-widgets-field-options')
    ).toHaveTextContent('Checkboxes here')
    expect(getByTestId('job-max-hourly-rate-widgets-field')).toHaveTextContent(
      'Max hourly rate field here'
    )
  })
})
