import { fireEvent, render, screen } from '@testing-library/react'
import { within } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useSendTalentToPortfolioReview } from './data'
import SendTalentToPortfolioReviewModal from './SendTalentToPortfolioReviewModal'

jest.mock('./data', () => ({
  __esModule: true,
  useSendTalentToPortfolioReview: jest.fn()
}))

const arrangeTest = ({ hideModal }: { hideModal: () => void }) => {
  return render(
    <TestWrapper>
      <SendTalentToPortfolioReviewModal
        talentId='1'
        emailTemplateId='1'
        isTopModal={true}
        hideModal={hideModal}
      />
    </TestWrapper>
  )
}

describe('SendTalentToPortfolioReviewModal', () => {
  it('shows the modal', async () => {
    const hideModal = jest.fn()
    const mockUseSendTalentToPortfolioReview =
      useSendTalentToPortfolioReview as jest.Mock

    mockUseSendTalentToPortfolioReview.mockReturnValue([
      () => ({
        data: {
          sendTalentToPortfolioReview: {
            success: true,
            errors: []
          }
        }
      })
    ])

    arrangeTest({ hideModal })

    expect(
      screen.getByText('Do you want to send the talent to portfolio review?')
    ).toBeInTheDocument()

    fireEvent.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: 'Send to Portfolio Review'
      })
    )

    expect(
      await screen.findByText('Talent sent to portfolio review.')
    ).toBeInTheDocument()
  })

  it('shows the error message', async () => {
    const hideModal = jest.fn()
    const mockUseSendTalentToPortfolioReview =
      useSendTalentToPortfolioReview as jest.Mock

    mockUseSendTalentToPortfolioReview.mockImplementation(
      ({ onError }: { onError: () => void }) => [
        () => {
          onError()
        }
      ]
    )

    arrangeTest({ hideModal })

    expect(
      screen.getByText('Do you want to send the talent to portfolio review?')
    ).toBeInTheDocument()

    fireEvent.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: 'Send to Portfolio Review'
      })
    )

    expect(
      await screen.findByText(
        'An error occurred, the talent was not sent to portfolio review.'
      )
    ).toBeInTheDocument()
  })
})
