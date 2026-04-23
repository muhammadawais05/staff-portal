import { FormModal } from '~integration/modules/modals'

class LeaveFeedbackModal extends FormModal {
  get questionItemRadio() {
    return cy
      .getByTestId('leave-feedback-modal-question-item-radiogroup')
      .find('input')
  }
  get negativeCheckbox() {
    return cy
      .getByTestId('leave-feedback-modal-negative-checkbox')
      .find('input')
  }

  get commentsField() {
    return cy.getByTestId('leave-feedback-modal-comment-field')
  }
}

export default LeaveFeedbackModal
