import { activateTopscreenPositionsStubs } from '~integration/mocks/schema-updates/companies'
import { FormModal } from '~integration/modules/modals'
import CompanyProfilePage from '~integration/modules/pages/companies'

describe('Activate a TopScreen Position', () => {
  const formModal = new FormModal()
  const { topscreenTab } = new CompanyProfilePage()
  const { topscreenPositionsSection } = topscreenTab

  beforeEach(() => {
    activateTopscreenPositionsStubs()

    topscreenTab.visitTab()
    topscreenPositionsSection.openActivateTopScreenPositionModal('position-123')
  })

  it('opens the modal after click on "Activate TopScreen Position" button', () => {
    formModal.submitButton.should('contain.text', 'Activate')
  })

  it('activates the TopScreen Position', () => {
    formModal.submit()

    cy.getNotification().should(
      'contain',
      'You have successfully activated the Position.'
    )
  })
})
