import TalentSourcingRequestsTab from '~integration/modules/pages/talents/sourcing-requests-tab'
import { updateLinkSourcingRequestsStubs } from '~integration/mocks/schema-updates/talents'
import { DEBOUNCED_AUTOCOMPLETE, ENTER_KEY } from '~integration/utils'

describe('Talent Sourcing Requests Tab > Sourcing Requests Section > Link Sourcing Request button', () => {
  const page = new TalentSourcingRequestsTab()
  const { sourcingRequestsSection } = page
  const { linkSourcingRequestModal: modal } = sourcingRequestsSection

  it('opens the modal and submits the form', () => {
    updateLinkSourcingRequestsStubs()

    cy.clock()
    page.visit()

    sourcingRequestsSection.linkSourcingRequest.click()
    modal.input.click().type('1')

    cy.tick(DEBOUNCED_AUTOCOMPLETE)

    modal.input.trigger('keydown', { keyCode: ENTER_KEY })
    modal.clickButton('Link')

    cy.getNotification().should(
      'contain.text',
      'Talent linked with Sourcing Request.'
    )
  })
})
