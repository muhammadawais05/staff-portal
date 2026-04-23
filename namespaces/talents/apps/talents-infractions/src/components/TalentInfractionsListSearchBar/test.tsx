import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Filters } from '@staff-portal/filters'

import TalentInfractionsListSearchBar from './TalentInfractionsListSearchBar'

const arrangeTest = () =>
  render(
    <TestWrapper>
      <Filters>
        {nestableControls => (
          <TalentInfractionsListSearchBar nestableControls={nestableControls} />
        )}
      </Filters>
    </TestWrapper>
  )

describe('TalentInfractionsListSearchBar', () => {
  it('renders nestable controls', () => {
    arrangeTest()
    expect(screen.queryByText('Keywords')).toBeInTheDocument()
    expect(screen.queryByTestId('search-input')).toBeInTheDocument()
    expect(screen.queryByTestId('toggle-filters-form')).toBeInTheDocument()
  })
})
