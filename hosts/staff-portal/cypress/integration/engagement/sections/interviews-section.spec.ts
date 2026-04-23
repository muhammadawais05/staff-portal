import { Engagement } from '~integration/modules/pages/engagements'
import { ENTER_KEY } from '~integration/utils'
import { RateForClientInterviewModal } from '~integration/modules/pages/engagements/components'
import { updateInterviewSectionStubs } from '~integration/mocks/schema-updates/engagement'

describe('Engagement Page -> Interviews Section', () => {
  const page = new Engagement()

  const { interviewsSection } = page

  const rateForClientModal = new RateForClientInterviewModal()

  it('displays correctly with expandable rows and can "Rate for Client"', () => {
    updateInterviewSectionStubs()

    page.visit()

    interviewsSection.getFirstExpandButton().click()
    interviewsSection.getFirstRateForClientButton().click()

    rateForClientModal
      .getRatingSelect()
      .focus()
      .click()
      // TODO: remove { force: true } in scope of
      // https://toptal-core.atlassian.net/browse/SPB-2967
      .trigger('keydown', { keyCode: ENTER_KEY, force: true })
    rateForClientModal.comment.type('C')
    rateForClientModal.submitButton.click()

    cy.getNotification().should('have.text', 'The interview has been rated.')
  })
})
