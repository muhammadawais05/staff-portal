import { FormModal } from '../../../modals'

class RequestAvailabilityModal extends FormModal {
  get talentsInput() {
    return this.modal.findByTestId('TalentsInput-tag-selector')
  }
  get fillFromFavoritesButton() {
    return this.modal.findByTestId('TalentsInput-fill-from-favorites-button')
  }
  get submitButton() {
    return this.modal.findByTestId('RequestAvailabilityModal-submit')
  }
}

export default RequestAvailabilityModal
