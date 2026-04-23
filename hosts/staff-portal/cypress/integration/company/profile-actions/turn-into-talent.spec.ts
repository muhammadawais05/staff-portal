import { updateTurnIntoTalentStubs } from '~integration/mocks/schema-updates/companies/turn-into-talent-update'
import CompanyProfilePage from '~integration/modules/pages/companies/CompanyProfilePage'
import { TurnIntoTalentModal } from '~integration/modules/pages/companies/components'

describe('Turn Company Into Talent', () => {
  const turnIntoTalentModal = new TurnIntoTalentModal()
  const page = new CompanyProfilePage()

  beforeEach(() => {
    updateTurnIntoTalentStubs()
  })

  it('opens Turn Into Talent modal', () => {
    page.basicInfoTab.visitTab()

    page.moreDropdown.click()
    page.moreDropdown.contains('Turn Into Talent').click()

    turnIntoTalentModal.setDropdown('verticalId', 'TopScreen')
    turnIntoTalentModal.fullName.clear().type('n')
    turnIntoTalentModal.comment.type('c')
    turnIntoTalentModal.submit()

    page
      .getNotification(
        'The Company Application was successfully converted to a talent application.'
      )
      .should('be.visible')
  })
})
