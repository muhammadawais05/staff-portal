import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import {
  OperationCallableTypes,
  TalentAllocatedHoursAvailability
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import AvailabilityStatusWithSubscription, {
  Props
} from './AvailabilityStatusWithSubscription'
import { createUnsubscribeFromTalentAvailabilityUpdatesMock } from '../../hooks/use-unsubscribe-from-talent-availability-updates/mocks'
import { createTalentAvailabilitySubscriptionFragmentMock } from '../../data/talent-availability-subscription-fragment/mocks'

const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: [],
  __typename: 'Operation'
}

const arrangeTest = (props: Props, mocks: MockedResponse[] = []) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <AvailabilityStatusWithSubscription {...props} />
    </TestWrapperWithMocks>
  )

const talentAvailability = {
  id: '123',
  type: 'Developer',
  roleTitle: 'Developer',
  allocatedHours: 40,
  allocatedHoursAvailability: TalentAllocatedHoursAvailability.PART_TIME,
  allocatedHoursAvailabilityIncludingEndingEngagements:
    TalentAllocatedHoursAvailability.PART_TIME,
  availableHours: 20,
  availableHoursIncludingEndingEngagements: 20,
  endingEngagements: {
    nodes: []
  },
  preliminarySearchSetting: {
    enabled: false
  }
}

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

describe('AvailabilityStatusWithSubscription', () => {
  describe('when there is no subscription', () => {
    it('shows inactive bell button with tooltip', () => {
      arrangeTest({
        talentId: '123',
        talentAvailability,
        operation: OPERATION
      })

      expect(screen.getByTestId('bell-icon:inactive')).toBeInTheDocument()

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
  })

  describe('when there is an active subscription', () => {
    it('shows active bell button with tooltip containing edit and unsubscribe buttons', () => {
      arrangeTest({
        talentId: '123',
        talentAvailability,
        operation: OPERATION,
        talentAvailabilitySubscription:
          createTalentAvailabilitySubscriptionFragmentMock({
            active: true,
            comment: 'Test subscription reason'
          })
      })

      expect(screen.getByTestId('bell-icon:active')).toBeInTheDocument()

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

    describe('when talent clicks on usubscribe', () => {
      it('calls unsubscribe mutation', async () => {
        const talentAvailabilitySubscriptionId = '123'

        arrangeTest(
          {
            talentId: '123',
            talentAvailability,
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
  })

  describe('when there is no active subscription and operation is hidden', () => {
    it('hides the bell button', () => {
      arrangeTest({
        talentId: '123',
        talentAvailability,
        operation: {
          ...OPERATION,
          callable: OperationCallableTypes.HIDDEN
        },
        talentAvailabilitySubscription:
          createTalentAvailabilitySubscriptionFragmentMock({
            active: false,
            comment: 'Test subscription reason'
          })
      })

      expect(screen.queryByTestId(/bell-icon/)).not.toBeInTheDocument()
    })
  })

  describe('when operation is disabled', () => {
    it('disables the bell button', () => {
      arrangeTest({
        talentId: '123',
        talentAvailability,
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
