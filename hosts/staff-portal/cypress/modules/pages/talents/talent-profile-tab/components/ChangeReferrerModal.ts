import { FormModal } from '~integration/modules/modals'

class ChangeReferrerModal extends FormModal {
  get referrerInput() {
    return cy.getByTestId('referrer-input')
  }
}

export default ChangeReferrerModal
