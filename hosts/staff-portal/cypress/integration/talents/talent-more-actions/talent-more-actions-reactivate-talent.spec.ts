import { updateTalentMoreActionsReactivateTalentStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { FormModal } from '~integration/modules/modals'

describe('Talent More Actions > Restore Talent', () => {
  const page = new TalentProfilePage()
  const actions = page.moreActions

  it('reactivates the talent', () => {
    const modal = new FormModal()

    updateTalentMoreActionsReactivateTalentStubs()

    page.visitWithJob()

    page.moreActionsButton.click()

    actions.reactivateTalentMenuOption.click()

    modal.comment.type('a')

    modal.submit()

    cy.getNotification().should('contain', 'Developer profile was restored')
  })
})
