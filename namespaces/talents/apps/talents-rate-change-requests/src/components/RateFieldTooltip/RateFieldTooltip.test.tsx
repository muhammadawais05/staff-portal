import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import RateFieldTooltip from './RateFieldTooltip'

const arrangeTest = (props: ComponentProps<typeof RateFieldTooltip>) =>
  render(
    <TestWrapper>
      <RateFieldTooltip {...props} />
    </TestWrapper>
  )

describe('RateFieldTooltip', () => {
  it('renders current and desired rate when outcome rate is not provided', () => {
    const { container } = arrangeTest({
      talentType: 'Developer',
      rateRecommendation: {
        meanWeek: '375.00',
        meanHour: '75.00',
        quantity: 65
      }
    })

    expect(container).toHaveTextContent(
      'Average rate for Developers in this region is $375.00/week, $75.00/hour.'
    )

    expect(container).toHaveTextContent(
      'Average determined by the rates of 65 active freelancers.'
    )
  })
})
