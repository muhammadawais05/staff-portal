class DetailsSection {
  getSection() {
    return cy.getByTestId('sourcing-request-details')
  }

  getEditTalentSpecialistButton() {
    return cy.getByTestId('sourcing-request-specialist-edit-button')
  }

  getEditStatusButton() {
    return cy.getByTestId('sourcing-request-status-edit-button')
  }

  getStatusModal() {
    return cy.getByTestId('sourcing-request-status-modal')
  }

  getStatusField() {
    return cy.getByTestId('sourcing-request-status-field')
  }

  getStatusCommentField() {
    return cy.getByTestId('sourcing-request-status-comment-field')
  }

  getStatusSubmitButton() {
    return cy.getByTestId('sourcing-request-status-submit')
  }

  getSpecialistModal() {
    return cy.getByTestId('sourcing-request-talent-specialist-modal')
  }

  getSpecialistField() {
    return cy.getByTestId('sourcing-request-specialist-field')
  }

  getSpecialistCommentField() {
    return cy.getByTestId('sourcing-request-specialist-comment-field')
  }

  getSpecialistSubmitButton() {
    return cy.getByTestId('sourcing-request-specialist-submit')
  }
}

export default DetailsSection
