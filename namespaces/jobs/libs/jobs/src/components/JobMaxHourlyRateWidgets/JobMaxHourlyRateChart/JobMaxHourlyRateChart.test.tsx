import { render } from '@testing-library/react'
import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { BarChart } from '@staff-portal/charts'
import { TestWrapper } from '@staff-portal/test-utils'

import JobMaxHourlyRateChart from './JobMaxHourlyRateChart'

jest.mock('@staff-portal/charts')

const barChartMock = BarChart as jest.MockedFunction<typeof BarChart>

const rates = [
  { from: 0, to: 5, count: 5 },
  { from: 5, to: 10, count: 8 }
]

const renderComponent = () =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <JobMaxHourlyRateChart rates={rates} />
      </Form>
    </TestWrapper>
  )

describe('JobMaxHourlyRateChart', () => {
  beforeEach(() => {
    barChartMock.mockImplementation(jest.fn(() => <div />))
  })

  it('displays renders chart with correct props', async () => {
    renderComponent()

    expect(BarChart).toHaveBeenCalledTimes(1)
    expect(BarChart).toHaveBeenCalledWith(
      expect.objectContaining({
        data: [
          {
            name: '',
            value: {
              '5': 5,
              '10': 8
            }
          }
        ],
        width: 540,
        showBarLabel: false
      }),
      {}
    )
  })
})
