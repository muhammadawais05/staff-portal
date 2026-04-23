import { Engagement } from '~integration/modules/pages/engagements'
import { updateRejectCandidateStubs } from '~integration/mocks/schema-updates/engagement'
import { ENTER_KEY } from '~integration/utils'
import { ReasonModal } from '~integration/modules/pages/engagements/components'

describe('Engagement page - More -> Reject Candidate', () => {
  const page = new Engagement()
  const rejectCandidateModal = new ReasonModal()

  const JOB_ID = '123'

  describe('when the form information is correct', () => {
    it('submits `reject candidate` modal', () => {
      updateRejectCandidateStubs()

      page.visit()

      page.moreButton().click()
      page.moreDropdown.contains('Reject Candidate').click()

      rejectCandidateModal
        .getReasonField()
        .focus()
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })
      rejectCandidateModal.getDetailsField().type('details')

      rejectCandidateModal.submitButton.click()

      cy.getNotification().should('have.text', 'Candidate has been rejected.')

      cy.url().should('include', `/jobs/${JOB_ID}`)
      cy.go('back').end()
    })
  })
})
