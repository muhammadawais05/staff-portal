import { FormModal } from '../../../modals'

const MODAL_NAME = 'SendJobAwayModal'

class SendAwayJobModal extends FormModal {
  get reasonField() {
    return this.modal.findByTestId(`${MODAL_NAME}-reason`)
  }

  get commentField() {
    return this.modal.findByTestId(`${MODAL_NAME}-comment`)
  }
}

export default SendAwayJobModal
