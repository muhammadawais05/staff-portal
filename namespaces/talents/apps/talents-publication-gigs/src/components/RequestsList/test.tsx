import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetCurrentUser } from '@staff-portal/current-user'
import {
  createGetGigsMock,
  mockedStaff
} from '@staff-portal/talents-gigs/src/mocks'

import { useGetGigList } from './data/get-gigs-list'
import { NO_REQUESTS_MESSAGE } from '../../config'
import RequestsList from './RequestsList'

jest.mock('../../components')

jest.mock('./data/get-gigs-list', () => ({
  useGetGigList: jest.fn()
}))

jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: jest.fn()
}))

jest.mock('@staff-portal/query-params-state', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/query-params-state'),
  useQueryParamsState: jest.fn()
}))

const mockUseGetCurrentUser = useGetCurrentUser as jest.Mock
const mockedRequestsList = createGetGigsMock().gigs

describe('RequestsList', () => {
  const mockedUseGetGigs = useGetGigList as jest.Mock

  it('shows no results message when there is no data', () => {
    mockedUseGetGigs.mockReturnValue({
      data: createGetGigsMock({
        totalCount: 0,
        nodes: []
      }).gigs,
      loading: false
    })

    render(
      <TestWrapper>
        <RequestsList showAllRequests />
      </TestWrapper>
    )
    expect(screen.queryByText(NO_REQUESTS_MESSAGE)).toBeInTheDocument()
    expect(screen.queryByTestId('emptyBox')).toBeInTheDocument()
  })

  it('handles loading state', () => {
    mockedUseGetGigs.mockReturnValue({
      data: null,
      loading: true
    })

    render(
      <TestWrapper>
        <RequestsList showAllRequests={false} />
      </TestWrapper>
    )
    expect(screen.getByTestId('p2p-requests-list-loading')).toBeInTheDocument()
  })

  describe('with data to be displayed', () => {
    beforeEach(() => {
      mockedUseGetGigs.mockReturnValue({
        data: createGetGigsMock().gigs,
        loading: false
      })
    })

    it('shows requests when loaded', () => {
      render(
        <TestWrapper>
          <RequestsList showAllRequests />
        </TestWrapper>
      )
      expect(
        screen.queryByText(
          'Interacting with Python files from frontend elements'
        )
      ).toBeInTheDocument()
    })

    it('renders no request when showAllRequests is false if staff has not claimed or created any request', () => {
      mockUseGetCurrentUser.mockReturnValueOnce({
        id: 'X',
        fullName: 'Another Staff'
      })

      render(
        <TestWrapper>
          <RequestsList showAllRequests={false} />
        </TestWrapper>
      )

      expect(screen.getByText(NO_REQUESTS_MESSAGE)).toBeInTheDocument()
    })

    it('renders all request when showAllRequests is true, even if staff has not claimed or created any request', () => {
      mockUseGetCurrentUser.mockReturnValueOnce({
        id: 'X',
        fullName: 'Another Staff'
      })

      render(
        <TestWrapper>
          <RequestsList showAllRequests={true} />
        </TestWrapper>
      )

      expect(
        screen.queryByText(mockedRequestsList.nodes[0].title || '')
      ).toBeInTheDocument()
      expect(
        screen.queryByText(mockedRequestsList.nodes[1].title || '')
      ).toBeInTheDocument()
      expect(
        screen.queryByText(mockedRequestsList.nodes[2].title || '')
      ).toBeInTheDocument()
    })

    it('renders only my requests by default', () => {
      mockUseGetCurrentUser.mockReturnValueOnce(mockedStaff)

      render(
        <TestWrapper>
          <RequestsList showAllRequests={false} />
        </TestWrapper>
      )

      expect(
        screen.queryByText(mockedRequestsList.nodes[0].title || '')
      ).toBeInTheDocument()
    })
  })
})
