import React from 'react'
import { render, screen } from '@testing-library/react'
import { NO_VALUE } from '@staff-portal/config'
import { TestWrapper, assertOnTooltip } from '@staff-portal/test-utils'

import TalentRateField, { Props } from './TalentRateField'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <TalentRateField {...props} />
    </TestWrapper>
  )

describe('TalentRateField', () => {
  it('render talent hourly rate', () => {
    arrangeTest({
      talentHourlyRate: '40',
      clientRates: {
        hourlyRate: '80',
        weeklyRateFullTime: '1000',
        weeklyRatePartTime: '500'
      }
    })

    expect(screen.getByText('$40.00/h')).toBeInTheDocument()
  })

  it('render tooltip with client rates', () => {
    arrangeTest({
      talentHourlyRate: '40',
      clientRates: {
        hourlyRate: '80',
        weeklyRateFullTime: '1000',
        weeklyRatePartTime: '500'
      }
    })

    const hourlyRateIcon = screen.getByTestId('hourly-rate-tooltip')

    assertOnTooltip(hourlyRateIcon, tooltip => {
      expect(tooltip).toHaveTextContent(/company rates/i)
      expect(tooltip).toHaveTextContent(/hourly/i)
      expect(tooltip).toHaveTextContent('$80.00/h')
      expect(tooltip).toHaveTextContent(/part-time/i)
      expect(tooltip).toHaveTextContent('$500.00/week')
      expect(tooltip).toHaveTextContent(/full-time/i)
      expect(tooltip).toHaveTextContent('$1,000.00/week')
    })
  })

  it('shows requested hourly rate over talent hourly rate when it is defined', () => {
    arrangeTest({
      talentHourlyRate: '40',
      requestedHourlyRate: '50',
      clientRates: {
        hourlyRate: '80',
        weeklyRateFullTime: '1000',
        weeklyRatePartTime: '500'
      }
    })

    expect(screen.getByText('$50.00/h')).toBeInTheDocument()
  })

  it('displays value rate comparison when requested rate is different than hourly rate', () => {
    arrangeTest({
      talentHourlyRate: '40',
      requestedHourlyRate: '50',
      clientRates: {
        hourlyRate: '80',
        weeklyRateFullTime: '1000',
        weeklyRatePartTime: '500'
      }
    })

    const hourlyRateIcon = screen.getByTestId('hourly-rate-tooltip')

    assertOnTooltip(hourlyRateIcon, tooltip => {
      expect(tooltip).toHaveTextContent(
        `Talent updated their rate for this job: $40.00/h → $50.00/h`
      )
    })
  })

  it('render empty value if no hourly rate provided', () => {
    arrangeTest({})

    expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
  })
})
