import { FormModal } from '../../../modals'

class RehireJobModal extends FormModal {
  get commitmentFeild() {
    return this.modal.findByTestId('CloneJobForRehireModal-select-commitment')
  }

  get startDateFeild() {
    return this.modal
      .findByTestId('CloneJobForRehireModal-start-date')
      .find('input:last')
  }
}

export default RehireJobModal
