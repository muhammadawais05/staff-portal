import { FormModal } from '../../../modals'

class RefundJobDepositModal extends FormModal {
  get submitButton() {
    return this.modal.findByTestId('RefundDeposit-submit-modal-button')
  }
}

export default RefundJobDepositModal
