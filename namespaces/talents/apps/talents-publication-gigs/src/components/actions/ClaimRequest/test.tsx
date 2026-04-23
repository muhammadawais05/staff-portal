import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { GigFragment } from '@staff-portal/talents-gigs'

import {
  useClaimGigRequest,
  ClaimGigMutation
} from '../../../data/claim-gig-request'
import ClaimRequest from './ClaimRequest'

jest.mock('../../../data/claim-gig-request', () => ({
  useClaimGigRequest: jest.fn()
}))

describe('ClaimRequest', () => {
  const mockedUseClaimGigRequest = useClaimGigRequest as jest.Mock
  const claimRequest = jest.fn()
  const gig = {
    id: 'VjEtUHVibGljYXRpb25HaWctMzM'
  } as GigFragment
  let currentCompletedCallback: (data: ClaimGigMutation) => void
  let currentErrorCallback: (error?: Error) => void

  beforeEach(() => {
    mockedUseClaimGigRequest.mockImplementation(
      ({
        onCompleted,
        onError
      }: {
        onCompleted: (data: ClaimGigMutation) => void
        onError: (error?: Error) => void
      }) => {
        currentCompletedCallback = onCompleted
        currentErrorCallback = onError

        return [
          claimRequest,
          {
            data: {
              claimP2PRequest: {
                gig
              },
              loading: false
            }
          }
        ]
      }
    )
  })

  it('handles claim', () => {
    render(
      <TestWrapper>
        <ClaimRequest gigId={gig.id} />
      </TestWrapper>
    )

    fireEvent.click(screen.getByTestId('claimButton'))

    expect(claimRequest).toHaveBeenCalledTimes(1)
  })

  it('handles success', () => {
    render(
      <TestWrapper>
        <ClaimRequest gigId={gig.id} />
      </TestWrapper>
    )

    currentCompletedCallback({
      claimGig: {
        gig,
        success: true,
        errors: []
      }
    })

    expect(
      screen.queryByText('Request claimed successfully.')
    ).toBeInTheDocument()
  })

  it('handles network errors', () => {
    render(
      <TestWrapper>
        <ClaimRequest gigId={gig.id} />
      </TestWrapper>
    )

    currentErrorCallback()

    expect(screen.queryByText('Unable to claim request')).toBeInTheDocument()
  })

  it('handles server errors', () => {
    render(
      <TestWrapper>
        <ClaimRequest gigId={gig.id} />
      </TestWrapper>
    )

    currentCompletedCallback({
      claimGig: {
        gig: null,
        success: false,
        errors: [
          {
            code: '1',
            key: '1',
            message: 'Status incorrect'
          }
        ]
      }
    })

    expect(
      screen.queryByText(
        'Unable to claim request, the following errors occurred: Status incorrect.'
      )
    ).toBeInTheDocument()
  })
})
