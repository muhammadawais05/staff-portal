import { Engagement } from '~integration/modules/pages/engagements'
import { updateCancelEngagementStubs } from '~integration/mocks/schema-updates/engagement'
import { ENTER_KEY } from '~integration/utils'
import { CancelEngagementModal } from '~integration/modules/pages/engagements/components'

describe('Engagement page -> More -> Cancel Engagement', () => {
  const page = new Engagement()
  const cancelEngagement = new CancelEngagementModal()

  describe('when the form information is correct', () => {
    it('cancels the engagement and updates the status section', () => {
      updateCancelEngagementStubs()

      page.visit()

      page.moreButton().click()
      page.moreDropdown.contains('Cancel Engagement').click()

      cancelEngagement
        .getReasonField()
        .find('input:last')
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      cancelEngagement.getDetailsField().type('Some details')

      cancelEngagement.submitButton.click()

      cy.getNotification().should('have.text', 'Engagement has been cancelled.')
    })
  })
})
