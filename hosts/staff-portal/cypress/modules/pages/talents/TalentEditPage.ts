import { BasePage } from '~integration/modules/pages'

class TalentEditPage extends BasePage {
  visit() {
    cy.visit('/talents/123/edit')
  }

  get editAvatarButton() {
    return cy.getByTestId('edit-avatar-button')
  }

  get fileInput() {
    return cy.get('input[type="file"]')
  }

  get uploadPhotoButton() {
    return cy.getByTestId('edit-role-avatar-modal-upload-photo-button')
  }

  get saveAvatarButton() {
    return cy.getByTestId('edit-role-avatar-modal-save-button')
  }
}

export default TalentEditPage
