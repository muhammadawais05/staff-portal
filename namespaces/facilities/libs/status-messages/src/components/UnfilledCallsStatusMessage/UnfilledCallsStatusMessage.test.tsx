import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetUnfilledCallsCount } from './data'
import UnfilledCallsStatusMessage from '.'

jest.unmock('@staff-portal/editable')

jest.mock('./data', () => ({
  __esModule: true,
  useGetUnfilledCallsCount: jest.fn()
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <UnfilledCallsStatusMessage />
    </TestWrapper>
  )

const mockUseGetUnfilledCallsCount = useGetUnfilledCallsCount as jest.Mock

describe('UnfilledCallsStatusMessage', () => {
  it('renders nothing when no unfilled calls', () => {
    mockUseGetUnfilledCallsCount.mockReturnValue({ data: 0 })

    arrangeTest()

    expect(
      screen.queryByTestId('status-message-unfilled-calls-message')
    ).not.toBeInTheDocument()
  })

  it('renders message when unfilled calls exist', () => {
    mockUseGetUnfilledCallsCount.mockReturnValue({ data: 10 })

    arrangeTest()

    expect(
      screen.getByTestId('status-message-unfilled-calls-message')
    ).toHaveTextContent('You have 10 recent calls with missing information')
  })
})
