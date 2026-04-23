import { EngagementStatus } from '@staff-portal/graphql/staff'
import { EngagementCumulativeStatus } from '@staff-portal/engagements'

import { ReasonModal } from '~integration/modules/pages/engagements/components'
import { updateCancelInterviewStubs } from '~integration/mocks/schema-updates/engagement'
import { Engagement } from '~integration/modules/pages/engagements'
import { ENTER_KEY } from '~integration/utils'

describe('Engagement Page -> Interview Cancellation', () => {
  const page = new Engagement()

  describe('when the form information is correct', () => {
    it('submits the modal and cancels interview', () => {
      updateCancelInterviewStubs()
      const reasonModal = new ReasonModal()

      page.visit()

      // test cancel interview
      page.moreButton().click()
      page.moreDropdown.contains('Cancel Interview').click()

      reasonModal
        .getDescriptionField()
        .should(
          'contain.text',
          'Are you sure you want to cancel this interview?'
        )
      reasonModal
        .getReasonField()
        .focus()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      reasonModal.getDetailsField().type('details')

      updateCancelInterviewStubs(
        EngagementStatus.CANCELLED,
        EngagementCumulativeStatus.CANCELLED
      )

      reasonModal.submitButton.click()

      cy.getNotification().should('have.text', 'Interview was canceled.')
      cy.getNotification().find('button').click()

      page.statusSection.getStatus().should('contain.text', 'Cancelled')

      // test cancel internal interview
      updateCancelInterviewStubs(
        EngagementStatus.PENDING,
        EngagementCumulativeStatus.PENDING
      )

      page.moreButton().click()
      page.moreDropdown.contains('Cancel Draft').click()

      reasonModal
        .getDescriptionField()
        .should(
          'contain.text',
          'Are you sure you want to cancel this draft? Cancelling the draft will also cancel the associated internal interview (if any).'
        )
      reasonModal
        .getReasonField()
        .focus()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      reasonModal.getDetailsField().type('details')

      updateCancelInterviewStubs(
        EngagementStatus.CANCELLED,
        EngagementCumulativeStatus.CANCELLED
      )

      reasonModal.submitButton.click()

      cy.getNotification().should('have.text', 'Draft was canceled.')

      page.statusSection.getStatus().should('contain.text', 'Cancelled')
    })
  })
})
