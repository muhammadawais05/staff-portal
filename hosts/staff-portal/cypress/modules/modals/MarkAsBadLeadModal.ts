import { FormModal } from '.'

class MarkAsBadLeadModal extends FormModal {
  get commentField() {
    return cy.getByTestId('mark-as-bad-lead-modal-reason-comment')
  }

  get reasonField() {
    return cy.getByTestId('mark-as-bad-lead-modal-reason-id').find('input:last')
  }
}

export default MarkAsBadLeadModal
