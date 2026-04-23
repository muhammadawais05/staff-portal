import React from 'react'
import { fireEvent, render, act, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { GigFragment } from '@staff-portal/talents-gigs'

import {
  useCloseGigRequest,
  CloseGigMutation
} from '../../../data/close-gig-request'
import CloseRequestModal from './CloseRequestModal'

jest.mock('../../../data/close-gig-request', () => ({
  useCloseGigRequest: jest.fn()
}))

describe('CloseRequestModal', () => {
  const mockeduseCloseGigRequest = useCloseGigRequest as jest.Mock
  const closeRequest = jest.fn()
  const gig = {
    id: 'VjEtUHVibGljYXRpb25HaWctMzM'
  } as GigFragment
  let currentCompletedCallback: (data: CloseGigMutation) => void
  let currentErrorCallback: (error?: Error) => void

  beforeEach(() => {
    mockeduseCloseGigRequest.mockImplementation(
      ({
        onCompleted,
        onError
      }: {
        onCompleted: (data: CloseGigMutation) => void
        onError: (error?: Error) => void
      }) => {
        currentCompletedCallback = onCompleted
        currentErrorCallback = onError

        return [
          closeRequest,
          {
            data: {
              closeGig: {
                gig
              },
              loading: false
            }
          }
        ]
      }
    )
  })

  it('handles button click', () => {
    render(
      <TestWrapper>
        <CloseRequestModal
          gigId={gig.id}
          onSubmit={() => {}}
          hideModal={() => {}}
        />
      </TestWrapper>
    )

    expect(screen.getByText('Close Request')).toBeInTheDocument()
    expect(screen.getByText('Reason for Closing')).toBeInTheDocument()
  })

  it('handles button submit', async () => {
    render(
      <TestWrapper>
        <CloseRequestModal
          gigId={gig.id}
          onSubmit={() => {}}
          hideModal={() => {}}
        />
      </TestWrapper>
    )

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Reason for Closing/), {
        target: { value: 'Some Reason' }
      })
      fireEvent.click(screen.getByTestId('CloseRequest-confirm'))
    })

    expect(closeRequest).toHaveBeenCalledWith({
      variables: {
        closingReason: 'Some Reason',
        gigId: 'VjEtUHVibGljYXRpb25HaWctMzM'
      }
    })
  })

  it('handles success', () => {
    render(
      <TestWrapper>
        <CloseRequestModal
          gigId={gig.id}
          onSubmit={() => {}}
          hideModal={() => {}}
        />
      </TestWrapper>
    )

    currentCompletedCallback({
      closeGig: {
        gig,
        success: true,
        errors: []
      }
    })

    expect(
      screen.queryByText('Request closed successfully.')
    ).toBeInTheDocument()
  })

  it('handles network errors', () => {
    render(
      <TestWrapper>
        <CloseRequestModal
          gigId={gig.id}
          onSubmit={() => {}}
          hideModal={() => {}}
        />
      </TestWrapper>
    )

    currentErrorCallback()

    expect(screen.queryByText('Unable to close request')).toBeInTheDocument()
  })

  it('handles server errors', () => {
    render(
      <TestWrapper>
        <CloseRequestModal
          gigId={gig.id}
          onSubmit={() => {}}
          hideModal={() => {}}
        />
      </TestWrapper>
    )

    currentCompletedCallback({
      closeGig: {
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
        'Unable to close request, the following errors occurred: Status incorrect.'
      )
    ).toBeInTheDocument()
  })
})
