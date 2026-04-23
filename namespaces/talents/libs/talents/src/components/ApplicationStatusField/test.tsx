import React from 'react'
import { render, screen } from '@testing-library/react'
import { NO_VALUE } from '@staff-portal/config'
import { TestWrapper } from '@staff-portal/test-utils'

import ApplicationStatusField from './ApplicationStatusField'

const arrangeTest = () => {
  render(
    <TestWrapper>
      <ApplicationStatusField />
    </TestWrapper>
  )
}

describe('ApplicationStatusField', () => {
  it('renders no value', () => {
    arrangeTest()

    expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
  })
})
