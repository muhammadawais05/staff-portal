import { updateTopscreenPositionsStubs } from '~integration/mocks/schema-updates/companies'
import CompanyProfilePage from '~integration/modules/pages/companies'

describe('Add new topscreen position', () => {
  const { topscreenTab } = new CompanyProfilePage()
  const { topscreenPositionsSection } = topscreenTab

  beforeEach(() => {
    updateTopscreenPositionsStubs()

    topscreenTab.visitTab()
    topscreenPositionsSection.openAddNewTopscreenPositionModal()
  })

  it('opens the modal after click on "Add New TopScreen Position" button', () => {
    topscreenPositionsSection.positionTitleLabel.should('contain.text', 'Title')
  })

  it('submits successfully and create a new topscreen position', () => {
    topscreenPositionsSection.enterPositionTitle('my-title')
    topscreenPositionsSection.enterPositionProgrammingLanguage('Java')
    topscreenPositionsSection.enterPositionJobUrl('https://topt.al')
    topscreenPositionsSection.enterPositionContactName('my contact name')
    topscreenPositionsSection.enterPositionContactEmail('my contact email')
    topscreenPositionsSection.checkScreeningSteps('English')
    topscreenPositionsSection.submitTopscreenPosition()

    cy.getNotification().should(
      'contain',
      'You created a new TopScreen position.'
    )
  })
})
