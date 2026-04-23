import { updateTalentHealthStatusStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { SetHealthStatusModal } from '~integration/modules/pages/talents/talent-profile-tab/components'

describe('Talent Profile > More Actions > Talent Health Status', () => {
  const page = new TalentProfilePage()
  const actions = page.moreActions

  const modal = new SetHealthStatusModal()

  it('changes the talent health status', () => {
    updateTalentHealthStatusStubs()

    page.visit()

    page.moreActionsButton.click()
    actions.talentHealthStatus.click()

    modal.healthStatusField.realClick()
    modal.selectHealthStatus()
    modal.comment.last().type('a')

    modal.submitButton.realClick()

    cy.getNotification().should('have.text', 'The health status was set.')
  })
})
