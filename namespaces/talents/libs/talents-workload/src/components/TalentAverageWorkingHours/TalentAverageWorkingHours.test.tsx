import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import TalentAverageWorkingHours from './TalentAverageWorkingHours'

const arrangeTest = (hours?: number | null) => {
  return render(
    <TestWrapper>
      <TalentAverageWorkingHours hours={hours} />
    </TestWrapper>
  )
}

describe('TalentAverageWorkingHours', () => {
  it('contains 0 value when it is undefined', () => {
    const {
      container: { textContent }
    } = arrangeTest(undefined)

    expect(textContent).toContain('0 hours')
  })

  it('contains 0 value when it is null', () => {
    const {
      container: { textContent }
    } = arrangeTest(null)

    expect(textContent).toContain('0 hours')
  })

  it('contains 0 value and tooltip', () => {
    const {
      container: { textContent }
    } = arrangeTest(0)

    expect(textContent).toContain('0 hours')

    assertOnTooltipText(
      screen.getByTestId('info-icon'),
      'Average number of hours billed over past 3 weeks.'
    )
  })

  it('contains a value and a tooltip', () => {
    const {
      container: { textContent }
    } = arrangeTest(45)

    expect(textContent).toContain('45 hours')

    assertOnTooltipText(
      screen.getByTestId('info-icon'),
      'Average number of hours billed over past 3 weeks.'
    )
  })
})
