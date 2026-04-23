import { FormModal } from '../../../../modals'

class UpdateInvoiceNoteModal extends FormModal {
  get editButton() {
    return cy.getByTestId('update-invoice-note-modal-edit-button')
  }

  get noteField() {
    return cy.getByTestId('update-invoice-note-field')
  }
}

export default UpdateInvoiceNoteModal
