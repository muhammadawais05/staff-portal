import { FormModal } from '~integration/modules/modals'

class ImportTopModal extends FormModal {
  getGuidField() {
    return this.modal.findByTestId('ImportTopForm-guid').find('input:last')
  }
}

export default ImportTopModal
