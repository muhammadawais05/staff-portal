import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { PublicationGigStatus } from '@staff-portal/graphql/staff'
import { useGetCurrentUser } from '@staff-portal/current-user'
import {
  createGetGigMock,
  mockedStaff
} from '@staff-portal/talents-gigs/src/mocks'

import SearchCandidates from './'

jest.mock('../../../components')
jest.mock('@staff-portal/current-user', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/current-user'),
  useGetCurrentUser: jest.fn()
}))

const mockUseGetCurrentUser = useGetCurrentUser as jest.Mock
const approvedRequest = createGetGigMock({
  status: PublicationGigStatus.APPROVED
}).gig

const renderTest = (request = approvedRequest) => {
  return render(
    <TestWrapper>
      <SearchCandidates request={request} />
    </TestWrapper>
  )
}

describe('Search Candidates', () => {
  describe('when there is no claimer', () => {
    it('hides candidates', () => {
      const request = createGetGigMock({
        status: PublicationGigStatus.PENDING
      }).gig

      renderTest(request)

      expect(
        screen.queryByTestId('p2p-request-candidates-list')
      ).not.toBeInTheDocument()
    })
  })

  describe('when I am the claimer', () => {
    beforeEach(() => {
      mockUseGetCurrentUser.mockReturnValue(mockedStaff)
    })
    const claimer = {
      id: 'claimerid',
      role: mockedStaff
    }

    it('displays search candidates button for me when I am the claimer', () => {
      const request = createGetGigMock({
        status: PublicationGigStatus.APPROVED,
        claimedBy: claimer
      }).gig

      renderTest(request)

      expect(screen.queryByTestId('search-candidates')).toBeInTheDocument()
    })

    it('displays search candidates for APPROVED requests', () => {
      const request = createGetGigMock({
        status: PublicationGigStatus.APPROVED,
        claimedBy: claimer
      }).gig

      renderTest(request)

      expect(screen.queryByTestId('search-candidates')).toBeInTheDocument()
    })

    it('hides search candidates for MATCHED requests', () => {
      const request = createGetGigMock({
        status: PublicationGigStatus.MATCHED,
        claimedBy: claimer
      }).gig

      renderTest(request)

      expect(screen.queryByTestId('search-candidates')).not.toBeInTheDocument()
    })

    it('displays search candidates for COMPLETED requests', () => {
      const request = createGetGigMock({
        status: PublicationGigStatus.COMPLETED,
        claimedBy: claimer
      }).gig

      renderTest(request)

      expect(screen.queryByTestId('search-candidates')).not.toBeInTheDocument()
    })
  })

  describe('when I am not the claimer', () => {
    beforeEach(() => {
      mockUseGetCurrentUser.mockReturnValue({
        id: 'other'
      })
    })

    it('renders correctly', () => {
      const request = createGetGigMock({
        status: PublicationGigStatus.CLAIMED
      }).gig

      renderTest(request)

      expect(screen.queryByTestId('search-candidates')).not.toBeInTheDocument()
    })

    it('does not display search candidates for APPROVED requests', () => {
      const request = createGetGigMock({
        status: PublicationGigStatus.APPROVED
      }).gig

      renderTest(request)

      expect(screen.queryByTestId('search-candidates')).not.toBeInTheDocument()
    })

    it('displays search candidates for MATCHED requests', () => {
      const request = createGetGigMock({
        status: PublicationGigStatus.MATCHED
      }).gig

      renderTest(request)

      expect(screen.queryByTestId('search-candidates')).not.toBeInTheDocument()
    })

    it('displays search candidates for COMPLETED requests', () => {
      const request = createGetGigMock({
        status: PublicationGigStatus.COMPLETED
      }).gig

      renderTest(request)

      expect(screen.queryByTestId('search-candidates')).not.toBeInTheDocument()
    })

    it('displays search candidates for CLOSED requests', () => {
      const request = createGetGigMock({
        status: PublicationGigStatus.CLOSED
      }).gig

      renderTest(request)

      expect(screen.queryByTestId('search-candidates')).not.toBeInTheDocument()
    })

    it('hides search candidates button', () => {
      mockUseGetCurrentUser.mockReturnValue({
        id: '01',
        fullName: 'Another Staff'
      })
      renderTest()

      expect(screen.queryByTestId('search-candidates')).not.toBeInTheDocument()
    })
  })
})
