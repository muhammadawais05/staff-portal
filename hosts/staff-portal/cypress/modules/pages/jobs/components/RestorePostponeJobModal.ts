import { FormModal } from '../../../modals'

class RestorePostponeJobModal extends FormModal {
  get submitButton() {
    return this.modal.findByTestId('restore-postponed-submit-button')
  }
}

export default RestorePostponeJobModal
