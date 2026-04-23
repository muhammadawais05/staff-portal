import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import AddJobButton from './AddJobButton'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useModal: () => ({ showModal: jest.fn, hideModal: jest.fn, isOpen: true })
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <AddJobButton />
    </TestWrapper>
  )

describe('AddJobButton', () => {
  it('renders button and modal when it is open', () => {
    arrangeTest()

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByTestId('add-job-button')).toBeInTheDocument()
  })
})
