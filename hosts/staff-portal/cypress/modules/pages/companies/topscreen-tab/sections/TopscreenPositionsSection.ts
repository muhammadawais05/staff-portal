import { FormModal } from '~integration/modules/modals'
import { BasePage } from '~integration/modules/pages'

class TopscreenPositionsSection extends BasePage {
  addNewTopscreenPositionModal = new FormModal()

  openAddNewTopscreenPositionModal() {
    cy.getByTestId('add-new-topcreen-position-modal-button').click()
  }

  get positionTitleLabel() {
    return cy.getByTestId('add-new-position-title').find('label')
  }

  enterPositionTitle(title: string) {
    cy.get('input[name="title"]').type(title)
  }

  enterPositionProgrammingLanguage(description: string) {
    cy.get('input[name="description"]').type(description)
  }

  enterPositionJobUrl(jobUrl: string) {
    cy.get('input[name="jobUrl"]').type(jobUrl)
  }

  enterPositionContactName(contactName: string) {
    cy.get('input[name="contactName"]').type(contactName)
  }

  enterPositionContactEmail(contactEmail: string) {
    cy.get('input[name="contactEmail"]').type(contactEmail)
  }

  checkScreeningSteps(value: string) {
    cy.get(
      `[data-testid="add-new-position-${value}"] [type="checkbox"]`
    ).check()
  }

  submitTopscreenPosition() {
    this.addNewTopscreenPositionModal.submit()
  }

  openActivateTopScreenPositionModal(positionId: string) {
    cy.getByTestId(`activate-position-${positionId}`).click()
  }
}

export default TopscreenPositionsSection
