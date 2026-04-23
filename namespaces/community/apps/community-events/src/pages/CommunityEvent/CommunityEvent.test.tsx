import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'

import CommunityEvent from './CommunityEvent'
import { useGetCommunityEvent } from '../../data/get-community-event/get-community-event.staff.gql'
import CommunityEventListItem from '../../components/CommunityEventListItem/CommunityEventListItem'
import { FAKE_COMMUNITY_EVENTS } from '../../mocks'

jest.mock('../../data/get-community-event/get-community-event.staff.gql')
jest.mock('../../components/CommunityEventListItem/CommunityEventListItem')
jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useParams: () => 'community-event-id'
}))

const useGetCommunityEventMock = useGetCommunityEvent as jest.Mock
const CommunityEventListItemMock = CommunityEventListItem as jest.Mock

describe('CommunityEvent', () => {
  beforeEach(() => {
    CommunityEventListItemMock.mockReturnValue(<div />)
  })

  it('renders while fetching data', () => {
    useGetCommunityEventMock.mockReturnValue({
      loading: true,
      data: undefined
    })

    render(
      <TestWrapper>
        <CommunityEvent />
      </TestWrapper>
    )

    expect(screen.getAllByTestId('community-event-list-loader')).toHaveLength(1)
    expect(CommunityEventListItemMock).not.toHaveBeenCalled()
  })

  it('renders when there is no data', () => {
    useGetCommunityEventMock.mockReturnValue({
      loading: false,
      data: undefined
    })

    render(
      <TestWrapper>
        <CommunityEvent />
      </TestWrapper>
    )

    expect(
      screen.queryByTestId('community-event-list-loader')
    ).not.toBeInTheDocument()
    expect(screen.getByText('Community Event Not Found')).toBeInTheDocument()
    expect(CommunityEventListItemMock).not.toHaveBeenCalled()
  })

  it('renders after data is fetched', () => {
    const [firstEvent] = FAKE_COMMUNITY_EVENTS

    useGetCommunityEventMock.mockReturnValue({
      loading: false,
      data: firstEvent
    })

    render(
      <TestWrapper>
        <CommunityEvent />
      </TestWrapper>
    )

    expect(
      screen.queryByTestId('community-event-list-loader')
    ).not.toBeInTheDocument()
    expect(CommunityEventListItemMock).toHaveBeenCalledWith(
      { communityEvent: firstEvent, hideLink: true },
      {}
    )
    expect(
      screen.getByRole('button', { name: '5 attendees' })
    ).toBeInTheDocument()
  })
})
