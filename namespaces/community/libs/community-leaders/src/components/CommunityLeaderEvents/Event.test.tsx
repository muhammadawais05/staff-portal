import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useUserDateFormatter } from '@staff-portal/current-user'

import { Event } from './Event'
import { CommunityEventData } from '../../types'
import { mockEvent } from './mock'

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useUserDateFormatter: jest.fn()
}))

const mockedUseUserDateFormatter = useUserDateFormatter as jest.Mock

describe('Event', () => {
  it('renders an Event', () => {
    mockedUseUserDateFormatter.mockImplementation(() =>
      jest.fn(() => 'Jul 8, 2019')
    )

    render(
      <TestWrapper>
        <Event event={mockEvent as CommunityEventData} />
      </TestWrapper>
    )

    expect(screen.getByText('Toptal Meet & Greet')).toBeInTheDocument()
    expect(screen.getByText('Astana')).toBeInTheDocument()
    expect(screen.getByText(', Kazakhstan')).toBeInTheDocument()
    expect(screen.getByText('Jul 8, 2019')).toBeInTheDocument()
  })
})
