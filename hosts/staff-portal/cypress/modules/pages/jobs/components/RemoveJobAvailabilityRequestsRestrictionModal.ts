import { FormModal } from '../../../modals'

class RefundJobDepositModal extends FormModal {
  get comment() {
    return this.modal.findByTestId('modal-input')
  }
  get submitButton() {
    return this.modal.findByTestId('ConfirmationModal-submit-button')
  }
}

export default RefundJobDepositModal
