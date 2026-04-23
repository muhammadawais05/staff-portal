import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  TalentAvailabilitySubscription,
  TalentAvailabilitySubscriptionOperations
} from '@staff-portal/graphql/staff'

import { enabledOperationMock, hiddenOperationMock } from '~integration/mocks'
import { getTalentOperations } from '~integration/mocks/fragments'
import { updateTalentGeneralSectionStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'

describe('Talent Profile Tab > Talent General Section', () => {
  const page = new TalentProfilePage()
  const { generalSection } = page
  const { availabilityField, subscriptionModal, subscriptionCommentModal } =
    generalSection

  describe('Availability field', () => {
    describe('inactive subscription', () => {
      it('subscribes to talent availability', () => {
        updateTalentGeneralSectionStubs({
          operations: getTalentOperations({
            subscribeToTalentAvailabilityUpdates: enabledOperationMock()
          })
        })
        cy.clock()
        page.visit()
        availabilityField.subscriptionInactiveButton.click()
        subscriptionModal.comment.type('C')
        subscriptionModal.submitButton.click()
        cy.getNotification().should(
          'have.text',
          'Subscription successfully created.'
        )
      })
    })

    describe('active subscription', () => {
      it('edits comment', () => {
        updateTalentGeneralSectionStubs({
          viewerActiveAvailabilitySubscription: {
            id: encodeEntityId('123', 'TalentAvailabilitySubscription'),
            active: true,
            comment: 'Comment',
            operations: {
              updateComment: enabledOperationMock(),
              unsubscribe: enabledOperationMock(),
              __typename: 'TalentAvailabilitySubscriptionOperations'
            } as TalentAvailabilitySubscriptionOperations,
            __typename: 'TalentAvailabilitySubscription'
          } as unknown as TalentAvailabilitySubscription,
          operations: getTalentOperations({
            subscribeToTalentAvailabilityUpdates: hiddenOperationMock({
              messages: ['You have already subscribed to the talent.']
            })
          })
        })

        page.visit()
        availabilityField.subscriptionActiveButton.scrollIntoView()
        availabilityField.subscriptionActiveButton.trigger('mouseover')
        cy.getByTestId('availability-subscription-tooltip-edit-button').click()

        subscriptionCommentModal.comment.type('U')
        subscriptionCommentModal.clickButton('Save')
        cy.getNotification().should(
          'have.text',
          'Subscription reason successfully updated.'
        )
      })

      it('unsubscribes from talent availability', () => {
        updateTalentGeneralSectionStubs({
          viewerActiveAvailabilitySubscription: {
            id: encodeEntityId('123', 'TalentAvailabilitySubscription'),
            active: true,
            comment: 'Comment',
            operations: {
              updateComment: enabledOperationMock(),
              unsubscribe: enabledOperationMock(),
              __typename: 'TalentAvailabilitySubscriptionOperations'
            } as TalentAvailabilitySubscriptionOperations,
            __typename: 'TalentAvailabilitySubscription'
          } as unknown as TalentAvailabilitySubscription,
          operations: getTalentOperations({
            subscribeToTalentAvailabilityUpdates: hiddenOperationMock({
              messages: ['You have already subscribed to the talent.']
            })
          })
        })

        page.visit()
        availabilityField.subscriptionActiveButton.scrollIntoView()
        availabilityField.subscriptionActiveButton.trigger('mouseover')
        cy.getByTestId(
          'availability-subscription-tooltip-unsubscribe-button'
        ).click()

        cy.getNotification().should(
          'have.text',
          'Subscription successfully canceled.'
        )
      })
    })
  })
})
