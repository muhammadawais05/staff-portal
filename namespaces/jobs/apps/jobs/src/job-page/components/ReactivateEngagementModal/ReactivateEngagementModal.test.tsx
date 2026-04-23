import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { useMutation, useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import ReactivateEngagementModal from './ReactivateEngagementModal'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/engagements')

const arrangeTest = () => {
  const useQueryMock = useQuery as jest.Mock

  useQueryMock.mockImplementationOnce(() => ({
    data: {
      node: {
        operations: {
          reactivateEngagement: {
            callable: 'ENABLED'
          }
        }
      }
    },
    loading: false
  }))

  window.Element.prototype.scrollIntoView = jest.fn()

  return render(
    <TestWrapper>
      <ReactivateEngagementModal engagementId='1' hideModal={() => {}} />
    </TestWrapper>
  )
}

describe('ReactivateEngagementModal', () => {
  it('shows the success message after submit', async () => {
    const mockUseMutation = useMutation as jest.Mock

    mockUseMutation.mockReturnValue([
      () => ({
        data: {
          reactivateEngagement: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])

    arrangeTest()

    fireEvent.click(screen.getByTestId('ConfirmationModal-submit-button'))

    expect(
      await screen.findByText('Please complete this field.')
    ).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'Some Comment' }
    })

    fireEvent.click(screen.getByTestId('ConfirmationModal-submit-button'))

    expect(
      await screen.findByText('The engagement was successfully reactivated.')
    ).toBeInTheDocument()
  })

  it('shows the error message', async () => {
    const mockUseMutation = useMutation as jest.Mock

    mockUseMutation.mockImplementation(
      (_document, { onError }: { onError: () => void }) => [
        () => onError(),
        { loading: false }
      ]
    )

    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'Some Comment' }
    })

    fireEvent.click(screen.getByTestId('ConfirmationModal-submit-button'))

    expect(
      await screen.findByText(
        'An error occurred, unable to reactivate engagement.'
      )
    ).toBeInTheDocument()
  })

  it('shows the error message received from the API', async () => {
    const ERROR_MESSAGE = 'Server error message'
    const mockUseMutation = useMutation as jest.Mock

    mockUseMutation.mockReturnValue([
      () => ({
        data: {
          reactivateEngagement: {
            success: false,
            errors: [
              {
                code: 'code',
                key: 'base',
                message: ERROR_MESSAGE
              }
            ]
          }
        }
      }),
      { loading: false }
    ])

    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'Some Comment' }
    })

    fireEvent.click(screen.getByTestId('ConfirmationModal-submit-button'))

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
  })
})
