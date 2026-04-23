import { FormModal } from '~integration/modules/modals'

class SendTopModal extends FormModal {
  getImportTopButton() {
    return cy.getByTestId('SendTopModal-import-top')
  }

  getImportContractAsTopButton() {
    return cy.getByTestId('SendTopModal-import-contract-as-top')
  }
}

export default SendTopModal
