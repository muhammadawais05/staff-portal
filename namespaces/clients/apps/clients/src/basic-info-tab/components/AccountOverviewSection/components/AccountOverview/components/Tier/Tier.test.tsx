import React from 'react'
import { render, screen } from '@testing-library/react'
import { ClientTier } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import Tier from '.'

describe('Tier', () => {
  it.each([
    { value: undefined, expected: NO_VALUE },
    { value: null, expected: NO_VALUE },
    { value: ClientTier.MID_TIER, expected: 'Mid-tier' },
    { value: ClientTier.TIER_1, expected: 'Tier 1' }
  ])('renders as expected for $value', ({ value, expected }) => {
    render(
      <TestWrapper>
        <Tier value={value} />
      </TestWrapper>
    )

    expect(screen.getByText(expected)).toBeInTheDocument()
  })
})
