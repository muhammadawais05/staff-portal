import { FormModal } from '~integration/modules/modals'

class PaymentHistoryModal extends FormModal {
  get startDate() {
    return cy.getByTestId('payment-history-start-date')
  }

  get endDate() {
    return cy.getByTestId('payment-history-end-date')
  }
}

export default PaymentHistoryModal
