import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Tooltip } from '@toptal/picasso'

import { createTalentForRateChangeRequestMock } from '../../data/rate-change-request-fragment/mocks'
import { RateFieldTooltip } from '../../components'
import RateChangeRequestValue from './RateChangeRequestValue'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Tooltip: jest.fn()
}))

const tooltipMock = Tooltip as unknown as jest.Mock

const talent = createTalentForRateChangeRequestMock({
  type: 'Developer',
  rateRecommendation: {
    meanWeek: '375.00',
    meanHour: '75.00',
    quantity: 65
  }
})

const arrangeTest = (props: ComponentProps<typeof RateChangeRequestValue>) =>
  render(
    <TestWrapper>
      <RateChangeRequestValue {...props} />
    </TestWrapper>
  )

describe('RateChangeRequestValue', () => {
  beforeEach(() => {
    tooltipMock.mockReturnValueOnce(null)
  })

  it('renders current and desired rate when outcome rate is not provided', () => {
    arrangeTest({
      currentRate: '50.00',
      desiredRate: '100.00',
      talent
    })

    expect(screen.getByTestId('current-rate')).toHaveTextContent('$50.00')
    expect(screen.getByTestId('desired-rate')).toHaveTextContent('$100.00')
    expect(
      screen.queryByTestId('desired-rate-rejected')
    ).not.toBeInTheDocument()
    expect(screen.queryByTestId('outcome-rate')).not.toBeInTheDocument()
  })

  it('renders current and outcome rate when desired rate is equal to outcome rate', () => {
    arrangeTest({
      currentRate: '50.00',
      desiredRate: '100.00',
      outcomeRate: '100.00',
      talent
    })

    expect(screen.getByTestId('current-rate')).toHaveTextContent('$50.00')
    expect(screen.getByTestId('outcome-rate')).toHaveTextContent('$100.00')
    expect(screen.queryByTestId('desired-rate')).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('desired-rate-rejected')
    ).not.toBeInTheDocument()
  })

  it('renders current rate, rejected desired rate and outcome rate when outcome rate is different than desired', () => {
    arrangeTest({
      currentRate: '50.00',
      desiredRate: '100.00',
      outcomeRate: '75.00',
      talent
    })

    expect(screen.getByTestId('current-rate')).toHaveTextContent('$50.00')
    expect(screen.getByTestId('desired-rate-rejected')).toHaveTextContent(
      '$100.00'
    )
    expect(screen.getByTestId('outcome-rate')).toHaveTextContent('$75.00')
    expect(screen.queryByTestId('desired-rate')).not.toBeInTheDocument()
  })

  it('renders tooltip when rate recommendation is provided', () => {
    arrangeTest({
      currentRate: '50.00',
      desiredRate: '100.00',
      talent
    })

    expect(tooltipMock).toHaveBeenCalledWith(
      expect.objectContaining({
        content: expect.objectContaining({
          type: RateFieldTooltip,
          props: {
            talentType: talent.type,
            rateRecommendation: talent.rateRecommendation
          }
        })
      }),
      {}
    )
  })

  it('renders tooltip with message when rate recommendation is not provided', () => {
    arrangeTest({
      currentRate: '50.00',
      desiredRate: '100.00',
      talent: {
        ...talent,
        rateRecommendation: undefined
      }
    })

    expect(tooltipMock).toHaveBeenCalledWith(
      expect.objectContaining({
        content: expect.stringMatching(
          "Can't calculate average rate for this region"
        )
      }),
      {}
    )
  })

  it('does not render tooltip when rate recommendation is unauthorized', () => {
    arrangeTest({
      currentRate: '50.00',
      desiredRate: '100.00',
      outcomeRate: '75.00',
      talent,
      rateRecommendationUnauthorized: true
    })

    expect(tooltipMock).not.toHaveBeenCalled()
  })
})
