import { FormModal } from '~integration/modules/modals'

class CreateHoldPaymentsModal extends FormModal {
  get expirationTypeByAmountRadio() {
    return cy.getByTestId('expiration-type-by-amount')
  }

  get expireAtThresholdField() {
    return cy.getByTestId('expiration-type-inputs-expire-at-threshold')
  }

  get commentField() {
    return cy.getByTestId('create-hold-payments-modal-comment')
  }

  get manualTab() {
    return cy.getByTestId('create-hold-payments-modal-manual-tab')
  }
}

export default CreateHoldPaymentsModal
