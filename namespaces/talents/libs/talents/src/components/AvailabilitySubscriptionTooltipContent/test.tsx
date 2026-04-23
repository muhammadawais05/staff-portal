import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import AvailabilitySubscriptionTooltipContent, {
  Props
} from './AvailabilitySubscriptionTooltipContent'
import { createTalentAvailabilitySubscriptionFragmentMock } from '../../data/talent-availability-subscription-fragment/mocks'

const NOT_SUBSCRIBED_TOOLTIP_TEXT =
  'Subscribe to talent availability to be notified via Slack in the following scenarios:'
const SUBSCRIBED_TOOLTIP_TEXT =
  'You subscribed to talent availability to be notified via Slack in the following scenarios:'
const SUBSCRIPTION_SCENARIOS = [
  'Talent increases their availability',
  'Lock is removed from talent profile and there are more than zero available hours',
  'Talent is about to finish his engagement',
  'Talent has finished his engagement'
]
const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: [],
  __typename: 'Operation'
}

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <AvailabilitySubscriptionTooltipContent {...props} />
    </TestWrapper>
  )

describe('AvailabilitySubscriptionTooltipContent', () => {
  describe('when comment is not provided', () => {
    it('shows subscribe text and scenarios', () => {
      arrangeTest({
        onEditCommentClick: jest.fn(),
        onUnsubscribeClick: jest.fn()
      })

      expect(
        screen.queryByText(NOT_SUBSCRIBED_TOOLTIP_TEXT)
      ).toBeInTheDocument()
      SUBSCRIPTION_SCENARIOS.forEach(scenarioText =>
        expect(screen.queryByText(scenarioText)).toBeInTheDocument()
      )

      expect(
        screen.queryByText(SUBSCRIBED_TOOLTIP_TEXT)
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText('Subscription Comment:')
      ).not.toBeInTheDocument()
      expect(screen.queryByText('Edit Comment')).not.toBeInTheDocument()
      expect(screen.queryByText('Unsubscribe')).not.toBeInTheDocument()
    })
  })

  describe('when comment is provided', () => {
    it('shows unsubscribe text, scenarios, comment and actions', () => {
      const comment = 'Test comment'
      const onEditCommentClick = jest.fn()
      const onUnsubscribeClick = jest.fn()

      arrangeTest({
        talentAvailabilitySubscription:
          createTalentAvailabilitySubscriptionFragmentMock({ comment }),
        onEditCommentClick,
        onUnsubscribeClick
      })

      expect(screen.queryByText(SUBSCRIBED_TOOLTIP_TEXT)).toBeInTheDocument()
      expect(
        screen.queryByText(NOT_SUBSCRIBED_TOOLTIP_TEXT)
      ).not.toBeInTheDocument()
      SUBSCRIPTION_SCENARIOS.forEach(scenarioText =>
        expect(screen.queryByText(scenarioText)).toBeInTheDocument()
      )

      expect(screen.queryByText('Subscription Comment:')).toBeInTheDocument()
      expect(screen.queryByText(comment)).toBeInTheDocument()
      expect(screen.queryByText('Edit Comment')).toBeInTheDocument()
      expect(screen.queryByText('Unsubscribe')).toBeInTheDocument()

      fireEvent.click(screen.getByText('Edit Comment'))
      expect(onEditCommentClick).toHaveBeenCalled()

      fireEvent.click(screen.getByText('Unsubscribe'))
      expect(onUnsubscribeClick).toHaveBeenCalled()
    })
  })

  describe('when operations are hidden', () => {
    it('hides the action buttons', () => {
      arrangeTest({
        talentAvailabilitySubscription:
          createTalentAvailabilitySubscriptionFragmentMock({
            operations: {
              unsubscribe: {
                ...OPERATION,
                callable: OperationCallableTypes.HIDDEN
              },
              updateComment: {
                ...OPERATION,
                callable: OperationCallableTypes.HIDDEN
              }
            }
          }),
        onEditCommentClick: jest.fn(),
        onUnsubscribeClick: jest.fn()
      })

      expect(screen.queryByText('Edit Comment')).not.toBeInTheDocument()
      expect(screen.queryByText('Unsubscribe')).not.toBeInTheDocument()
    })
  })

  describe('when operations are disabled', () => {
    it('disables the action buttons', () => {
      arrangeTest({
        talentAvailabilitySubscription:
          createTalentAvailabilitySubscriptionFragmentMock({
            operations: {
              unsubscribe: {
                ...OPERATION,
                callable: OperationCallableTypes.DISABLED
              },
              updateComment: {
                ...OPERATION,
                callable: OperationCallableTypes.DISABLED
              }
            }
          }),
        onEditCommentClick: jest.fn(),
        onUnsubscribeClick: jest.fn()
      })

      expect(
        screen.queryByRole('button', { name: /Edit Comment/ })
      ).toBeDisabled()
      expect(
        screen.queryByRole('button', { name: /Unsubscribe/ })
      ).toBeDisabled()
    })
  })
})
