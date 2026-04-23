import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import RateField, { Props } from './RateField'

const arrangeTest = ({
  weeklyRate = null,
  hourlyRate = null,
  type = 'Developer',
  rateRecommendation = null
}: Partial<Props>) => {
  render(
    <TestWrapper>
      <RateField
        weeklyRate={weeklyRate}
        hourlyRate={hourlyRate}
        type={type}
        rateRecommendation={rateRecommendation}
      />
    </TestWrapper>
  )
}

describe('RateField', () => {
  it('renders rates and recommendation', () => {
    const weeklyRate = { value: '1200.0', text: '$1,200.00' }
    const hourlyRate = { value: '30', text: '$30.00' }
    const type = 'Developer'
    const meanWeek = { value: '2640.0', text: '$2,640.00' }
    const meanHour = { value: '66', text: '$66.00' }
    const quantity = 3

    arrangeTest({
      weeklyRate: weeklyRate.value,
      hourlyRate: hourlyRate.value,
      type,
      rateRecommendation: {
        meanWeek: meanWeek.value,
        meanHour: meanHour.value,
        quantity
      }
    })

    const rateFieldValueText = screen.getByText(
      `${weeklyRate.text}/week, ${hourlyRate.text}/h`
    )

    expect(rateFieldValueText).toBeInTheDocument()

    const infoIcon = screen.getByTestId('info-icon')

    assertOnTooltipText(
      infoIcon,
      `Average rate for ${type}s in this region:${meanWeek.text}/week, ${meanHour.text}/hour(Average determined by the rates of ${quantity} active freelancers)`
    )
  })

  it('renders no recommendation message on tooltip', () => {
    arrangeTest({
      weeklyRate: '1234',
      hourlyRate: '123',
      rateRecommendation: null
    })

    const infoIcon = screen.getByTestId('info-icon')

    assertOnTooltipText(
      infoIcon,
      `Can't calculate average rate for this region`
    )
  })
})
