import { FormModal } from '~integration/modules/modals'

class IssueInvoiceModal extends FormModal {
  get amount() {
    return cy.getByTestId('issue-invoice-modal-amount').find('input')
  }

  get sendNotificationsCheckbox() {
    return cy.getByTestId('issue-invoice-modal-send-notifications').find('input')
  }
}

export default IssueInvoiceModal
