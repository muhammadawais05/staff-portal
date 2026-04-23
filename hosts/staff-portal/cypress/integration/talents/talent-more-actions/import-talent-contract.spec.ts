import { updateImportTalentContractStubs } from '~integration/mocks/schema-updates/talents'
import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { ImportTalentContractModal } from '~integration/modules/pages/talents/talent-profile-tab/components'
import { ENTER_KEY } from '~integration/utils'

describe('Talent Profile > More Actions > Import Contract', () => {
  const page = new TalentProfilePage()
  const actions = page.moreActions

  const modal = new ImportTalentContractModal()

  it('imports the talent contract', () => {
    updateImportTalentContractStubs()

    page.visit()

    page.moreActionsButton.click()
    actions.importContract.click()

    modal.contractKind.click().trigger('keydown', { keyCode: ENTER_KEY })
    modal.guidField.type('a')

    modal.submitButton.realClick()

    cy.getNotification().should('have.text', 'Contract has been imported.')
  })
})
