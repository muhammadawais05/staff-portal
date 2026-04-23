import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useUserDateFormatter } from '@staff-portal/current-user'

import CommunityLeaderEvents from './CommunityLeaderEvents'
import { useGetCommunityLeaderEvents } from '../../data/get-community-leader-events/get-community-leader-events.staff.gql'
import { mockEvent } from './mock'

jest.mock(
  '../../data/get-community-leader-events/get-community-leader-events.staff.gql',
  () => ({
    useGetCommunityLeaderEvents: jest.fn()
  })
)

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useUserDateFormatter: jest.fn()
}))

const mockedUseUserDateFormatter = useUserDateFormatter as jest.Mock

const mockUseGetCommunityLeaderEvents = useGetCommunityLeaderEvents as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <CommunityLeaderEvents communityLeaderId='1234' />
    </TestWrapper>
  )

describe('CommunityLeaderEvents', () => {
  it('renders loading skeleton', () => {
    mockUseGetCommunityLeaderEvents.mockReturnValueOnce({
      loading: true,
      data: undefined,
      error: null
    })

    arrangeTest()

    expect(screen.getAllByTestId('event-loading')).toHaveLength(4)
  })

  it('renders error message', () => {
    mockUseGetCommunityLeaderEvents.mockReturnValueOnce({
      loading: false,
      data: [],
      error: 'Oops...'
    })

    arrangeTest()

    expect(
      screen.getByText('Oops... something went wrong while loading events!')
    ).toBeInTheDocument()
  })

  it('renders an online event', () => {
    mockUseGetCommunityLeaderEvents.mockReturnValueOnce({
      loading: false,
      data: [mockEvent],
      error: null
    })

    mockedUseUserDateFormatter.mockImplementation(() =>
      jest.fn(() => 'Nov 17, 2019')
    )

    arrangeTest()

    expect(screen.getByText('Toptal Meet & Greet')).toBeInTheDocument()
    expect(screen.getByText('Astana')).toBeInTheDocument()
    expect(screen.getByText(', Kazakhstan')).toBeInTheDocument()
    expect(screen.getByText('Nov 17, 2019')).toBeInTheDocument()
  })
})
