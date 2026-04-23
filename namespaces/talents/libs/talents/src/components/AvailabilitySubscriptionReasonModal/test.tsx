import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import AvailabilitySubscriptionReasonModal from './AvailabilitySubscriptionReasonModal'
import { useGetAvailbilitySubscriptionModal } from './hooks/use-get-availbility-subscription-modal'

jest.mock('./hooks/use-get-availbility-subscription-modal')

const mockUseGetAvailbilitySubscriptionModal =
  useGetAvailbilitySubscriptionModal as jest.Mock

const arrangeTest = (comment?: string, onSubmit?: () => void) => {
  mockUseGetAvailbilitySubscriptionModal.mockReturnValue({
    handleSubscriptionCommentModalSubmit: onSubmit,
    loading: false
  })

  return render(
    <TestWrapper>
      <AvailabilitySubscriptionReasonModal
        hideModal={jest.fn()}
        talentId={'some-id'}
        isTopModal={true}
        talentAvailabilitySubscription={{
          id: 'some-id',
          comment: comment || '',
          active: false,
          operations: {
            updateComment: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            unsubscribe: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          }
        }}
      />
    </TestWrapper>
  )
}

describe('AvailabilitySubscriptionReasonModal', () => {
  describe('when comment is not provided', () => {
    it('shows subscribe title and submit button', () => {
      arrangeTest()

      expect(
        screen.queryByText('Subscribe for Talent Availability Update')
      ).toBeInTheDocument()
      expect(screen.queryByText('Subscription Comment')).toBeInTheDocument()
      expect(screen.queryByText('Subscribe')).toBeInTheDocument()
    })

    it('shows error when reason is empty', () => {
      arrangeTest()

      fireEvent.click(screen.getByText('Subscribe'))

      expect(
        screen.queryByText('Please complete this field.')
      ).toBeInTheDocument()
    })

    it('calls onSubmit with reason when subscribe is clicked', async () => {
      const onSubmit = jest.fn()

      arrangeTest(undefined, onSubmit)

      await waitFor(() => {
        fireEvent.change(
          screen.getByPlaceholderText(/The comment will appear as a/),
          {
            target: { value: 'Test reason' }
          }
        )

        fireEvent.click(screen.getByText('Subscribe'))
      })

      expect(onSubmit).toHaveBeenCalledWith(
        { comment: 'Test reason' },
        expect.anything(),
        expect.anything()
      )
    })
  })

  describe('when comment is provided', () => {
    it('shows edit subscribe reason title, comment, and save button', () => {
      arrangeTest('Test subscription reason')

      expect(screen.queryByText('Subscription Comment')).toBeInTheDocument()
      expect(
        screen.queryByDisplayValue('Test subscription reason')
      ).toBeInTheDocument()
      expect(screen.queryByText('Save')).toBeInTheDocument()
    })
  })
})
