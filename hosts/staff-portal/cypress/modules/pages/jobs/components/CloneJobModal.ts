import { FormModal } from '../../../modals'

class CloneJobModal extends FormModal {
  get startDateField() {
    return this.modal
      .findByTestId('clone-job-modal-start-date')
      .find('input:last')
  }
}

export default CloneJobModal
