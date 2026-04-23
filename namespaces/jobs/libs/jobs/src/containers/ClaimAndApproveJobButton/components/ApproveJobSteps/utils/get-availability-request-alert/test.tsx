import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { getAvailabilityRequestAlert } from './get-availability-request-alert'

const arrangeTest = (numberLimit?: number, hoursLimit?: number) =>
  render(
    <TestWrapper>
      {getAvailabilityRequestAlert(numberLimit, hoursLimit)}
    </TestWrapper>
  )

describe('getAvailabilityRequestAlert', () => {
  it('returns correct alert message', () => {
    arrangeTest(2, 24)

    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('24 hours')).toBeInTheDocument()
  })
})
