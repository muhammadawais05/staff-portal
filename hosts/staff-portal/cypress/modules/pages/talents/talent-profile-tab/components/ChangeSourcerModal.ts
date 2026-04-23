import { FormModal } from '~integration/modules/modals'

class ChangeSourcerModal extends FormModal {
  get sourcerField() {
    return this.modal
      .findByTestId('change-sourcer-modal-sourcer')
      .find('input:last')
  }
}

export default ChangeSourcerModal
