import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import Error from './Error'

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <Error />
    </TestWrapper>
  )
}

describe('AsyncTooltipError', () => {
  it('renders proper message', () => {
    arrangeTest()

    expect(
      screen.getByText('Something went wrong. Please try again later.')
    ).toBeInTheDocument()
  })
})
