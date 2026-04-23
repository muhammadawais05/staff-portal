import { FormModal } from '~integration/modules/modals'

class PaymentHistoryModal extends FormModal {
  get startDate() {
    return cy.getByTestId('payment-history-start-date').find('input:last')
  }

  get endDate() {
    return cy.getByTestId('payment-history-end-date').find('input:last')
  }
}

export default PaymentHistoryModal
