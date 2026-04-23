import { updateTalentGdprRemovalStubs } from '~integration/mocks/schema-updates/talents'
import { FormModal } from '~integration/modules/modals'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'

describe('Talent Profile > More Actions > GDPR Remove Data', () => {
  const page = new TalentProfilePage()
  const actions = page.moreActions

  const modal = new FormModal()

  it('removes talent gdpr data', () => {
    updateTalentGdprRemovalStubs({
      fullName: 'Euna Conroy'
    })

    page.visit()

    page.title.should('contain.text', 'Euna Conroy')
    page.generalSection.title.should('have.text', 'Euna Conroy')

    page.moreActionsButton.click()

    actions.gdprRemoveData.click()

    updateTalentGdprRemovalStubs({ fullName: 'Euna Conroy (deleted)' })

    modal.submit()

    cy.getNotification().should(
      'have.text',
      'The GDPR removal process was successfully completed'
    )

    page.title.should('contain.text', 'Euna Conroy (deleted)')
    page.generalSection.title.should('have.text', 'Euna Conroy (deleted)')
  })
})
