import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'
import { useGetCountries } from '@staff-portal/facilities'
import { usePagination } from '@staff-portal/filters'

import CommunityEvents from './CommunityEvents'
import { useGetCommunityEvents } from '../../data/get-community-events/get-community-events.staff.gql'
import { useGetCommunityEventHosts } from '../../data/get-community-event-hosts/get-community-event-hosts.staff.gql'
import CommunityEventList from '../../components/CommunityEventList/CommunityEventList'
import { FAKE_COMMUNITY_EVENTS } from '../../mocks'

jest.mock('@staff-portal/facilities')
jest.mock('@staff-portal/filters', () => ({
  ...jest.requireActual('@staff-portal/filters'),
  usePagination: jest.fn()
}))
jest.mock('../../data/get-community-events/get-community-events.staff.gql')
jest.mock(
  '../../data/get-community-event-hosts/get-community-event-hosts.staff.gql'
)
jest.mock('../../components/CommunityEventList/CommunityEventList')

const useGetCommunityEventsMock = useGetCommunityEvents as jest.Mock
const useGetCommunityEventHostsMock = useGetCommunityEventHosts as jest.Mock
const useGetCountriesMock = useGetCountries as jest.Mock
const usePaginationMock = usePagination as jest.Mock
const CommunityEventListMock = CommunityEventList as jest.Mock

describe('CommunityEvents', () => {
  beforeEach(() => {
    CommunityEventListMock.mockReturnValue(<div />)
    useGetCommunityEventHostsMock.mockReturnValue([])
    useGetCountriesMock.mockReturnValue([])
    usePaginationMock.mockReturnValue({
      filterValues: {}
    })
  })

  it('renders while fetching data', () => {
    useGetCommunityEventsMock.mockReturnValue({
      loading: true,
      data: undefined
    })
    render(
      <TestWrapper>
        <CommunityEvents />
      </TestWrapper>
    )

    expect(screen.getAllByTestId('community-event-list-loader')).toHaveLength(3)
    expect(screen.getByTestId('content-title')).toHaveTextContent(
      'Toptal Community Events (0)'
    )
    expect(CommunityEventListMock).not.toHaveBeenCalled()
  })

  it('renders after data is fetched', () => {
    useGetCommunityEventsMock.mockReturnValue({
      loading: false,
      data: { nodes: FAKE_COMMUNITY_EVENTS, totalCount: 2 }
    })

    render(
      <TestWrapper>
        <CommunityEvents />
      </TestWrapper>
    )

    expect(
      screen.queryByTestId('community-event-list-loader')
    ).not.toBeInTheDocument()
    expect(screen.getByTestId('content-title')).toHaveTextContent(
      'Toptal Community Events (2)'
    )
    expect(CommunityEventListMock).toHaveBeenCalledWith(
      { communityEvents: FAKE_COMMUNITY_EVENTS },
      {}
    )
  })
})
