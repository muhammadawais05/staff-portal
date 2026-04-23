import { updateRejectTrialMocks } from '~integration/mocks/schema-updates/engagement'
import { Engagement } from '~integration/modules/pages/engagements'
import { RejectTrial } from '~integration/modules/pages/engagements/components'
import { ENTER_KEY } from '~integration/utils'

describe('Engagement Page', () => {
  const page = new Engagement()
  const rejectTrial = new RejectTrial()

  describe('when the form information is correct', () => {
    it('submits the form and displays a success notification message', () => {
      updateRejectTrialMocks()

      page.visit()

      page.moreButton().click()
      page.moreDropdown.contains('Reject Trial').click()

      rejectTrial
        .getReasonField()
        .focus()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      rejectTrial.getDetailsField().type('Some details')

      rejectTrial.submitButton.click()

      cy.getNotification().should('have.text', 'Developer has been rejected.')
    })
  })
})
