import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import OperationalIssueBadge from './OperationalIssueBadge'

const COUNT = 3

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <OperationalIssueBadge count={COUNT} />
    </TestWrapper>
  )
}

describe('OperationalIssueBadge', () => {
  it('renders with correct count', () => {
    arrangeTest()

    expect(screen.getByText(COUNT)).toBeInTheDocument()
  })
})
