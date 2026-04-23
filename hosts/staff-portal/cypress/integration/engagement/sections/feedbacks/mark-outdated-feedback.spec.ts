import { updateMarkOutdateFeedbackStubs } from '~integration/mocks/schema-updates/engagement'
import { FormModal } from '~integration/modules/modals'
import { Engagement } from '~integration/modules/pages/engagements'

describe('Engagement Page -> Feedbacks -> Mark Outdated', () => {
  const page = new Engagement()
  const confirmationModal = new FormModal()

  const {
    feedbacksSection: { feedbackDetails }
  } = page

  describe('when the form information is correct', () => {
    it('submits the form and marks the feedback as outdated', () => {
      updateMarkOutdateFeedbackStubs()

      page.visit()

      feedbackDetails.getMarkOutdatedButton().click()
      confirmationModal.comment.type('S')

      confirmationModal.submitButton.click()

      cy.getNotification().should(
        'have.text',
        "The Feedback was successfully marked 'outdated'."
      )
    })
  })
})
