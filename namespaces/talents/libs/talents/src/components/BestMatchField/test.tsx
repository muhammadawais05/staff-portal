import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper, assertOnTooltip } from '@staff-portal/test-utils'

import BestMatchField, { Props } from './BestMatchField'

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useUserDateFormatter: () => jest.fn(() => '20 Nov 2021')
}))

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <BestMatchField {...props} />
    </TestWrapper>
  )

describe('BestMatchField', () => {
  it('renders best match rate with tooltip', () => {
    arrangeTest({
      totalRanked: 900,
      bestMatchScoreRank: 3,
      bestMatchScore: 0.656
    })

    expect(screen.getByText('9.9/10')).toBeInTheDocument()

    const bestMatchIcon = screen.getByTestId('best-match-tooltip')

    assertOnTooltip(bestMatchIcon, tooltip => {
      expect(tooltip).toHaveTextContent('Best Match Score: 65.60% (4 of 900)')
    })
  })

  it('renders appropriate message when no best match score provided', () => {
    arrangeTest({
      totalRanked: 900,
      bestMatchScoreRank: 899,
      bestMatchScore: undefined
    })

    expect(screen.getByText(/no best match data/i)).toBeInTheDocument()

    const icon = screen.getByTestId('best-match-tooltip')

    assertOnTooltip(icon, tooltip => {
      expect(tooltip).toHaveTextContent('Best Match Score: 0.00% (900 of 900)')
    })
  })
})
