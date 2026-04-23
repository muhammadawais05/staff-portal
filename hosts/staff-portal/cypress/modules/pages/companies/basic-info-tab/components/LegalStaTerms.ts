export default class LegalStaTerms {
  get modal() {
    return cy.getByTestId('legal-sta-terms-modal')
  }

  get signedOnField() {
    return this.modal.getByTestId('item-field: Signed On')
  }

  get modalButton() {
    return cy.getByTestId('legal-sta-terms-modal-button')
  }
}
