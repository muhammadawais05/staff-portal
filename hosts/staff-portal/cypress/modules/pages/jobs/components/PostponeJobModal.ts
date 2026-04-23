import { FormModal } from '../../../modals'

const MODAL_NAME = 'PostponeJobModal'

class PostponeJobModal extends FormModal {
  get dueDateField() {
    return this.modal
      .findByTestId(`${MODAL_NAME}-due-date-field`)
      .find('input:last')
  }

  get reasonField() {
    return this.modal.findByTestId(`${MODAL_NAME}-reason-field`)
  }

  get detailsField() {
    return this.modal.findByTestId(`${MODAL_NAME}-notes`)
  }
}

export default PostponeJobModal
