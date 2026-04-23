import { FormModal } from '~integration/modules/modals'

class PostponeExpirationModal extends FormModal {
  get expirationDateField() {
    return cy
      .getByTestId('postpone-expiration-form-expiration-date')
      .find('input')
  }
}

export default PostponeExpirationModal
