import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { GigFragment } from '@staff-portal/talents-gigs'

import {
  useApproveGigRequest,
  ApproveGigMutation
} from '../../../data/approve-gig-request'
import ApproveRequest from './ApproveRequest'

jest.mock('../../../data/approve-gig-request', () => ({
  useApproveGigRequest: jest.fn()
}))

describe('ApproveRequest', () => {
  const mockedUseApproveGigRequest = useApproveGigRequest as jest.Mock
  const approveRequest = jest.fn()
  const gig = {
    id: 'VjEtUHVibGljYXRpb25HaWctMzM'
  } as GigFragment
  let currentCompletedCallback: (data: ApproveGigMutation) => void
  let currentErrorCallback: (error?: Error) => void

  beforeEach(() => {
    mockedUseApproveGigRequest.mockImplementation(
      ({
        onCompleted,
        onError
      }: {
        onCompleted: (data: ApproveGigMutation) => void
        onError: (error?: Error) => void
      }) => {
        currentCompletedCallback = onCompleted
        currentErrorCallback = onError

        return [
          approveRequest,
          {
            data: {
              approveGig: {
                gig
              },
              loading: false
            }
          }
        ]
      }
    )
  })

  it('handles approval', () => {
    render(
      <TestWrapper>
        <ApproveRequest gigId={gig.id} />
      </TestWrapper>
    )

    fireEvent.click(screen.getByTestId('approveButton'))

    expect(approveRequest).toHaveBeenCalledTimes(1)
  })

  it('handles success', () => {
    render(
      <TestWrapper>
        <ApproveRequest gigId={gig.id} />
      </TestWrapper>
    )

    currentCompletedCallback({
      approveGig: {
        gig,
        success: true,
        errors: []
      }
    })

    expect(
      screen.queryByText('Request approved successfully.')
    ).toBeInTheDocument()
  })

  it('handles network errors', () => {
    render(
      <TestWrapper>
        <ApproveRequest gigId={gig.id} />
      </TestWrapper>
    )

    currentErrorCallback()

    expect(screen.queryByText('Unable to approve request')).toBeInTheDocument()
  })

  it('handles server errors', () => {
    render(
      <TestWrapper>
        <ApproveRequest gigId={gig.id} />
      </TestWrapper>
    )

    currentCompletedCallback({
      approveGig: {
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
        'Unable to approve request, the following errors occurred: Status incorrect.'
      )
    ).toBeInTheDocument()
  })
})
