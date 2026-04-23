import { FormModal } from '../../../modals'

class UpdateInvoiceNoteModal extends FormModal {
  get invoiceNoteField() {
    return this.modal.findByTestId('update-invoice-note-field')
  }
}

export default UpdateInvoiceNoteModal
