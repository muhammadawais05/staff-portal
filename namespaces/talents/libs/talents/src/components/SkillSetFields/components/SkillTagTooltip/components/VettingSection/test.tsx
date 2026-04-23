import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import {
  VettedResultQuartiles,
  VettedResultQuartileDescription,
  VettedResultQuartileColor
} from './config'
import VettingSection from './VettingSection'

const top25Color = VettedResultQuartileColor[VettedResultQuartiles.Top25]
const between25And75Color =
  VettedResultQuartileColor[VettedResultQuartiles.Between25And75]
const bottom25Color = VettedResultQuartileColor[VettedResultQuartiles.Bottom25]

const top25Description =
  VettedResultQuartileDescription[VettedResultQuartiles.Top25]
const between25And75Description =
  VettedResultQuartileDescription[VettedResultQuartiles.Between25And75]
const bottom25Description =
  VettedResultQuartileDescription[VettedResultQuartiles.Bottom25]

const arrangeTest = (value: number, threshold25: number, threshold75: number) =>
  render(
    <TestWrapper>
      <VettingSection
        label='Test'
        value={value}
        threshold25={threshold25}
        threshold75={threshold75}
      />
    </TestWrapper>
  )

describe('VettingSection', () => {
  const threshold25 = 2
  const threshold75 = 7

  it('shows Top 25% description in green when the value is above the 75% threshold', () => {
    arrangeTest(threshold75 + 1, threshold25, threshold75)

    expect(screen.getByText(top25Description)).toBeInTheDocument()
    expect(
      screen.getByTestId(`VettingSection-color:${top25Color}`)
    ).toBeInTheDocument()
  })

  it('shows Top 25% description in green when the value is equal to the 75% threshold', () => {
    arrangeTest(threshold75, threshold25, threshold75)

    expect(screen.getByText(top25Description)).toBeInTheDocument()
    expect(
      screen.getByTestId(`VettingSection-color:${top25Color}`)
    ).toBeInTheDocument()
  })

  it('shows Between 25-75% description in yellow when the value is between the 25% and 75% thresholds', () => {
    arrangeTest(
      Math.round((threshold25 + threshold75) / 2),
      threshold25,
      threshold75
    )

    expect(screen.getByText(between25And75Description)).toBeInTheDocument()
    expect(
      screen.getByTestId(`VettingSection-color:${between25And75Color}`)
    ).toBeInTheDocument()
  })

  it('shows Between 25-75% description in yellow when the value is equal to the 25% threshold', () => {
    arrangeTest(threshold25, threshold25, threshold75)

    expect(screen.getByText(between25And75Description)).toBeInTheDocument()
    expect(
      screen.getByTestId(`VettingSection-color:${between25And75Color}`)
    ).toBeInTheDocument()
  })

  it('shows Bottom 25% description in red when the value is below the 25% threshold', () => {
    arrangeTest(threshold25 - 1, threshold25, threshold75)

    expect(screen.getByText(bottom25Description)).toBeInTheDocument()
    expect(
      screen.getByTestId(`VettingSection-color:${bottom25Color}`)
    ).toBeInTheDocument()
  })
})
