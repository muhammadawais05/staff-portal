import { FormModal } from '../../../modals'

const MODAL_NAME = 'delete-job-modal'

class DeleteJobModal extends FormModal {
  get reasonField() {
    return this.modal.findByTestId(`${MODAL_NAME}-reason-field`)
  }

  get detailsField() {
    return this.modal.findByTestId(`${MODAL_NAME}-comment-field`)
  }

  get clientHireField() {
    return this.modal.findByTestId(`${MODAL_NAME}-client-hire-field`)
  }

  get hireTypeField() {
    return this.modal.findByTestId(`${MODAL_NAME}-hire-type-field`)
  }
}

export default DeleteJobModal
