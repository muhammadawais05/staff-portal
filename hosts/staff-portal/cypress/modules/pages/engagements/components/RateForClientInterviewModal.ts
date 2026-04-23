import { FormModal } from '~integration/modules/modals'

class RateForClientInterviewModal extends FormModal {
  get comment() {
    return this.modal.findByTestId(
      'rate-for-client-interview-modal-content-comment'
    )
  }

  getRatingSelect() {
    return cy
      .getByTestId('rate-for-client-interview-modal-content-rating')
      .find('input:last')
  }
}

export default RateForClientInterviewModal
