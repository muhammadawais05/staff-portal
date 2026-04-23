import React, { useState } from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { PublicationGigStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { GigFragment, useGetGigCandidates } from '@staff-portal/talents-gigs'
import {
  createGetGigMock,
  mockedStaff
} from '@staff-portal/talents-gigs/src/mocks'

import CandidatesList from './CandidatesList'

jest.mock('@staff-portal/talents-gigs/src/data/get-gig-candidates', () => ({
  useGetGigCandidates: jest.fn()
}))

jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: jest.fn()
}))

const claimer = {
  id: 'claimer',
  role: mockedStaff
}
const arrangeTest = (gig?: Partial<GigFragment>) => {
  const request = createGetGigMock({
    status: PublicationGigStatus.CLAIMED,
    ...gig
  }).gig!

  render(
    <TestWrapper>
      <CandidatesList request={request} />
    </TestWrapper>
  )
}

const mockedUseGetCurrentUser = useGetCurrentUser as jest.Mock

describe('CandidatesList', () => {
  const mockedUseGetGigCandidates = useGetGigCandidates as jest.Mock

  const mockWithNoCandidates = () => {
    mockedUseGetGigCandidates.mockReturnValue({
      candidates: [],
      loading: false
    })
  }

  it('shows loading state', () => {
    mockedUseGetGigCandidates.mockReturnValue({
      candidates: [],
      loading: true
    })

    arrangeTest()

    expect(
      screen.queryByTestId('request-candidates-loader')
    ).toBeInTheDocument()
    expect(screen.queryByTestId('candidates-list')).not.toBeInTheDocument()
  })

  describe('when there are no candidates', () => {
    it('displays one message when user is not a claimer', () => {
      mockedUseGetCurrentUser.mockReturnValue({
        id: '',
        fullName: ''
      })

      mockWithNoCandidates()
      arrangeTest({ claimedBy: claimer })

      expect(
        screen.queryByText(
          'No candidates have been contacted about this request'
        )
      ).toBeInTheDocument()
    })

    it('displays another message when user is a claimer', () => {
      mockedUseGetCurrentUser.mockReturnValue(mockedStaff)

      mockWithNoCandidates()
      arrangeTest({ claimedBy: claimer })

      expect(
        screen.queryByText(
          'You have not reached out to any talent for this request'
        )
      ).toBeInTheDocument()
    })
  })

  it('displays error message when there is an error', () => {
    mockedUseGetGigCandidates.mockReturnValue({
      candidates: [],
      loading: false,
      error: true
    })

    arrangeTest()

    expect(
      screen.queryByText(/Sorry, something went wrong/)
    ).toBeInTheDocument()
    expect(screen.queryByTestId('candidates-refresh-link')).toBeInTheDocument()
    expect(screen.queryByTestId('support-mail-link')).toBeInTheDocument()
  })

  it('cycles loading state when refreshing', async () => {
    jest.useFakeTimers()

    mockedUseGetGigCandidates.mockImplementation(() => {
      const [state, setState] = useState({
        candidates: [],
        error: true,
        loading: false
      })

      const refetch = () => {
        setState({ ...state, loading: true })
        setTimeout(() => setState({ ...state, loading: false }), 10)
      }

      return {
        ...state,
        refetch
      }
    })

    arrangeTest()

    await act(async () => {
      fireEvent.click(screen.getByTestId('candidates-refresh-link'))
    })

    expect(
      screen.queryByTestId('request-candidates-loader')
    ).toBeInTheDocument()

    await act(async () => {
      jest.advanceTimersByTime(20)
    })

    expect(
      screen.queryByTestId('request-candidates-loader')
    ).not.toBeInTheDocument()
    jest.useRealTimers()
  })
})
