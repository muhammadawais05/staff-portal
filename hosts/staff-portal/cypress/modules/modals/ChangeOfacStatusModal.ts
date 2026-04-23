import { FormModal } from '.'

class ChangeOfacStatusModal extends FormModal {
  get newOfacStatusField() {
    return cy.getByTestId('ofac-status-select').find('input:last')
  }

  get commentField() {
    return cy.getByTestId('ofac-status-comment').find('textarea:last')
  }

  get submitButton() {
    return cy.getByTestId('change-ofac-status-submit-button')
  }

  get ofacStatusField() {
    return cy.getByTestId('ofac-status-field')
  }
}

export default ChangeOfacStatusModal
