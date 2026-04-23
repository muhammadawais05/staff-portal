import { updateTalentMoreActionsDeactivateTalentStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { FormModal } from '~integration/modules/modals'

describe('Talent More Actions > Deactivate Talent', () => {
  const page = new TalentProfilePage()
  const actions = page.moreActions

  it('deactivates the talent', () => {
    const modal = new FormModal()

    updateTalentMoreActionsDeactivateTalentStubs()

    page.visitWithJob()

    page.moreActionsButton.click()

    actions.deactivateTalentMenuOption.click()

    modal.comment.type('a')

    modal.submit()

    cy.getNotification().should('contain', 'Developer was deactivated')
  })
})
