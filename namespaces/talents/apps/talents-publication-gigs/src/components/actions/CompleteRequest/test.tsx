import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { GigFragment } from '@staff-portal/talents-gigs'

import {
  useCompleteGigRequest,
  CompleteGigMutation
} from '../../../data/complete-gig-request'
import CompleteRequest from './CompleteRequest'

jest.mock('../../../data/complete-gig-request', () => ({
  useCompleteGigRequest: jest.fn()
}))
const mockedUseCompleteGigRequest = useCompleteGigRequest as jest.Mock

const defaultRequest = {
  id: 'VjEtUHVibGljYXRpb25HaWctMzM'
} as GigFragment

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <CompleteRequest gigId='VjEtUHVibGljYXRpb25HaWctMzM'>
        <button>Complete Request</button>
      </CompleteRequest>
    </TestWrapper>
  )
}

describe('CompleteRequest', () => {
  const completeRequest = jest.fn()
  let currentCompletedCallback: (data: CompleteGigMutation) => void
  let currentErrorCallback: (error?: Error) => void

  beforeEach(() => {
    mockedUseCompleteGigRequest.mockImplementation(
      ({
        requestId,
        onCompleted,
        onError
      }: {
        requestId: string
        onCompleted: (data: CompleteGigMutation) => void
        onError: (error?: Error) => void
      }) => {
        currentCompletedCallback = onCompleted
        currentErrorCallback = onError

        return [
          completeRequest,
          {
            data: {
              completeGig: {
                request: {
                  ...defaultRequest,
                  id: requestId
                }
              },
              loading: false
            }
          }
        ]
      }
    )
  })

  it('handles button click', () => {
    arrangeTest()

    fireEvent.click(screen.getByTestId('complete-action'))

    expect(screen.getByText('Complete Request')).toBeInTheDocument()
  })

  it('handles success', () => {
    arrangeTest()

    currentCompletedCallback({
      completeGig: {
        gig: defaultRequest,
        success: true,
        errors: []
      }
    })

    expect(
      screen.queryByText('Request completed successfully.')
    ).toBeInTheDocument()
  })

  it('handles network errors', () => {
    arrangeTest()

    currentErrorCallback()

    expect(screen.queryByText('Unable to complete request')).toBeInTheDocument()
  })

  it('handles server errors', () => {
    arrangeTest()

    currentCompletedCallback({
      completeGig: {
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
        'Unable to complete request, the following errors occurred: Status incorrect.'
      )
    ).toBeInTheDocument()
  })
})
