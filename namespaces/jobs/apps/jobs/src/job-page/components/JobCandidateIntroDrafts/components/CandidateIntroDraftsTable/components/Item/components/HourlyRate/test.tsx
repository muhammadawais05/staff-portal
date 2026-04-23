import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import HourlyRate from './HourlyRate'

const arrangeTest = () => {
  render(
    <TestWrapper>
      <HourlyRate hourlyRate='123' />
    </TestWrapper>
  )
}

describe('HourlyRate', () => {
  it('shows formatted hourly rate', () => {
    arrangeTest()
    expect(screen.queryByText('$123.00/h')).toBeInTheDocument()
  })
})
