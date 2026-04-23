import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useEditEngagementCommitment } from './data'
import EditMinCommitmentModal from './EditMinCommitmentModal'

jest.mock('./data', () => ({
  __esModule: true,
  useEditEngagementCommitment: jest.fn()
}))

const arrangeTest = () => {
  window.Element.prototype.scrollIntoView = jest.fn()

  return render(
    <TestWrapper>
      <EditMinCommitmentModal
        engagementId='1'
        minimumHours={5}
        hideModal={() => {}}
      />
    </TestWrapper>
  )
}

describe('EditMinCommitmentModal', () => {
  it('shows the success notification when submit', async () => {
    const mockUseEditEngagementCommitment =
      useEditEngagementCommitment as jest.Mock

    mockUseEditEngagementCommitment.mockReturnValue([
      () => ({
        data: {
          editEngagementCommitment: {
            success: true
          }
        }
      }),
      { loading: false }
    ])

    arrangeTest()

    expect(
      screen.getByText('Edit Minimum Commitment for Engagement')
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        'Note: Changes will take effect for the next billing cycle.'
      )
    ).toBeInTheDocument()

    fireEvent.click(screen.getByText('Update Minimum Commitment'))

    expect(
      await screen.findByText('Please complete this field.')
    ).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'Some Comment' }
    })

    fireEvent.click(screen.getByText('Update Minimum Commitment'))

    expect(
      await screen.findByText(
        'Minimum commitment settings were successfully updated.'
      )
    ).toBeInTheDocument()
  })

  it('shows the error message', async () => {
    const mockUseEditEngagementCommitment =
      useEditEngagementCommitment as jest.Mock

    mockUseEditEngagementCommitment.mockImplementation(
      ({ onError }: { onError: () => void }) => [onError, { loading: false }]
    )

    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'Some Comment' }
    })

    fireEvent.click(screen.getByText('Update Minimum Commitment'))

    expect(
      await screen.findByText(
        'An error occurred, the engagement commitment was not updated.'
      )
    ).toBeInTheDocument()
  })
})
