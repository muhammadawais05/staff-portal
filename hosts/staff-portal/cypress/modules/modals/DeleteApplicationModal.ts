import { FormModal } from '.'

class DeleteApplicationModal extends FormModal {
  get commentField() {
    return cy.getByTestId('delete-application-modal-reason-comment')
  }

  get reasonField() {
    return cy
      .getByTestId('delete-application-modal-reason-id')
      .find('input:last')
  }
}

export default DeleteApplicationModal
