import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import {
  createTalentAvailabilitySubscriptionFragmentMock,
  createUnsubscribeFromTalentAvailabilityUpdatesMock
} from '@staff-portal/talents/src/mocks'

import SubscribeToAvailabilityButton, {
  Props
} from './SubscribeToAvailabilityButton'

const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: [],
  __typename: 'Operation'
}

const arrangeTest = (props: Props, mocks: MockedResponse[] = []) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <SubscribeToAvailabilityButton {...props} />
    </TestWrapperWithMocks>
  )

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

describe('SubscribeToAvailabilityButton', () => {
  describe('when there is no subscription', () => {
    it('shows inactive bell button with tooltip', () => {
      arrangeTest({
        talentId: '123',

        operation: OPERATION
      })

      expect(screen.getByTestId('bell-icon:inactive')).toBeInTheDocument()
      expect(screen.getByText('Subscribe to Availability')).toBeInTheDocument()

      fireEvent.mouseOver(screen.getByTestId('bell-icon:inactive'))

      expect(
        screen.queryByText(NOT_SUBSCRIBED_TOOLTIP_TEXT)
      ).toBeInTheDocument()
      expect(
        screen.queryByText(SUBSCRIBED_TOOLTIP_TEXT)
      ).not.toBeInTheDocument()

      SUBSCRIPTION_SCENARIOS.forEach(scenarioText =>
        expect(screen.queryByText(scenarioText)).toBeInTheDocument()
      )

      expect(
        screen.queryByText('Subscription Comment:')
      ).not.toBeInTheDocument()
      expect(screen.queryByText('Edit Comment')).not.toBeInTheDocument()
      expect(screen.queryByText('Unsubscribe')).not.toBeInTheDocument()
    })

    it('does not show the button if the operation is "hidden"', () => {
      arrangeTest({
        talentId: '123',

        operation: {
          ...OPERATION,
          callable: OperationCallableTypes.HIDDEN
        }
      })

      expect(
        screen.queryByTestId('subscribe-to-availability-button')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there is an active subscription', () => {
    it('shows active bell button with tooltip containing edit and unsubscribe buttons', () => {
      arrangeTest({
        talentId: '123',

        operation: OPERATION,
        talentAvailabilitySubscription:
          createTalentAvailabilitySubscriptionFragmentMock({
            active: true,
            comment: 'Test subscription reason'
          })
      })

      expect(screen.getByTestId('bell-icon:active')).toBeInTheDocument()
      expect(screen.getByText('Subscribed to Availability')).toBeInTheDocument()

      fireEvent.mouseOver(screen.getByTestId('bell-icon:active'))

      expect(screen.queryByText(SUBSCRIBED_TOOLTIP_TEXT)).toBeInTheDocument()
      expect(
        screen.queryByText(NOT_SUBSCRIBED_TOOLTIP_TEXT)
      ).not.toBeInTheDocument()

      SUBSCRIPTION_SCENARIOS.forEach(scenarioText =>
        expect(screen.queryByText(scenarioText)).toBeInTheDocument()
      )

      expect(screen.queryByText('Subscription Comment:')).toBeInTheDocument()
      expect(screen.queryByText('Test subscription reason')).toBeInTheDocument()
      expect(screen.queryByText('Edit Comment')).toBeInTheDocument()
      expect(screen.queryByText('Unsubscribe')).toBeInTheDocument()
    })

    describe('and talent clicks on usubscribe', () => {
      it('calls unsubscribe mutation', async () => {
        const talentAvailabilitySubscriptionId = '123'

        arrangeTest(
          {
            talentId: '123',

            operation: OPERATION,
            talentAvailabilitySubscription:
              createTalentAvailabilitySubscriptionFragmentMock({
                id: talentAvailabilitySubscriptionId,
                active: true,
                comment: 'Test subscription reason'
              })
          },
          [
            createUnsubscribeFromTalentAvailabilityUpdatesMock({
              talentAvailabilitySubscriptionId
            })
          ]
        )

        fireEvent.mouseOver(screen.getByTestId('bell-icon:active'))

        fireEvent.click(screen.getByText('Unsubscribe'))

        expect(
          await screen.findByText('Subscription successfully canceled.')
        ).toBeInTheDocument()
      })
    })

    it('shows active bell button if the operation is "hidden"', () => {
      arrangeTest({
        talentId: '123',

        operation: {
          ...OPERATION,
          callable: OperationCallableTypes.HIDDEN
        },
        talentAvailabilitySubscription:
          createTalentAvailabilitySubscriptionFragmentMock({
            active: true,
            comment: 'Test subscription reason'
          })
      })

      expect(
        screen.queryByTestId('subscribe-to-availability-button')
      ).toBeInTheDocument()
    })
  })

  describe('when operation is disabled', () => {
    it('disables the bell button', () => {
      arrangeTest({
        talentId: '123',

        operation: {
          ...OPERATION,
          callable: OperationCallableTypes.DISABLED
        },
        talentAvailabilitySubscription:
          createTalentAvailabilitySubscriptionFragmentMock({
            active: true,
            comment: 'Test subscription reason'
          })
      })

      expect(screen.getByRole('button')).toBeDisabled()
    })
  })
})
