import { Engagement } from '~integration/modules/pages/engagements'
import { updateAcceptCandidateStubs } from '~integration/mocks/schema-updates/engagement'
import { daysFromNow, ENTER_KEY } from '~integration/utils'
import { AcceptCandidateModal } from '~integration/modules/pages/engagements/components'

const JOB_ID = '123'

describe('Engagement page -> More -> Accept Candidate', () => {
  const page = new Engagement()
  const acceptCandidateModal = new AcceptCandidateModal()

  describe('when the form information is correct', () => {
    it('submits the form and accepts the candidate', () => {
      updateAcceptCandidateStubs()

      page.visit()

      page.moreButton().click()
      page.moreDropdown.contains('Accept Candidate').click()

      acceptCandidateModal.fillStartDateWith(daysFromNow(7))
      acceptCandidateModal.timeZone
        .click()
        .trigger('keydown', { keyCode: ENTER_KEY })

      acceptCandidateModal.submitButton.click()

      cy.getNotification().should(
        'have.text',
        'The Job was successfully started.'
      )

      cy.url().should('include', `/jobs/${JOB_ID}`)
      cy.go('back').end()
    })
  })
})
